import { useState } from 'react';
import { Post, PostImage } from '../../api/types';
import { useDeletePost } from '../../react-query/QueriesAndMutations';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from '../../hooks/useAuthContext';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import ImageLightbox from '../modals/ImageLightbox';

interface PostDetailsProps {
  post: Post;
}

const PostDetails = ({ post }: PostDetailsProps) => {
  const { user } = useAuthContext();
  const { mutate: deletePost, isPending } = useDeletePost();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deletePost(post._id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      }
    });
  };

  const handleImageError = (fileId: string) => {
    setImageErrors(prev => new Set(prev).add(fileId));
  };

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const isOwner = user?.id === post.user_id;
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 mb-4">
        {/* Header with Author Info */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            {/* Author Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-sm">
              {post.user_id?.toString().charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {isOwner ? 'You' : `User ${post.user_id?.toString().slice(-4)}`}
              </p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>
          
          {/* Actions */}
          {isOwner && (
            <button
              onClick={handleDeleteClick}
              disabled={isPending}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete post"
            >
              <DeleteIcon fontSize="small" />
            </button>
          )}
        </div>

        {/* Post Content */}
        <div className="px-6 pb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h3>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">{post.content}</p>
          
          {/* Images Gallery */}
          {post.images && post.images.length > 0 && (
            <div className={`mt-4 grid gap-2 ${
              post.images.length === 1 ? 'grid-cols-1' : 
              post.images.length === 2 ? 'grid-cols-2' : 
              post.images.length === 3 ? 'grid-cols-3' : 
              'grid-cols-2 md:grid-cols-3'
            }`}>
              {post.images.map((image: PostImage, index: number) => {
                const imageUrl = `http://localhost:4000/api/posts/image/${image.filename}`;
                
                return (
                  <div 
                    key={image.fileId || index} 
                    className="relative group overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                    onClick={() => !imageErrors.has(image.fileId) && handleImageClick(index)}
                  >
                    {!imageErrors.has(image.fileId) ? (
                      <>
                        <img
                          src={imageUrl}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={() => handleImageError(image.fileId)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                        <div className="text-center text-gray-500">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs">Image unavailable</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <span className="flex items-center gap-1 text-xs">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edited
              </span>
            )}
          </div>
        </div>
    </article>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        isDeleting={isPending}
      />

      {/* Image Lightbox */}
      {post.images && post.images.length > 0 && (
        <ImageLightbox
          images={post.images
            .filter(img => !imageErrors.has(img.fileId))
            .map(img => `http://localhost:4000/api/posts/image/${img.filename}`)}
          initialIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default PostDetails;
