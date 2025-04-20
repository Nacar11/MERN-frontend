import { User } from './types'

export async function getWorkouts(user: User | null) {
    try {
        const response = await fetch('/api/workouts', {
            headers: {'Authorization': `Bearer ${user?.token}`},
          })
          const json = await response.json()
      if (!response) throw Error;
      return json;
    } catch (error) {
      console.log(error);
    }
  }