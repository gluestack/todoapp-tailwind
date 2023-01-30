export interface ITodo {
  id?: number
  title: string
  is_completed: boolean
  user_id: number
  file_id?: number | null
  file_path?: string | null
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

export interface IDeleteImage {
  id: number
  file_id: number
  file_path: string
}

export interface SignInForm {
  email: string
  password: string
}

export interface SignUpForm extends SignInForm {
  name: string
}

export interface IToast {
  success: boolean, display: boolean, message: string
}