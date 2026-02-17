import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useLikePost, useUnlikePost } from '../../react-query/QueriesAndMutations'

interface LikeButtonProps {
    postId: string
    liked: boolean
    likesCount: number
    onOptimisticUpdate?: (liked: boolean, count: number) => void
}

const LikeButton = ({ postId, liked: initialLiked, likesCount: initialCount, onOptimisticUpdate }: LikeButtonProps) => {
    const [liked, setLiked] = useState(initialLiked)
    const [count, setCount] = useState(initialCount)
    const likeMutation = useLikePost()
    const unlikeMutation = useUnlikePost()

    const handleToggle = () => {
        const newLiked = !liked
        const newCount = newLiked ? count + 1 : count - 1

        // Optimistic update
        setLiked(newLiked)
        setCount(newCount)
        onOptimisticUpdate?.(newLiked, newCount)

        if (newLiked) {
            likeMutation.mutate(postId, {
                onError: () => {
                    setLiked(!newLiked)
                    setCount(count)
                }
            })
        } else {
            unlikeMutation.mutate(postId, {
                onError: () => {
                    setLiked(!newLiked)
                    setCount(count)
                }
            })
        }
    }

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-1.5 group transition-all duration-200 cursor-pointer"
            aria-label={liked ? 'Unlike post' : 'Like post'}
            tabIndex={0}
        >
            {liked ? (
                <FavoriteIcon
                    className="text-red-500 group-hover:scale-110 transition-transform duration-200"
                    sx={{ fontSize: 20 }}
                />
            ) : (
                <FavoriteBorderIcon
                    className="text-gray-400 group-hover:text-red-400 transition-colors duration-200"
                    sx={{ fontSize: 20 }}
                />
            )}
            <span className={`text-sm font-medium ${liked ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'} transition-colors duration-200`}>
                {count > 0 ? count : ''}
            </span>
        </button>
    )
}

export default LikeButton
