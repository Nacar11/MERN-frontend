import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { getApiUrl } from '../config/api'

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()

  const signup = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(getApiUrl('api/user/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, firstName, lastName })
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
        name: json.data.user.firstName
          ? `${json.data.user.firstName}${json.data.user.lastName ? ' ' + json.data.user.lastName : ''}`
          : json.data.user.email,
        firstName: json.data.user.firstName || null,
        lastName: json.data.user.lastName || null,
        token: json.data.token
      }

      // Store user data and token
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', json.data.token)

      // Flag for welcome flow (consumed by WelcomePage, then removed)
      localStorage.setItem('isNewUser', 'true')

      dispatch({ type: 'LOGIN', payload: userData })

      setIsLoading(false)
    } catch (err) {
      if (import.meta.env.DEV) console.log(err);
      setIsLoading(false)
      setError('Network error')
    }
  }

  return { signup, isLoading, error }
}
