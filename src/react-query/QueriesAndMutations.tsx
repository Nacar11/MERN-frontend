import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './QueryKeys.tsx';
import { createPost, getAllPosts, deletePost } from '../api/index.tsx';
import { useAuthContext } from '../hooks/useAuthContext';
import { CreatePostData } from '../api/types';

export const useGetAllPosts = (page = 1, limit = 10) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_POSTS, page, limit],
    queryFn: () => getAllPosts(user, page, limit),
    enabled: !!user
  });
};

export const useCreatePost = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postData, images }: { postData: CreatePostData; images?: File[] }) => 
      createPost(user, postData, images),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS]
      });
    }
  });
};

export const useDeletePost = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(user, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS]
      });
    }
  });
};