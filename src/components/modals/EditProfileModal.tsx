import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import { useUpdateProfile, useUploadAvatar } from '../../react-query/QueriesAndMutations'
import { useAuthContext } from '../../hooks/useAuthContext'

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
    currentProfile: {
        firstName?: string | null
        lastName?: string | null
        bio?: string | null
        avatar?: string | null
    }
}

const EditProfileModal = ({ isOpen, onClose, currentProfile }: EditProfileModalProps) => {
    const [firstName, setFirstName] = useState(currentProfile.firstName || '')
    const [lastName, setLastName] = useState(currentProfile.lastName || '')
    const [bio, setBio] = useState(currentProfile.bio || '')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    const updateMutation = useUpdateProfile()
    const avatarMutation = useUploadAvatar()
    const { user } = useAuthContext()

    const isPending = updateMutation.isPending || avatarMutation.isPending

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (avatarFile) {
                await avatarMutation.mutateAsync(avatarFile)
            }

            await updateMutation.mutateAsync({
                firstName: firstName.trim() || undefined,
                lastName: lastName.trim() || undefined,
                bio: bio.trim() || undefined,
            })

            onClose()
        } catch (error) {
            console.error('Profile update error:', error)
        }
    }

    if (!user) return null

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
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
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-3xl font-bold overflow-hidden border-2 border-green-500/30">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                            ) : (
                                (firstName?.[0] || 'U').toUpperCase()
                            )}
                        </div>
                        <label className="text-green-400 text-sm font-medium cursor-pointer hover:text-green-300 transition-colors">
                            Change Avatar
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                                maxLength={50}
                                className="w-full bg-[#1A1A1A] border border-white/10 text-white placeholder:text-gray-600 rounded-lg px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                                maxLength={50}
                                className="w-full bg-[#1A1A1A] border border-white/10 text-white placeholder:text-gray-600 rounded-lg px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-1.5">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell people about yourself..."
                            maxLength={500}
                            rows={3}
                            className="w-full bg-[#1A1A1A] border border-white/10 text-white placeholder:text-gray-600 rounded-lg px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-200 resize-none"
                        />
                        <p className="text-gray-600 text-xs mt-1 text-right">{bio.length}/500</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-transparent border border-white/20 text-gray-300 hover:bg-white/10 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg px-6 py-3 text-sm transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default EditProfileModal
