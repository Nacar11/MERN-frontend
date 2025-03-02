import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useState } from "react";
interface Workout {
  _id: string
  title: string
  reps: number
  load: number
  createdAt: string
}
const WorkoutDetails = ({ workout }: { workout: Workout }) => {
  const { dispatch } = useWorkoutsContext()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete  = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="m-4 bg-white rounded-lg shadow-md p-6 max-w-4xl">
      <div className="flex flex-row justify-between items-start gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{workout.title}</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Number of Reps:</span> {workout.reps}
              </p>
              <p>
                <span className="font-semibold">Load (kg):</span> {workout.load}
              </p>
              <p className="pt-3">
                {new Date(workout.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <button onClick={() => setIsModalOpen(true)}>Delete</button>
          </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-bold text-red-600">Confirm Deletion</h2>
            <p className="text-gray-700 mt-2">
              Are you sure you want to delete this workout?
            </p>
          <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
    </div>
  );
};

export default WorkoutDetails;