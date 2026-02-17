import { useState } from 'react'
import { useFollowUser, useUnfollowUser } from '../../react-query/QueriesAndMutations'

interface FollowButtonProps {
    userId: string
    isFollowing: boolean
    onFollowChange?: (isFollowing: boolean) => void
    compact?: boolean
}

const FollowButton = ({ userId, isFollowing: initialFollowing, onFollowChange, compact }: FollowButtonProps) => {
    const [isFollowing, setIsFollowing] = useState(initialFollowing)
    const [isHovering, setIsHovering] = useState(false)
    const followMutation = useFollowUser()
    const unfollowMutation = useUnfollowUser()
    const isPending = followMutation.isPending || unfollowMutation.isPending

    const handleToggle = () => {
        if (isPending) return

        const newState = !isFollowing
        setIsFollowing(newState)
        onFollowChange?.(newState)

        if (newState) {
            followMutation.mutate(userId, {
                onError: () => {
                    setIsFollowing(!newState)
                    onFollowChange?.(!newState)
                }
            })
        } else {
            unfollowMutation.mutate(userId, {
                onError: () => {
                    setIsFollowing(!newState)
                    onFollowChange?.(!newState)
                }
            })
        }
    }

    const getButtonContent = () => {
        if (isPending) return 'Loading...'
        if (isFollowing && isHovering) return 'Unfollow'
        if (isFollowing) return 'Following'
        return 'Follow'
    }

    const getButtonClasses = () => {
        const base = compact
            ? 'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer'
            : 'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer'

        if (isFollowing && isHovering) {
            return `${base} bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20`
        }
        if (isFollowing) {
            return `${base} bg-transparent border border-white/20 text-gray-300 hover:bg-white/10`
        }
        return `${base} bg-green-500 text-black hover:bg-green-600 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)]`
    }

    return (
        <button
            onClick={handleToggle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={getButtonClasses()}
            disabled={isPending}
            aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
            tabIndex={0}
        >
            {getButtonContent()}
        </button>
    )
}

export default FollowButton
