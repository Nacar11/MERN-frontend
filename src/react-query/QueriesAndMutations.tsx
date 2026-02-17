import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './QueryKeys.tsx';
import {
  createPost, getAllPosts, deletePost, updatePost, getFeed, searchPosts,
  getBatchEngagement, likePost, unlikePost, getComments, createComment, deleteComment,
  getUserProfile, updateProfile, uploadAvatar, searchUsers, getSuggestedUsers, getUserPosts,
  followUser, unfollowUser, getFollowers, getFollowing
} from '../api/index.tsx';
import { useAuthContext } from '../hooks/useAuthContext';
import { CreatePostData, UpdateProfileData } from '../api/types';

// ==================== POSTS ====================

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

export const useGetFeedInfinite = (limit = 10) => {
  const { user } = useAuthContext();

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_FEED_INFINITE],
    queryFn: ({ pageParam = 1 }) => getFeed(user, pageParam, limit),
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

export const useGetUserPosts = (userId: string, page = 1, limit = 10) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId, page, limit],
    queryFn: () => getUserPosts(user, userId, page, limit),
    enabled: !!user && !!userId
  });
};

export const useCreatePost = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postData, images }: { postData: CreatePostData; images?: File[] }) =>
      createPost(user, postData, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_POSTS_INFINITE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FEED_INFINITE] });
    }
  });
};

export const useUpdatePost = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, updateData }: { postId: string; updateData: { title?: string; content?: string } }) =>
      updatePost(user, postId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_POSTS_INFINITE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FEED_INFINITE] });
    }
  });
};

export const useDeletePost = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(user, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_POSTS_INFINITE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FEED_INFINITE] });
    }
  });
};

export const useSearchPosts = (query: string, page = 1, limit = 10) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, query, page, limit],
    queryFn: () => searchPosts(user, query, page, limit),
    enabled: !!user && query.length >= 2
  });
};

// ==================== ENGAGEMENT (Batch likes/comments) ====================

export const useBatchEngagement = (postIds: string[]) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.BATCH_ENGAGEMENT, ...postIds],
    queryFn: () => getBatchEngagement(user, postIds),
    enabled: !!user && postIds.length > 0,
    staleTime: 30000,
  });
};

// ==================== LIKES ====================

export const useLikePost = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => likePost(user, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BATCH_ENGAGEMENT] });
    }
  });
};

export const useUnlikePost = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => unlikePost(user, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BATCH_ENGAGEMENT] });
    }
  });
};

// ==================== COMMENTS ====================

export const useGetComments = (postId: string, page = 1, limit = 20) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_COMMENTS, postId, page, limit],
    queryFn: () => getComments(user, postId, page, limit),
    enabled: !!user && !!postId
  });
};

export const useCreateComment = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      createComment(user, postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BATCH_ENGAGEMENT] });
    }
  });
};

export const useDeleteComment = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(user, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_COMMENTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BATCH_ENGAGEMENT] });
    }
  });
};

// ==================== USER PROFILES ====================

export const useGetUserProfile = (userId: string) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE, userId],
    queryFn: () => getUserProfile(user, userId),
    enabled: !!user && !!userId
  });
};

export const useUpdateProfile = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateData: UpdateProfileData) => updateProfile(user, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_PROFILE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    }
  });
};

export const useUploadAvatar = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(user, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_PROFILE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
    }
  });
};

export const useSearchUsers = (query: string, page = 1, limit = 10) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_USERS, query, page, limit],
    queryFn: () => searchUsers(user, query, page, limit),
    enabled: !!user && query.length >= 2
  });
};

// ==================== FOLLOW ====================

export const useFollowUser = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followUser(user, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_PROFILE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOW_STATUS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FOLLOWERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FOLLOWING] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FEED_INFINITE] });
    }
  });
};

export const useUnfollowUser = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => unfollowUser(user, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_PROFILE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOW_STATUS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FOLLOWERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FOLLOWING] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FEED_INFINITE] });
    }
  });
};

export const useGetFollowers = (userId: string, page = 1, limit = 20) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_FOLLOWERS, userId, page, limit],
    queryFn: () => getFollowers(user, userId, page, limit),
    enabled: !!user && !!userId
  });
};

export const useGetFollowing = (userId: string, page = 1, limit = 20) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_FOLLOWING, userId, page, limit],
    queryFn: () => getFollowing(user, userId, page, limit),
    enabled: !!user && !!userId
  });
};

// ==================== SUGGESTED USERS ====================

export const useGetSuggestedUsers = (limit = 10) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: [QUERY_KEYS.SUGGESTED_USERS, limit],
    queryFn: () => getSuggestedUsers(user, limit),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });
};