import { useGetWorkouts } from "../react-query/QueriesAndMutations.tsx"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { Workout } from '../api/types';
import Loader from "../components/shared/Loader.tsx";

const HomePage = () => {
  const { data: workouts, isLoading, isError } = useGetWorkouts();

  return (
    <>
    {isLoading && (
      <div className="flex justify-center items-center h-60">
        <Loader />
      </div>
    )}
    {isError ? (
      <div className="flex justify-center items-center w-full">
        <code>Something went wrong fetching workouts.</code>
      </div>
    ) : (
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-4xl">
          {workouts?.map((workout: Workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
        </div>
      </div>
    )}
    </>
  );
};

export default HomePage;