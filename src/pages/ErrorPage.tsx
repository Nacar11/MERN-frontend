import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        {/* 404 display */}
        <motion.h1
          className="text-8xl font-black text-green-500 mb-4 drop-shadow-[0_0_20px_rgba(0,255,102,0.3)]"
          animate={{ textShadow: ["0 0 20px rgba(0,255,102,0.3)", "0 0 40px rgba(0,255,102,0.5)", "0 0 20px rgba(0,255,102,0.3)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.h1>

        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Looks like you wandered into the wrong room. The page you're looking for doesn't exist or has been moved.
        </p>

        <NavLink
          to="/"
          className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)]"
        >
          Back to Home
        </NavLink>
      </motion.div>
    </main>
  );
};

export default ErrorPage;