import { motion } from 'framer-motion';

interface Props {
  open: boolean;
}

const LoadingModal = ({ open }: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated spinner */}
        <div className="relative w-12 h-12">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/10"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-transparent border-b-green-400/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Pulsing text */}
        <motion.p
          className="text-gray-400 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingModal;