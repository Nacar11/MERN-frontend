import { createContext, useReducer, ReactNode, Dispatch, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  token: string
}

interface AuthState {
  user: User | null
}

type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => {}, 
})

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])
  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
