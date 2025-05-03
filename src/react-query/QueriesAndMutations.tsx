import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './QueryKeys.tsx';
import {
    getWorkouts,
    deleteWorkout
}
 from '../api/index.tsx';
import { useAuthContext } from '../hooks/useAuthContext';
export const useGetWorkouts = () => {
    const { user } = useAuthContext();

    return useQuery({
        queryKey: [QUERY_KEYS.GET_WORKOUTS],
        queryFn: () => getWorkouts(user)
    })
}

export const useDeleteWorkout = () => {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({workout_id}: {workout_id: string}) => deleteWorkout(user, workout_id),
      onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_WORKOUTS]
        })
      }

    })
}