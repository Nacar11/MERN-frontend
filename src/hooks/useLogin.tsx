import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

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

      const json = await response.json()

      if (!response.ok) {
        setIsLoading(false)
        setError(json.message || 'Something went wrong')
        return
      }

      // Backend returns { status, message, data: { user, token } }
      const userData = {
        id: json.data.user.id,
        email: json.data.user.email,
        name: json.data.user.email, // Using email as name for now
        token: json.data.token
      }

      localStorage.setItem('user', JSON.stringify(userData))

      dispatch({ type: 'LOGIN', payload: userData })

      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      setError('Network error')
    }
  }

  return { login, isLoading, error }
}
