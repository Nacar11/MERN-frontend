import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './QueryKeys.tsx';
import {
    getWorkouts
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