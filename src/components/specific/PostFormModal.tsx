import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePost } from '../../react-query/QueriesAndMutations';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { isMobileDevice } from '../../utils/deviceDetection';

const PostFormValidation = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  content: z.string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),
});

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostFormModal = ({ isOpen, onClose }: PostFormModalProps) => {
  const { mutate: createPost, isPending, error: serverError } = useCreatePost();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const isMobile = isMobileDevice();

  const form = useForm<z.infer<typeof PostFormValidation>>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const handleFormSubmit = (data: z.infer<typeof PostFormValidation>) => {
    createPost(
      {
        postData: { title: data.title, content: data.content },
        images: images.length > 0 ? images : undefined,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = images.length + files.length;

    if (totalImages > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);

    // Reset file input
    if (e.target) e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    reset();
    setImages([]);
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setImagePreviews([]);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isPending) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isPending) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-form-title"
      tabIndex={-1}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-[#111111] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 id="post-form-title" className="text-xl font-bold text-white">Create Post</h2>
            <p className="text-sm text-gray-400 mt-1">Share something with the community</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isPending}
            className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 disabled:opacity-50"
            aria-label="Close modal"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Server error */}
            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3" role="alert">
                {serverError instanceof Error ? serverError.message : 'Failed to create post'}
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="post-title" className="block mb-2 text-sm font-medium text-gray-400">
                Title
              </label>
              <input
                id="post-title"
                type="text"
                placeholder="Give your post a title"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder:text-gray-600 transition-all duration-200 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                {...register('title')}
              />
              {errors.title && (
                <p className="mt-1 text-red-400 text-xs">{errors.title.message}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="post-content" className="block mb-2 text-sm font-medium text-gray-400">
                Content
              </label>
              <textarea
                id="post-content"
                rows={4}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder:text-gray-600 transition-all duration-200 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 resize-none"
                {...register('content')}
              />
              {errors.content && (
                <p className="mt-1 text-red-400 text-xs">{errors.content.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400">
                Images <span className="text-gray-600">({images.length}/5)</span>
              </label>

              <div className="flex gap-2">
                {isMobile ? (
                  <>
                    {/* Camera button */}
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={images.length >= 5}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg transition-all duration-200 hover:bg-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <CameraAltIcon fontSize="small" />
                      <span className="text-sm">Camera</span>
                    </button>
                    {/* Gallery button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={images.length >= 5}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-gray-300 border border-white/10 rounded-lg transition-all duration-200 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <PhotoLibraryIcon fontSize="small" />
                      <span className="text-sm">Gallery</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= 5}
                    className="flex items-center gap-2 px-4 py-3 bg-white/5 text-gray-300 border border-white/10 rounded-lg transition-all duration-200 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ImageIcon fontSize="small" />
                    <span className="text-sm">Add Images</span>
                  </button>
                )}
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
              {isMobile && (
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              )}

              {/* Image previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/80"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="px-6 py-2.5 bg-transparent border border-white/20 text-gray-300 rounded-lg transition-all duration-200 hover:bg-white/10 disabled:opacity-50 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Posting...
                </span>
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostFormModal;
