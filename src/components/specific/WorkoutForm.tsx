import { useState } from 'react'
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext'
import { useAuthContext } from '../../hooks/useAuthContext'


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {title, load, reps}
    
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError('')
      setTitle('')
      setLoad('')
      setReps('')
      console.log('new workout added:', json)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <div className="p-4">
    <form className="flex flex-col" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Workout Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default WorkoutForm