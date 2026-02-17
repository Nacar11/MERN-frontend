import { useNavigate } from 'react-router-dom'
import { useGetSuggestedUsers } from '../../react-query/QueriesAndMutations'
import FollowButton from './FollowButton'
import type { UserProfile } from '../../api/types'

const PeopleYouMayKnow = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetSuggestedUsers(8)

    const users: UserProfile[] = data?.data?.users || []

    if (isLoading) {
        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-4">People you may know</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                            <div className="flex-1">
                                <div className="h-3 bg-white/10 rounded w-3/4 mb-2" />
                                <div className="h-2 bg-white/10 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (users.length === 0) return null

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                People you may know
            </h3>
            <div className="space-y-3">
                {users.map((u: UserProfile) => {
                    const userId = u.id || u._id || ''
                    const displayName = u.firstName
                        ? `${u.firstName} ${u.lastName || ''}`.trim()
                        : u.email.split('@')[0]

                    return (
                        <div
                            key={userId}
                            className="flex items-center gap-3"
                        >
                            {/* Avatar */}
                            <button
                                onClick={() => navigate(`/profile/${userId}`)}
                                className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold shrink-0 cursor-pointer hover:ring-2 hover:ring-green-500/30 transition-all"
                                tabIndex={0}
                                aria-label={`View ${displayName}'s profile`}
                            >
                                {displayName[0].toUpperCase()}
                            </button>

                            {/* Name */}
                            <button
                                onClick={() => navigate(`/profile/${userId}`)}
                                className="flex-1 text-left cursor-pointer min-w-0"
                                tabIndex={0}
                            >
                                <p className="text-white text-sm font-medium truncate">{displayName}</p>
                                <p className="text-gray-500 text-xs truncate">{u.email.split('@')[0]}</p>
                            </button>

                            {/* Follow */}
                            <FollowButton userId={userId} isFollowing={false} compact />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PeopleYouMayKnow
