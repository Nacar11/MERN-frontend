import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { getApiUrl } from '../config/api'

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(getApiUrl('api/user/signup'), {
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

      // Store user data and token separately
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', json.data.token)

      dispatch({ type: 'LOGIN', payload: userData })

      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      setError('Network error')
    }
  }

  return { signup, isLoading, error }
}
