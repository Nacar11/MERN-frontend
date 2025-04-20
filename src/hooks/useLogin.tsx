import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

interface User {
  id: string
  email: string
  name: string
  token: string
}

interface ErrorResponse {
  error: string
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const json: User | ErrorResponse = await response.json()

      if (!response.ok) {
        const errorResponse = json as ErrorResponse
        setIsLoading(false)
        setError(errorResponse.error || 'Something went wrong')
        return
      }

      localStorage.setItem('user', JSON.stringify(json))

      dispatch({ type: 'LOGIN', payload: json as User })

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setError('Network error')
    }
  }

  return { login, isLoading, error }
}
