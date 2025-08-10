import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const SacredInput = ({
    label,
    type = "text",
    value,
    onChange,
    name,
    required = true,
    rows,
    placeholder,
    icon
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const Component = rows ? 'textarea' : 'input';

    return (
        <motion.div
            className="space-y-3"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <label className="block text-yellow-300 font-bold text-lg flex items-center space-x-3">
                {icon && <span className="text-2xl">{icon}</span>}
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span>{label}</span>
            </label>

            <motion.div
                className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.01]' : ''}`}
            >
                <Component
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    rows={rows}
                    placeholder={placeholder || `Enter your ${label.toLowerCase()}...`}
                    className={`w-full p-5 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border-2 text-yellow-200 placeholder-yellow-200/40 focus:outline-none transition-all duration-300 font-medium ${isFocused
                        ? 'border-yellow-400 ring-4 ring-yellow-400/20 shadow-lg shadow-yellow-400/30'
                        : 'border-yellow-400/30 hover:border-yellow-400/50'
                        }`}
                />

                {/* Sacred border animation */}
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-yellow-400 opacity-0 pointer-events-none"
                    animate={isFocused ? {
                        opacity: [0, 0.4, 0],
                        scale: [1, 1.02, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Corner decorations */}
                <div className="absolute top-2 right-2 text-yellow-400/20 text-xs">✨</div>
                <div className="absolute bottom-2 left-2 text-yellow-400/20 text-xs">🕉️</div>
            </motion.div>
        </motion.div>
    );
};

const SacredButton = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    isLoading = false
}) => {
    const variants = {
        primary: `bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold shadow-2xl border-2 border-yellow-500 ${!disabled ? 'hover:from-yellow-500 hover:to-yellow-600 hover:shadow-yellow-400/50' : 'opacity-60 cursor-not-allowed'
            }`,
        secondary: `border-2 border-yellow-400 text-yellow-300 font-bold bg-gradient-to-br from-black to-gray-900 ${!disabled ? 'hover:bg-yellow-400 hover:text-black hover:shadow-lg hover:shadow-yellow-400/30' : 'opacity-60 cursor-not-allowed'
            }`
    };

    return (
        <motion.button
            type={type}
            onClick={disabled || isLoading ? undefined : onClick}
            disabled={disabled || isLoading}
            className={`w-full py-5 px-8 rounded-2xl transition-all duration-300 relative overflow-hidden ${variants[variant]}`}
            whileHover={!disabled && !isLoading ? {
                scale: 1.02,
                boxShadow: "0 0 40px rgba(234, 179, 8, 0.6)"
            } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            animate={{
                boxShadow: !disabled && !isLoading ? [
                    '0 0 10px rgba(234, 179, 8, 0.3)',
                    '0 0 25px rgba(234, 179, 8, 0.5)',
                    '0 0 10px rgba(234, 179, 8, 0.3)'
                ] : []
            }}
            transition={{
                boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                }
            }}
        >
            <span className="relative z-10 flex items-center justify-center space-x-3">
                {isLoading ? (
                    <>
                        <motion.div
                            className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Transmitting to the Divine...</span>
                    </>
                ) : (
                    children
                )}
            </span>

            {!disabled && !isLoading && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                />
            )}
        </motion.button>
    );
};

