export interface User {
    id: string
    email: string
    name: string
    token: string
  }

export interface PostImage {
    fileId: string
    filename: string
    contentType: string
    size: number
  }

export interface Post {
    _id: string
    title: string
    content: string
    user_id: string
    images?: PostImage[]
    createdAt: string
    updatedAt: string
  }

export interface CreatePostData {
    title: string
    content: string
  }