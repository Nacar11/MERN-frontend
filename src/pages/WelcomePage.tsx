import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion, AnimatePresence } from "framer-motion";

const WelcomePage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const firstName = user?.firstName || user?.name?.split(" ")[0] || "there";

    // Generate particles once
    const particles = useMemo(
        () =>
            Array.from({ length: 30 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                size: Math.random() * 6 + 2,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 2,
            })),
        []
    );

    useEffect(() => {
        // Show content after initial animation
        const contentTimer = setTimeout(() => setShowContent(true), 400);
        const buttonTimer = setTimeout(() => setShowButton(true), 2000);

        // Auto-redirect after 6 seconds
        const redirectTimer = setTimeout(() => {
            localStorage.removeItem("isNewUser");
            navigate("/", { replace: true });
        }, 6000);

        return () => {
            clearTimeout(contentTimer);
            clearTimeout(buttonTimer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    const handleSkip = () => {
        localStorage.removeItem("isNewUser");
        navigate("/", { replace: true });
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                {/* Central glow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[150px]"
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Secondary glow */}
                <motion.div
                    className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </motion.div>

            {/* Floating particles */}
            {particles.map(({ id, left, top, size, duration, delay }) => (
                <motion.div
                    key={id}
                    className="absolute rounded-full bg-green-400/40"
                    style={{
                        left,
                        top,
                        width: size,
                        height: size,
                    }}
                    animate={{
                        y: [0, -60, 0],
                        x: [0, (Math.random() - 0.5) * 40, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Main content */}
            <div className="relative z-10 text-center px-6 max-w-lg">
                <AnimatePresence>
                    {showContent && (
                        <>
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "backOut" }}
                            >
                                <img
                                    src="/assets/logo.png"
                                    alt="Social"
                                    className="w-28 h-28 mx-auto mb-6"
                                />
                            </motion.div>

                            {/* Welcome text */}
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-white mb-4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                Welcome,{" "}
                                <span className="text-green-500 font-black drop-shadow-[0_0_12px_rgba(0,255,102,0.5)]">
                                    {firstName}
                                </span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                className="text-gray-400 text-lg md:text-xl mb-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                You're now part of the club
                            </motion.p>

                            {/* Divider line */}
                            <motion.div
                                className="w-24 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto my-6"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                            />

                            {/* Sub-message */}
                            <motion.p
                                className="text-gray-500 text-sm md:text-base mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            >
                                Share your thoughts, connect with others, and make your mark.
                            </motion.p>

                            {/* CTA Button */}
                            {showButton && (
                                <motion.button
                                    onClick={handleSkip}
                                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:shadow-[0_0_35px_rgba(0,255,102,0.6)]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Let's Go →
                                </motion.button>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WelcomePage;
