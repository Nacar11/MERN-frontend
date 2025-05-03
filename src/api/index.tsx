import { User } from './types'

export const getWorkouts = async (user: User | null) => {
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

  export const deleteWorkout = async (user: User | null, workout_id: string) => {
    try {
        const response = await fetch('/api/workouts/' + workout_id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          }
        })
      const json = await response.json()
      return json;
    } catch (error) {
      console.log(error);
    }
  }