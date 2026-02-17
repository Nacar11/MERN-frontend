export interface User {
  id: string
  _id?: string
  email: string
  name: string
  firstName?: string | null
  lastName?: string | null
  token: string
}

export interface PostImage {
  fileId: string
  filename: string
  contentType: string
  size: number
}

export interface PopulatedUser {
  _id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  avatar?: string | null
}

export interface Post {
  _id: string
  title: string
  content: string
  user_id: PopulatedUser | string  // Can be populated object or string ID
  images?: PostImage[]
  createdAt: string
  updatedAt: string
}

export interface CreatePostData {
  title: string
  content: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
}

export interface GetPostsResponse {
  posts: Post[]
  pagination: PaginationMeta
}

export interface Follow {
  _id: string
  follower: string
  following: string
  createdAt: string
}

export interface FollowCounts {
  followersCount: number
  followingCount: number
}

export interface UserProfile {
  id: string
  _id?: string
  email: string
  firstName?: string | null
  lastName?: string | null
  bio?: string | null
  avatar?: string | null
  authProvider: string
  createdAt: string
  updatedAt: string
}

export interface UserProfileResponse {
  user: UserProfile
  followersCount: number
  followingCount: number
  isFollowing: boolean
}

export interface LikeStatus {
  liked: boolean
  likesCount: number
}

export interface Comment {
  _id: string
  content: string
  user: PopulatedUser
  post: string
  createdAt: string
  updatedAt: string
}

export interface EngagementData {
  liked: boolean
  likesCount: number
  commentsCount: number
}

export interface BatchEngagementResponse {
  engagement: Record<string, EngagementData>
}

export interface UpdateProfileData {
  firstName?: string
  lastName?: string
  bio?: string
}