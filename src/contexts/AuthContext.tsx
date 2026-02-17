import { createContext, useReducer, ReactNode, Dispatch, useEffect } from 'react'
import { User } from '../api/types'


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
  dispatch: () => { },
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
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userData && token) {
      try {
        const user = JSON.parse(userData);

        // Check if token is expired
        const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        const currentTime = Date.now() / 1000;

        if (tokenData.exp < currentTime) {
          // Token is expired, logout user
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
          return;
        }

        // Add token to user object and login
        user.token = token;
        dispatch({ type: 'LOGIN', payload: user });
      } catch {
        // Invalid token format or user data, logout user
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        return;
      }
    }
  }, [])
  if (import.meta.env.DEV) console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