const StatusMessage = ({ type, message }) => {
    const styles = {
        success: "text-green-400 border-green-400/40 bg-green-400/10",
        error: "text-red-400 border-red-400/40 bg-red-400/10"
    };

    return (
        <motion.div
            className={`p-6 rounded-2xl border-2 ${styles[type]} text-center backdrop-blur-sm relative overflow-hidden`}
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
                    {type === 'success' ? '🕉️' : (type === 'sending' ? '🔮' : '⚠️')}
                </div>
                <p className="font-bold text-lg">{message}</p>
            </motion.div>

            {/* Background particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-1 h-1 ${type === 'success' ? 'bg-green-400/30' : 'bg-red-400/30'} rounded-full`}
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
    );
};


export default function WorkWithMe() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: null, message: null });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (evt) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "sending", message: "Sending your sacred message..." });

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("message", form.message);
            formData.append("_captcha", "false"); // optional, disables captcha
            formData.append("_template", "table"); // optional, nice email formatting

            const res = await fetch("https://formsubmit.co/devmalhotra3123@gmail.com", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                setStatus({ type: "success", message: "Your sacred message has been sent." });
                console.log("success");
                setForm({ name: "", email: "", message: "" });
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

    const services = [
        { name: "Frontend Dev with React + Tailwind", icon: "⚛️" },
        { name: "Framer Motion Animations", icon: "🎭" },
        { name: "Portfolio & Landing Page Builds", icon: "🏗️" },
        { name: "Temple-themed Creative Design", icon: "🏛️" }
    ];

    const tools = [
        { name: "React", icon: "⚛️" },
        { name: "Tailwind", icon: "🎨" },
        { name: "Framer Motion", icon: "🎭" },
        { name: "Vite", icon: "⚡" },
        { name: "Figma", icon: "🎯" },
        { name: "GitHub", icon: "🐙" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-yellow-100 p-10 relative overflow-hidden pt-40">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-yellow-400/10 rounded-full"
                        style={{
                            width: Math.random() * 4 + 1,
                            height: Math.random() * 4 + 1,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            duration: Math.random() * 8 + 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10 space-y-20">
                {/* Hero Section */}
                <motion.section
                    className="text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-yellow-300 mb-8 relative"
                        animate={{
                            textShadow: [
                                '0 0 15px rgba(234, 179, 8, 0.6)',
                                '0 0 30px rgba(234, 179, 8, 0.9)',
                                '0 0 15px rgba(234, 179, 8, 0.6)'
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                    >
                        🤝 Sacred Collaboration
                        <motion.div
                            className="absolute -top-8 -right-8 text-yellow-400/50 text-4xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            ✨
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        className="text-2xl md:text-3xl max-w-4xl mx-auto text-yellow-400 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        I craft sacred digital experiences where technology meets spirituality. Let's build something timeless together — a digital monument to divine creativity.
                    </motion.p>
                </motion.section>

                {/* Services & Tools Grid */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Services */}
                    <motion.section
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 border-2 border-yellow-400/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-4 right-4 text-yellow-400/20 text-6xl">🛠️</div>

                            <h2 className="text-3xl text-yellow-200 mb-8 font-bold flex items-center space-x-3">
                                <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                                <span>Sacred Services</span>
                            </h2>

                            <div className="space-y-4">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={service.name}
                                        className="flex items-center space-x-4 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20 hover:bg-yellow-400/20 transition-all duration-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        whileHover={{ scale: 1.02, x: 10 }}
                                    >
                                        <span className="text-2xl">{service.icon}</span>
                                        <span className="text-yellow-300 font-medium">{service.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* Tools */}
                    <motion.section
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 border-2 border-yellow-400/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-4 right-4 text-yellow-400/20 text-6xl">⚒️</div>

                            <h2 className="text-3xl text-yellow-200 mb-8 font-bold flex items-center space-x-3">
                                <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                                <span>Divine Tools</span>
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {tools.map((tool, index) => (
                                    <motion.div
                                        key={tool.name}
                                        className="flex items-center space-x-3 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20 hover:bg-yellow-400/20 transition-all duration-300 group"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="text-xl group-hover:scale-125 transition-transform">{tool.icon}</span>
                                        <span className="text-yellow-300 font-medium text-sm">{tool.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* Contact Form */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex justify-center"
                >
                    <div className="w-full max-w-3xl">
                        <motion.div
                            className="bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 border-2 border-yellow-400/30 rounded-3xl p-10 shadow-2xl backdrop-blur-lg relative overflow-hidden"
                            whileHover={{ boxShadow: "0 0 50px rgba(234, 179, 8, 0.3)" }}
                        >
                            {/* Sacred geometry background */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none">
                                <motion.div
                                    className="absolute text-yellow-400 text-9xl font-light top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 4, repeat: Infinity }
                                    }}
                                >
                                    ॐ
                                </motion.div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-4xl text-yellow-200 mb-8 font-bold text-center flex items-center justify-center space-x-4">
                                    <span>🤝</span>
                                    <span>Let's Create Sacred Magic</span>
                                    <span>✨</span>
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <SacredInput
                                            label="Your Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your sacred identity..."
                                            icon="👤"
                                        />

                                        <SacredInput
                                            label="Email Address"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your.divine@email.com"
                                            icon="📧"
                                        />
                                    </div>

                                    <SacredInput
                                        label="Your Vision"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={6}
                                        placeholder="Share your sacred vision... What project shall we build together? Describe your project, dreams, and the magic you want to create."
                                        icon="💭"
                                    />

                                    <SacredButton
                                        type="submit"
                                        isLoading={isSubmitting}
                                        disabled={!form.name || !form.email || !form.message}
                                    >
                                        <span className="text-2xl">🔔</span>
                                        <span className="text-lg">Send Sacred Message</span>
                                        <span className="text-2xl">✨</span>
                                    </SacredButton>
                                    {status.type && (
                                        <AnimatePresence>
                                            {status && (
                                                <StatusMessage type={status.type} message={status.message} />
                                            )}
                                        </AnimatePresence>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};