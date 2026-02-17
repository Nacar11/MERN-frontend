import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import { useGetFollowers, useGetFollowing } from '../../react-query/QueriesAndMutations'
import { useNavigate } from 'react-router-dom'
import type { PopulatedUser } from '../../api/types'

interface FollowerListModalProps {
    isOpen: boolean
    onClose: () => void
    userId: string
    initialTab: 'followers' | 'following'
}

const FollowerListModal = ({ isOpen, onClose, userId, initialTab }: FollowerListModalProps) => {
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab)
    const navigate = useNavigate()

    const { data: followersData, isLoading: loadingFollowers } = useGetFollowers(userId)
    const { data: followingData, isLoading: loadingFollowing } = useGetFollowing(userId)

    const followers: PopulatedUser[] = followersData?.data?.followers || []
    const following: PopulatedUser[] = followingData?.data?.following || []

    const handleUserClick = (clickedUserId: string) => {
        onClose()
        navigate(`/profile/${clickedUserId}`)
    }

    const currentList = activeTab === 'followers' ? followers : following
    const isLoading = activeTab === 'followers' ? loadingFollowers : loadingFollowing

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#111111',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                }
            }}
        >
            <div className="min-h-[300px]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white">Connections</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('followers')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'followers' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Followers ({followersData?.data?.pagination?.total || 0})
                    </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'following' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Following ({followingData?.data?.pagination?.total || 0})
                    </button>
                </div>

                {/* List */}
                <div className="max-h-80 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-pulse text-gray-500 text-sm">Loading...</div>
                        </div>
                    ) : currentList.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-8">
                            {activeTab === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
                        </p>
                    ) : (
                        currentList.map((person) => (
                            <button
                                key={person._id}
                                onClick={() => handleUserClick(person._id)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer"
                                tabIndex={0}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold shrink-0">
                                    {(person.firstName?.[0] || person.email[0]).toUpperCase()}
                                </div>
                                <div className="text-left">
                                    <p className="text-white text-sm font-medium">
                                        {person.firstName ? `${person.firstName} ${person.lastName || ''}`.trim() : person.email.split('@')[0]}
                                    </p>
                                    <p className="text-gray-500 text-xs">{person.email}</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </Dialog>
    )
}

export default FollowerListModal
