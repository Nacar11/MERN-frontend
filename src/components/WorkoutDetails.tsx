interface Workout {
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}
const WorkoutDetails = ({ workout }: { workout: Workout }) => {
  return (
    <div className="m-4 bg-white rounded-lg shadow-md p-6 max-w-4xl">
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
    </div>
  );
};

export default WorkoutDetails;