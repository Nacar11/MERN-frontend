import { User, CreatePostData, UpdateProfileData } from './types'
import { getApiUrl } from '../config/api'

// ==================== POSTS ====================

export const createPost = async (user: User | null, postData: CreatePostData, images?: File[]) => {
  try {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await fetch(getApiUrl('api/posts'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`
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
    const response = await fetch(getApiUrl(`api/posts/all?page=${page}&limit=${limit}`), {
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

export const getUserPosts = async (user: User | null, userId: string, page = 1, limit = 10) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/user/${userId}?page=${page}&limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch user posts')
    }

    return json
  } catch (error) {
    console.error('Get user posts error:', error)
    throw error
  }
}

export const getFeed = async (user: User | null, page = 1, limit = 10) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/feed?page=${page}&limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch feed')
    }

    return json
  } catch (error) {
    console.error('Get feed error:', error)
    throw error
  }
}

export const deletePost = async (user: User | null, postId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/${postId}`), {
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

export const updatePost = async (user: User | null, postId: string, updateData: { title?: string; content?: string }) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/${postId}`), {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to update post')
    }

    return json
  } catch (error) {
    console.error('Update post error:', error)
    throw error
  }
}

export const searchPosts = async (user: User | null, query: string, page = 1, limit = 10) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to search posts')
    }

    return json
  } catch (error) {
    console.error('Search posts error:', error)
    throw error
  }
}

export const getBatchEngagement = async (user: User | null, postIds: string[]) => {
  try {
    const response = await fetch(getApiUrl('api/posts/batch/engagement'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postIds })
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch engagement')
    }

    return json
  } catch (error) {
    console.error('Batch engagement error:', error)
    throw error
  }
}

// ==================== LIKES ====================

export const likePost = async (user: User | null, postId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/${postId}/like`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to like post')
    }

    return json
  } catch (error) {
    console.error('Like post error:', error)
    throw error
  }
}

export const unlikePost = async (user: User | null, postId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/${postId}/like`), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to unlike post')
    }

    return json
  } catch (error) {
    console.error('Unlike post error:', error)
    throw error
  }
}

// ==================== COMMENTS ====================

export const getComments = async (user: User | null, postId: string, page = 1, limit = 20) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/${postId}/comments?page=${page}&limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch comments')
    }

    return json
  } catch (error) {
    console.error('Get comments error:', error)
    throw error
  }
}

export const createComment = async (user: User | null, postId: string, content: string) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/${postId}/comments`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to create comment')
    }

    return json
  } catch (error) {
    console.error('Create comment error:', error)
    throw error
  }
}

export const deleteComment = async (user: User | null, commentId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/posts/comments/${commentId}`), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to delete comment')
    }

    return json
  } catch (error) {
    console.error('Delete comment error:', error)
    throw error
  }
}

// ==================== USERS & PROFILES ====================

export const getUserProfile = async (user: User | null, userId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/users/${userId}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch profile')
    }

    return json
  } catch (error) {
    console.error('Get profile error:', error)
    throw error
  }
}

export const updateProfile = async (user: User | null, updateData: UpdateProfileData) => {
  try {
    const response = await fetch(getApiUrl('api/users/profile'), {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to update profile')
    }

    return json
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

export const uploadAvatar = async (user: User | null, file: File) => {
  try {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await fetch(getApiUrl('api/users/avatar'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`
      },
      body: formData
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to upload avatar')
    }

    return json
  } catch (error) {
    console.error('Upload avatar error:', error)
    throw error
  }
}

export const searchUsers = async (user: User | null, query: string, page = 1, limit = 10) => {
  try {
    const response = await fetch(getApiUrl(`api/users/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to search users')
    }

    return json
  } catch (error) {
    console.error('Search users error:', error)
    throw error
  }
}

export const getSuggestedUsers = async (user: User | null, limit = 10) => {
  try {
    const response = await fetch(getApiUrl(`api/users/suggested?limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`,
      },
    })
    const json = await response.json()
    if (!response.ok) throw new Error(json.message || 'Failed to get suggestions')
    return json
  } catch (error) {
    console.error('Get suggested users error:', error)
    throw error
  }
}

// ==================== FOLLOW ====================

export const followUser = async (user: User | null, userId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/users/${userId}/follow`), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to follow user')
    }

    return json
  } catch (error) {
    console.error('Follow user error:', error)
    throw error
  }
}

export const unfollowUser = async (user: User | null, userId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/users/${userId}/follow`), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to unfollow user')
    }

    return json
  } catch (error) {
    console.error('Unfollow user error:', error)
    throw error
  }
}

export const getFollowers = async (user: User | null, userId: string, page = 1, limit = 20) => {
  try {
    const response = await fetch(getApiUrl(`api/users/${userId}/followers?page=${page}&limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch followers')
    }

    return json
  } catch (error) {
    console.error('Get followers error:', error)
    throw error
  }
}

export const getFollowing = async (user: User | null, userId: string, page = 1, limit = 20) => {
  try {
    const response = await fetch(getApiUrl(`api/users/${userId}/following?page=${page}&limit=${limit}`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch following')
    }

    return json
  } catch (error) {
    console.error('Get following error:', error)
    throw error
  }
}

export const getFollowStatus = async (user: User | null, userId: string) => {
  try {
    const response = await fetch(getApiUrl(`api/users/${userId}/follow/status`), {
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.message || 'Failed to check follow status')
    }

    return json
  } catch (error) {
    console.error('Follow status error:', error)
    throw error
  }
}