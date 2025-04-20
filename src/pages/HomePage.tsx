import { useGetWorkouts } from "../react-query/QueriesAndMutations.tsx"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { Workout } from '../api/types';

const HomePage = () => {
  const { data: workouts, isLoading, isError } = useGetWorkouts();

  return (
    <div className="grid grid-cols-[3fr_2fr] h-screen">
      <div>
        {isLoading && <p>Loading workouts...</p>}
        {isError && <p>Something went wrong fetching workouts.</p>}
        {workouts?.map((workout: Workout) => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>

    </div>
  );
};

export default HomePage;