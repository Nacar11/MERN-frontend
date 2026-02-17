import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserProfile, useBatchEngagement, useGetUserPosts } from '../react-query/QueriesAndMutations'
import { useAuthContext } from '../hooks/useAuthContext'
import { getApiUrl } from '../config/api'
import FollowButton from '../components/specific/FollowButton'
import LikeButton from '../components/specific/LikeButton'
import CommentSection from '../components/specific/CommentSection'
import EditProfileModal from '../components/modals/EditProfileModal'
import FollowerListModal from '../components/modals/FollowerListModal'
import { formatDistanceToNow } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import type { Post, PostImage, EngagementData } from '../api/types'

const ProfilePage = () => {
    const { userId } = useParams<{ userId: string }>()
    const { user } = useAuthContext()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [followerModalOpen, setFollowerModalOpen] = useState(false)
    const [followerTab, setFollowerTab] = useState<'followers' | 'following'>('followers')

    const effectiveUserId = userId || user?.id || user?._id || ''
    const isOwnProfile = effectiveUserId === (user?.id || user?._id)

    const { data: profileData, isLoading: loadingProfile } = useGetUserProfile(effectiveUserId)
    const { data: postsData, isLoading: loadingPosts } = useGetUserPosts(effectiveUserId)

    const profile = profileData?.data
    const userPosts: Post[] = postsData?.data?.posts || []

    const postIds = userPosts.map(p => p._id)
    const { data: engagementData } = useBatchEngagement(postIds)
    const engagement: Record<string, EngagementData> = engagementData?.data?.engagement || {}

    const handleFollowerClick = (tab: 'followers' | 'following') => {
        setFollowerTab(tab)
        setFollowerModalOpen(true)
    }

    if (loadingProfile) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading profile...</div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <p className="text-gray-400">User not found</p>
            </div>
        )
    }

    const displayName = profile.user.firstName
        ? `${profile.user.firstName} ${profile.user.lastName || ''}`.trim()
        : profile.user.email.split('@')[0]

    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-20 pb-24 md:pb-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* Profile Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                    {/* Avatar + Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-4xl font-bold shrink-0 border-2 border-green-500/30 overflow-hidden">
                            {profile.user.avatar ? (
                                <img
                                    src={getApiUrl(`api/posts/image/${profile.user.avatar}`)}
                                    alt={displayName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                displayName[0].toUpperCase()
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-3">
                                <h1 className="text-2xl font-bold text-white">{displayName}</h1>
                                {isOwnProfile ? (
                                    <button
                                        onClick={() => setIsEditOpen(true)}
                                        className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer"
                                        aria-label="Edit profile"
                                    >
                                        <EditIcon sx={{ fontSize: 20 }} />
                                    </button>
                                ) : (
                                    <FollowButton userId={effectiveUserId} isFollowing={profile.isFollowing} />
                                )}
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{profile.user.email}</p>
                            {profile.user.bio && (
                                <p className="text-gray-300 mt-3 text-sm leading-relaxed">{profile.user.bio}</p>
                            )}

                            {/* Stats */}
                            <div className="flex items-center justify-center sm:justify-start gap-6 mt-4">
                                <button
                                    onClick={() => handleFollowerClick('followers')}
                                    className="text-center hover:text-green-400 transition-colors cursor-pointer group"
                                    tabIndex={0}
                                >
                                    <span className="text-white font-bold text-lg group-hover:text-green-400">{profile.followersCount}</span>
                                    <span className="text-gray-400 text-sm ml-1.5">{profile.followersCount === 1 ? 'Follower' : 'Followers'}</span>
                                </button>
                                <button
                                    onClick={() => handleFollowerClick('following')}
                                    className="text-center hover:text-green-400 transition-colors cursor-pointer group"
                                    tabIndex={0}
                                >
                                    <span className="text-white font-bold text-lg group-hover:text-green-400">{profile.followingCount}</span>
                                    <span className="text-gray-400 text-sm ml-1.5">Following</span>
                                </button>
                                <div className="text-center">
                                    <span className="text-white font-bold text-lg">{userPosts.length}</span>
                                    <span className="text-gray-400 text-sm ml-1.5">{userPosts.length === 1 ? 'Post' : 'Posts'}</span>
                                </div>
                            </div>

                            {/* Joined date */}
                            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-3 text-gray-500 text-xs">
                                <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                <span>Joined {formatDistanceToNow(new Date(profile.user.createdAt), { addSuffix: true })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User's Posts */}
                <div className="mt-6">
                    <h2 className="text-white font-bold text-lg mb-4">
                        {isOwnProfile ? 'Your Posts' : `${displayName}'s Posts`}
                    </h2>

                    {loadingPosts ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse">
                                    <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                                    <div className="h-3 bg-white/10 rounded w-full mb-2" />
                                    <div className="h-3 bg-white/10 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : userPosts.length === 0 ? (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                            <p className="text-gray-400">
                                {isOwnProfile ? "You haven't posted anything yet." : "This user hasn't posted anything yet."}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userPosts.map((post) => {
                                const postEngagement = engagement[post._id] || { liked: false, likesCount: 0, commentsCount: 0 }
                                return (
                                    <div
                                        key={post._id}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300"
                                    >
                                        <h3 className="text-white font-semibold text-lg">{post.title}</h3>
                                        <p className="text-gray-300 mt-2 text-sm leading-relaxed">{post.content}</p>

                                        {/* Images */}
                                        {post.images && post.images.length > 0 && (
                                            <div className="mt-3 flex gap-2 overflow-x-auto">
                                                {post.images.map((img: PostImage, idx: number) => (
                                                    <img
                                                        key={idx}
                                                        src={getApiUrl(`api/posts/image/${img.filename}`)}
                                                        alt={`Post image ${idx + 1}`}
                                                        className="h-48 rounded-xl object-cover"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Timestamp + engagement */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-gray-500 text-xs">
                                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                            </span>
                                            <div className="flex items-center gap-4">
                                                <LikeButton
                                                    postId={post._id}
                                                    liked={postEngagement.liked}
                                                    likesCount={postEngagement.likesCount}
                                                />
                                                <CommentSection postId={post._id} commentsCount={postEngagement.commentsCount} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {isOwnProfile && (
                <EditProfileModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    currentProfile={profile.user}
                />
            )}

            <FollowerListModal
                isOpen={followerModalOpen}
                onClose={() => setFollowerModalOpen(false)}
                userId={effectiveUserId}
                initialTab={followerTab}
            />
        </div>
    )
}

export default ProfilePage
