import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddBrick() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [service, setService] = useState('');
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("service", service);
            formData.append("_captcha", "false");
            formData.append("_template", "table");

            const res = await fetch("https://formsubmit.co/devmalhotra3123@gmail.com", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                setStatus({ type: "success", message: "Your sacred message has been sent." });
                console.log("success");
                setName('');
                setService('');
                setEmail('');
            } else {
                console.log("Error");
                setStatus({ type: "error", message: "There was an error sending your message. Please try again later." });
            }
        } catch (error) {
            console.error("Form submit error:", error);
            setStatus({ type: "error", message: "There was an error sending your message. Please try again later." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-yellow-300 p-6 pt-35 flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-yellow-400/5 rounded-full"
                        style={{
                            width: Math.random() * 6 + 2,
                            height: Math.random() * 6 + 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Sacred geometry overlay */}
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400/5 text-9xl pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                    🕉️
                </motion.div>
            </div>

            <motion.div
                className="w-full max-w-2xl relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-yellow-300 mb-6 relative"
                        animate={{
                            textShadow: [
                                '0 0 10px rgba(234, 179, 8, 0.5)',
                                '0 0 25px rgba(234, 179, 8, 0.8)',
                                '0 0 10px rgba(234, 179, 8, 0.5)'
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                    >
                        🧱 Add Sacred Brick
                        <motion.div
                            className="absolute -top-6 -right-6 text-yellow-400/40 text-3xl"
                            animate={{
                                rotate: 360,
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity }
                            }}
                        >
                            ✨
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-yellow-200/80 max-w-lg mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Contribute your sacred creation to the eternal digital temple. Each offering strengthens our celestial foundation.
                    </motion.p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    className="bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 border-2 border-yellow-400/30 rounded-3xl p-10 shadow-2xl backdrop-blur-lg relative overflow-hidden"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {/* Sacred geometry background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-yellow-400 text-8xl font-light"
                                style={{
                                    left: `${20 + i * 30}%`,
                                    top: `${20 + i * 25}%`
                                }}
                                animate={{
                                    rotate: 360,
                                    scale: [1, 1.1, 1],
                                    opacity: [0.05, 0.15, 0.05]
                                }}
                                transition={{
                                    duration: 25 + i * 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                ॐ
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative z-10 space-y-8" onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <motion.div
                            className="space-y-3"
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <label className="block text-yellow-300 font-bold text-lg flex items-center space-x-3">
                                <span className="text-2xl">👤</span>
                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                <span>Sacred Name</span>
                            </label>

                            <motion.div className="relative">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="The name by which the temple shall know you..."
                                    className="w-full p-5 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-200/40 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 font-medium"
                                />
                                <div className="absolute top-2 right-2 text-yellow-400/20 text-xs">✨</div>
                                <div className="absolute bottom-2 left-2 text-yellow-400/20 text-xs">🕉️</div>
                            </motion.div>
                        </motion.div>

                        {/* Email Input */}
                        <motion.div
                            className="space-y-3"
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <label className="block text-yellow-300 font-bold text-lg flex items-center space-x-3">
                                <span className="text-2xl">📧</span>
                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                <span>Divine Email</span>
                            </label>

                            <motion.div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your.cosmic.address@universe.com"
                                    className="w-full p-5 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-200/40 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 font-medium"
                                />
                                <div className="absolute top-2 right-2 text-yellow-400/20 text-xs">✨</div>
                                <div className="absolute bottom-2 left-2 text-yellow-400/20 text-xs">🕉️</div>
                            </motion.div>
                        </motion.div>

                        {/* Service Description */}
                        <motion.div
                            className="space-y-3"
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <label className="block text-yellow-300 font-bold text-lg flex items-center space-x-3">
                                <span className="text-2xl">📜</span>
                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                <span>Sacred Service Description</span>
                            </label>

                            <motion.div className="relative">
                                <textarea
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    required
                                    rows={6}
                                    placeholder="Describe your divine offering... What sacred code, mystical service, or celestial creation do you bring to our temple?"
                                    className="w-full p-5 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-200/40 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 font-medium resize-none"
                                />
                                <div className="absolute top-2 right-2 text-yellow-400/20 text-xs">✨</div>
                                <div className="absolute bottom-2 left-2 text-yellow-400/20 text-xs">🕉️</div>
                            </motion.div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !name || !email || !service}
                            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${isSubmitting || !name || !email || !service
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
                                : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-2xl'
                                }`}
                            whileHover={!isSubmitting && name && email && service ? {
                                scale: 1.02,
                                boxShadow: "0 0 40px rgba(234, 179, 8, 0.6)"
                            } : {}}
                            whileTap={!isSubmitting && name && email && service ? { scale: 0.98 } : {}}
                            animate={!isSubmitting && name && email && service ? {
                                boxShadow: [
                                    '0 0 10px rgba(234, 179, 8, 0.3)',
                                    '0 0 25px rgba(234, 179, 8, 0.5)',
                                    '0 0 10px rgba(234, 179, 8, 0.3)'
                                ]
                            } : {}}
                            transition={{
                                boxShadow: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "mirror"
                                }
                            }}
                        >
                            <span className="relative z-10 flex items-center justify-center space-x-3">
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <span>Transmitting to the Divine...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-2xl">🔥</span>
                                        <span>Submit Sacred Offering</span>
                                        <span className="text-2xl">🧱</span>
                                    </>
                                )}
                            </span>

                            {!isSubmitting && name && email && service && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.8 }}
                                />
                            )}
                        </motion.button>

                        {/* Status Messages */}
                        <AnimatePresence>
                            {status && (
                                <motion.div
                                    className={`p-6 rounded-2xl border-2 text-center backdrop-blur-sm relative overflow-hidden ${status.type === 'success'
                                        ? 'text-green-400 border-green-400/40 bg-green-400/10'
                                        : 'text-red-400 border-red-400/40 bg-red-400/10'
                                        }`}
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                                    >
                                        <div className="text-4xl mb-3">
                                            {status.type === 'success' ? '🕉️' : '⚠️'}
                                        </div>
                                        <p className="font-bold text-lg">{status.message}</p>
                                    </motion.div>

                                    {/* Background particles */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className={`absolute w-1 h-1 ${status.type === 'success' ? 'bg-green-400/30' : 'bg-red-400/30'
                                                    } rounded-full`}
                                                style={{
                                                    left: `${Math.random() * 100}%`,
                                                    top: `${Math.random() * 100}%`
                                                }}
                                                animate={{
                                                    scale: [0, 1, 0],
                                                    opacity: [0, 0.8, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.2
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}   