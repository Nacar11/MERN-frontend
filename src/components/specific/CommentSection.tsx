import { useState } from 'react'
import { useGetComments, useCreateComment, useDeleteComment } from '../../react-query/QueriesAndMutations'
import { useAuthContext } from '../../hooks/useAuthContext'
import { formatDistanceToNow } from 'date-fns'
import SendIcon from '@mui/icons-material/Send'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import type { Comment } from '../../api/types'

interface CommentSectionProps {
    postId: string
    commentsCount: number
}

const CommentSection = ({ postId, commentsCount: initialCount }: CommentSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { data: commentsData, isLoading } = useGetComments(postId, 1, 50)
    const createMutation = useCreateComment()
    const deleteMutation = useDeleteComment()

    const comments: Comment[] = commentsData?.data?.comments || []
    const displayCount = isExpanded ? comments.length : initialCount

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        createMutation.mutate(
            { postId, content: newComment.trim() },
            {
                onSuccess: () => setNewComment('')
            }
        )
    }

    const handleDelete = (commentId: string) => {
        deleteMutation.mutate(commentId)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div className="mt-2">
            {/* Toggle button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors duration-200 cursor-pointer group"
                aria-label={isExpanded ? 'Hide comments' : 'Show comments'}
                tabIndex={0}
            >
                <ChatBubbleOutlineIcon
                    className="group-hover:text-green-400 transition-colors duration-200"
                    sx={{ fontSize: 18 }}
                />
                <span className="text-sm font-medium">
                    {displayCount > 0 ? displayCount : ''} {displayCount === 1 ? 'Comment' : displayCount > 1 ? 'Comments' : 'Comment'}
                </span>
            </button>

            {/* Expanded section */}
            {isExpanded && (
                <div className="mt-3 space-y-3">
                    {/* Comment input */}
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Write a comment..."
                            className="flex-1 bg-[#1A1A1A] border border-white/10 text-white placeholder:text-gray-600 rounded-lg px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-200"
                            maxLength={2000}
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim() || createMutation.isPending}
                            className="bg-green-500 hover:bg-green-600 text-black rounded-lg px-3 py-2.5 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            aria-label="Submit comment"
                        >
                            <SendIcon sx={{ fontSize: 18 }} />
                        </button>
                    </form>

                    {/* Comments list */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <div className="animate-pulse text-gray-500 text-sm">Loading comments...</div>
                        </div>
                    ) : comments.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-3">No comments yet. Be the first!</p>
                    ) : (
                        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                            {comments.map((comment: Comment) => (
                                <div
                                    key={comment._id}
                                    className="bg-white/5 rounded-xl px-4 py-3 group hover:bg-white/8 transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400 text-sm font-semibold">
                                                    {comment.user.firstName || comment.user.email.split('@')[0]}
                                                </span>
                                                <span className="text-gray-600 text-xs">
                                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm mt-1 break-words">{comment.content}</p>
                                        </div>
                                        {user && (user.id === comment.user._id || user._id === comment.user._id) && (
                                            <button
                                                onClick={() => handleDelete(comment._id)}
                                                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all duration-200 ml-2 cursor-pointer"
                                                aria-label="Delete comment"
                                                tabIndex={0}
                                            >
                                                <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CommentSection
