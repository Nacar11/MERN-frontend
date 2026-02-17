import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSearchPosts, useSearchUsers } from '../react-query/QueriesAndMutations'
import { useAuthContext } from '../hooks/useAuthContext'
import { getApiUrl } from '../config/api'
import { formatDistanceToNow } from 'date-fns'
import FollowButton from '../components/specific/FollowButton'
import SearchIcon from '@mui/icons-material/Search'
import type { Post, UserProfile } from '../api/types'

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const queryFromUrl = searchParams.get('q') || ''
    const [inputValue, setInputValue] = useState(queryFromUrl)
    const [activeTab, setActiveTab] = useState<'posts' | 'people'>('posts')

    // Sync input with URL
    useEffect(() => {
        setInputValue(queryFromUrl)
    }, [queryFromUrl])

    const { data: postsData, isLoading: loadingPosts } = useSearchPosts(queryFromUrl)
    const { data: usersData, isLoading: loadingUsers } = useSearchUsers(queryFromUrl)

    const posts: Post[] = postsData?.data?.posts || []
    const users: UserProfile[] = usersData?.data?.users || []

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = inputValue.trim()
        if (trimmed.length > 0) {
            navigate(`/search?q=${encodeURIComponent(trimmed)}`)
        }
    }

    const handlePostClick = (postId: string) => {
        navigate(`/post/${postId}`)
    }

    const handleUserClick = (userId: string) => {
        navigate(`/profile/${userId}`)
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-20 pb-24 md:pb-8">
            <div className="max-w-3xl mx-auto px-4">
                {/* Search Input */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                        <SearchIcon
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            sx={{ fontSize: 22 }}
                        />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search posts or people..."
                            autoFocus
                            className="w-full bg-[#111111] border border-white/10 text-white placeholder:text-gray-600 rounded-2xl pl-12 pr-4 py-4 text-base focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-200"
                        />
                    </div>
                </form>

                {queryFromUrl && (
                    <>
                        {/* Results Header */}
                        <p className="text-gray-400 text-sm mb-4">
                            Results for "<span className="text-white font-medium">{queryFromUrl}</span>"
                        </p>

                        {/* Tabs */}
                        <div className="flex border-b border-white/10 mb-6">
                            <button
                                onClick={() => setActiveTab('posts')}
                                className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'posts'
                                        ? 'text-green-400 border-b-2 border-green-400'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Posts {posts.length > 0 && `(${posts.length})`}
                            </button>
                            <button
                                onClick={() => setActiveTab('people')}
                                className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'people'
                                        ? 'text-green-400 border-b-2 border-green-400'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                People {users.length > 0 && `(${users.length})`}
                            </button>
                        </div>

                        {/* Posts Tab */}
                        {activeTab === 'posts' && (
                            <div>
                                {loadingPosts ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse">
                                                <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                                                <div className="h-3 bg-white/10 rounded w-full mb-2" />
                                                <div className="h-3 bg-white/10 rounded w-2/3" />
                                            </div>
                                        ))}
                                    </div>
                                ) : posts.length === 0 ? (
                                    <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
                                        <p className="text-gray-500 text-lg">No posts found</p>
                                        <p className="text-gray-600 text-sm mt-1">Try a different search term</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {posts.map((post: Post) => {
                                            const postUser = typeof post.user_id === 'object' ? post.user_id : null
                                            return (
                                                <button
                                                    key={post._id}
                                                    onClick={() => handlePostClick(post._id)}
                                                    className="w-full text-left bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 cursor-pointer"
                                                    tabIndex={0}
                                                >
                                                    {/* Author */}
                                                    {postUser && (
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">
                                                                {(postUser.firstName?.[0] || postUser.email[0]).toUpperCase()}
                                                            </div>
                                                            <span className="text-gray-400 text-sm">
                                                                {postUser.firstName
                                                                    ? `${postUser.firstName} ${postUser.lastName || ''}`.trim()
                                                                    : postUser.email.split('@')[0]}
                                                            </span>
                                                            <span className="text-gray-600 text-xs">
                                                                · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                                            </span>
                                                        </div>
                                                    )}

                                                    <h3 className="text-white font-semibold text-lg">{post.title}</h3>
                                                    <p className="text-gray-300 mt-2 text-sm leading-relaxed line-clamp-3">
                                                        {post.content}
                                                    </p>

                                                    {/* Images preview */}
                                                    {post.images && post.images.length > 0 && (
                                                        <div className="mt-3 flex gap-2">
                                                            {post.images.slice(0, 3).map((img, idx) => (
                                                                <img
                                                                    key={idx}
                                                                    src={getApiUrl(`api/posts/image/${img.filename}`)}
                                                                    alt={`Post image ${idx + 1}`}
                                                                    className="h-20 w-20 rounded-lg object-cover"
                                                                />
                                                            ))}
                                                            {post.images.length > 3 && (
                                                                <div className="h-20 w-20 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 text-sm font-medium">
                                                                    +{post.images.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* People Tab */}
                        {activeTab === 'people' && (
                            <div>
                                {loadingUsers ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-white/5 rounded-2xl p-4 animate-pulse flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white/10" />
                                                <div className="flex-1">
                                                    <div className="h-4 bg-white/10 rounded w-1/3 mb-2" />
                                                    <div className="h-3 bg-white/10 rounded w-1/2" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : users.length === 0 ? (
                                    <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
                                        <p className="text-gray-500 text-lg">No people found</p>
                                        <p className="text-gray-600 text-sm mt-1">Try a different search term</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {users.map((u: UserProfile) => {
                                            const userId = u.id || u._id || ''
                                            const isOwnProfile = userId === (user?.id || user?._id)
                                            const displayName = u.firstName
                                                ? `${u.firstName} ${u.lastName || ''}`.trim()
                                                : u.email.split('@')[0]

                                            return (
                                                <div
                                                    key={userId}
                                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/8 transition-all duration-300"
                                                >
                                                    {/* Avatar */}
                                                    <button
                                                        onClick={() => handleUserClick(userId)}
                                                        className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-lg font-bold shrink-0 cursor-pointer hover:ring-2 hover:ring-green-500/30 transition-all"
                                                        tabIndex={0}
                                                        aria-label={`View ${displayName}'s profile`}
                                                    >
                                                        {displayName[0].toUpperCase()}
                                                    </button>

                                                    {/* Info */}
                                                    <button
                                                        onClick={() => handleUserClick(userId)}
                                                        className="flex-1 text-left cursor-pointer min-w-0"
                                                        tabIndex={0}
                                                    >
                                                        <p className="text-white font-medium truncate">{displayName}</p>
                                                        <p className="text-gray-500 text-sm truncate">{u.email}</p>
                                                        {u.bio && (
                                                            <p className="text-gray-400 text-xs mt-1 truncate">{u.bio}</p>
                                                        )}
                                                    </button>

                                                    {/* Follow Button */}
                                                    {!isOwnProfile && (
                                                        <FollowButton userId={userId} isFollowing={false} />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Empty state when no query */}
                {!queryFromUrl && (
                    <div className="text-center py-16">
                        <SearchIcon className="text-gray-700 mb-4" sx={{ fontSize: 48 }} />
                        <p className="text-gray-500 text-lg">Search for posts or people</p>
                        <p className="text-gray-600 text-sm mt-1">Type something and press Enter</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage
