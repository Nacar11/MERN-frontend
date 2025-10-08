import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
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

export const useGetAllPostsInfinite = (limit = 10) => {
  const { user } = useAuthContext();

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_ALL_POSTS_INFINITE],
    queryFn: ({ pageParam = 1 }) => getAllPosts(user, pageParam, limit),
    enabled: !!user,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data?.pagination;
      if (pagination && pagination.page < pagination.pages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS_INFINITE]
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS_INFINITE]
      });
    }
  });
};