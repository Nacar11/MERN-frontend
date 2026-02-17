import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
  open: boolean;
  errorMessage: string;
  onClose: () => void;
}

const ErrorModal = ({ open, errorMessage, onClose }: Props) => {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      tabIndex={-1}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-[#111111] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <ErrorOutlineIcon className="text-red-400" fontSize="small" />
            </div>
            <h2 id="error-modal-title" className="text-lg font-bold text-white">Error</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
            aria-label="Close error modal"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-400 text-sm leading-relaxed">{errorMessage}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-transparent border border-white/20 text-gray-300 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorModal;