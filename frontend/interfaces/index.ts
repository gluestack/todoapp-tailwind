export interface ITodo {
  id?: number
  title: string
  is_completed: boolean
  user_id: number
  file_id?: number
  created_at?: string
  updated_at?: string
}

export interface IUser {
  id: number
  name: string
  email: string
  token: string
}

export interface IProviderProps {
  children: React.ReactNode
}

export interface IMarkComplete {
  id: number
  is_completed: boolean
}

export interface SignInForm {
  email: string
  password: string
}

export interface SignUpForm extends SignInForm {
  name: string
}