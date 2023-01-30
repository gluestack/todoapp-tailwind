import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { IProviderProps, IMarkComplete, ITodo, IDeleteImage } from '../interfaces';
import { FetchTodosDocument, FetchTodosQuery, FetchTodosQueryVariables } from '../services/__generated__';
import { getUser } from './user';

const Data = React.createContext({});

export function useData() {
  return React.useContext(Data);
}

export const DataProvider = ({ children }: IProviderProps) => {
  const { user }: any = getUser();
  const [todos, setTodos] = React.useState<ITodo[]>([])

  const [filter, setFilter] = React.useState('all');

  const addTodo = (todo: ITodo) => {
    setTodos([...todos, { id: todo.id, title: todo.title, is_completed: todo.is_completed, user_id: user.id }]);
  }

  const attachFile = ({ id, file_id, file_path }: any) => {
    const editedTodos: ITodo[] = todos.map(todo => todo.id === id ? {
      ...todo, file_id, file_path
    } : todo);

    setTodos(editedTodos);
  }

  const markComplete = ({ id, is_completed }: IMarkComplete) => {
    const updatedTodos: ITodo[] = todos.map(todo => todo.id === id ? {
      ...todo, is_completed: !is_completed
    } : todo);

    setTodos(updatedTodos);
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const deleteImage = (id: number) => {
    const updatedTodos: ITodo[] = todos.map(todo => todo.id === id ? {
      ...todo, file_id: null, file_path: null
    } : todo);

    setTodos(updatedTodos);
  }

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.is_completed))
  }

  const [fetchTodosLazily, { data }] = useLazyQuery<FetchTodosQuery, FetchTodosQueryVariables>(FetchTodosDocument);

  React.useEffect(() => {
    if (user && !data) {
      fetchTodosLazily();
    };

    if (data) {
      //@ts-ignore
      setTodos(data.todos)
    }
  }, [user, data]);

  return (
    <Data.Provider value={{
      todos, setTodos, addTodo, attachFile, markComplete,
      deleteTodo, deleteImage, deleteCompletedTodos,
      filter, setFilter
    }}>
      {children}
    </Data.Provider>
  )
}
