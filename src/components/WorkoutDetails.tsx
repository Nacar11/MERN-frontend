import { useState } from "react";
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow'
import { useDeleteWorkout } from '../react-query/QueriesAndMutations.tsx'
import { Workout } from "../api/types";
import Loader from "../components/shared/Loader.tsx";



const WorkoutDetails = ({ workout }: { workout: Workout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteWorkout, isPending, isError, error } = useDeleteWorkout();

  const handleDelete = () => {
    deleteWorkout(
      { workout_id: workout._id },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
        onError: (err) => {
          console.error("Failed to delete workout:", err);
        },
      }
    );
  };

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
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          </div>
        </div>
        <div>
          <button onClick={() => setIsModalOpen(true)}>Delete</button>
        </div>
      </div>
  
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-80">
            {isPending ? (
              <div className="flex justify-center items-center h-32">
                <Loader />
              </div>
            ) : (
              <>
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
                {isError && (
                  <p className="text-red-500 text-sm mt-2">
                    {(error as Error).message || 'Something went wrong.'}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;