import { User, CreatePostData } from './types'

export const createPost = async (user: User | null, postData: CreatePostData, images?: File[]) => {
  try {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    
    // Add images if provided
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`
        // Don't set Content-Type - browser will set it with boundary for multipart/form-data
      },
      body: formData
    })
    const json = await response.json()
    
    if (!response.ok) {
      throw new Error(json.message || 'Failed to create post')
    }
    
    return json
  } catch (error) {
    console.error('Create post error:', error)
    throw error
  }
}

export const getAllPosts = async (user: User | null, page = 1, limit = 10) => {
  try {
    const response = await fetch(`/api/posts/all?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()
    
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch posts')
    }
    
    return json
  } catch (error) {
    console.error('Get posts error:', error)
    throw error
  }
}

export const deletePost = async (user: User | null, postId: string) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()
    
    if (!response.ok) {
      throw new Error(json.message || 'Failed to delete post')
    }
    
    return json
  } catch (error) {
    console.error('Delete post error:', error)
    throw error
  }
}