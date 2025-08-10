import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Send, CheckCircle, Moon, Star } from "lucide-react";

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
        <div className="space-y-3">
            <div className="block text-yellow-300 font-bold text-lg flex items-center space-x-3">
                {icon && <span className="text-2xl">{icon}</span>}
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span>{label}</span>
            </div>

            <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.01]' : ''}`}>
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
                <div
                    className={`absolute inset-0 rounded-2xl border-2 border-yellow-400 opacity-0 pointer-events-none transition-all duration-300 ${isFocused ? 'animate-pulse opacity-40' : ''
                        }`}
                />

                {/* Corner decorations */}
                <div className="absolute top-2 right-2 text-yellow-400/20 text-xs">✨</div>
                <div className="absolute bottom-2 left-2 text-yellow-400/20 text-xs">🕉️</div>
            </div>
        </div>
    );
};

const SacredButton = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    isLoading = false
}) => {
    return (
        <button
            type={type}
            onClick={disabled || isLoading ? undefined : onClick}
            disabled={disabled || isLoading}
            className={`w-full py-5 px-8 rounded-2xl transition-all duration-300 relative overflow-hidden transform hover:scale-105 active:scale-95 ${disabled || isLoading
                ? 'bg-gradient-to-r from-yellow-400/50 via-yellow-500/50 to-yellow-400/50 text-black/70 opacity-60 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold shadow-2xl border-2 border-yellow-500 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-yellow-400/50'
                }`}
            style={{
                boxShadow: !disabled && !isLoading
                    ? '0 0 25px rgba(234, 179, 8, 0.5)'
                    : 'none'
            }}
        >
            <span className="relative z-10 flex items-center justify-center space-x-3">
                {isLoading ? (
                    <>
                        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to the Divine...</span>
                    </>
                ) : (
                    children
                )}
            </span>

            {!disabled && !isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-800" />
            )}
        </button>
    );
};

const StatusMessage = ({ type, message }) => {
    const styles = {
        success: "text-green-400 border-green-400/40 bg-green-400/10",
        error: "text-red-400 border-red-400/40 bg-red-400/10"
    };

    return (
        <div
            className={`p-6 rounded-2xl border-2 ${styles[type]} text-center backdrop-blur-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom duration-300`}
        >
            <div className="animate-in scale-in duration-200 delay-200">
                <div className="text-4xl mb-3">
                    {type === 'success' ? '🕉️' : '⚠️'}
                </div>
                <p className="font-bold text-lg">{message}</p>
            </div>

            {/* Background particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 ${type === 'success' ? 'bg-green-400/30' : 'bg-red-400/30'} rounded-full animate-pulse`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default function SilentOffering() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState({ type: null, message: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [floatingElements, setFloatingElements] = useState([]);

    const blessings = [
        "Your silent prayers ascend like sacred incense",
        "The universe receives your heartfelt intentions",
        "Divine light illuminates your path forward",
        "Your offering creates ripples of positive energy",
        "May your deepest wishes find their fulfillment",
        "Blessings flow to you like a gentle stream",
        "Your sacred words are held in divine embrace"
    ];

    const offeringTypes = [
        { icon: "🙏", label: "Prayer", description: "Send your prayers to the divine" },
        { icon: "💝", label: "Gratitude", description: "Express heartfelt thanks" },
        { icon: "🕯️", label: "Intention", description: "Set your sacred intentions" },
        { icon: "💫", label: "Blessing", description: "Ask for divine blessings" },
        { icon: "🌸", label: "Healing", description: "Request healing energy" },
        { icon: "✨", label: "Guidance", description: "Seek spiritual guidance" }
    ];

    // Generate floating elements
    useEffect(() => {
        const elements = [];
        for (let i = 0; i < 15; i++) {
            elements.push({
                id: i,
                icon: ['✨', '🌟', '💫', '🌙', '⭐', '🔮'][Math.floor(Math.random() * 6)],
                left: Math.random() * 100,
                delay: Math.random() * 8 + 8,
                duration: Math.random() * 8 + 8
            });
        }
        setFloatingElements(elements);
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: null });

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
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-yellow-100 p-10 relative overflow-hidden pt-40">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {floatingElements.map((element) => (
                    <div
                        key={element.id}
                        className="absolute bg-yellow-400/10 rounded-full animate-pulse"
                        style={{
                            width: Math.random() * 4 + 1,
                            height: Math.random() * 4 + 1,
                            left: `${element.left}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${element.duration}s`,
                            animationDelay: `${element.delay}s`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10 space-y-20">
                {/* Hero Section */}
                <section className="text-center animate-in fade-in slide-in-from-top duration-800">
                    <h1
                        className="text-5xl md:text-7xl font-bold text-yellow-300 mb-8 relative animate-pulse"
                        style={{
                            textShadow: '0 0 30px rgba(234, 179, 8, 0.9)'
                        }}
                    >
                        🤫 Silent Offering
                        <div className="absolute -top-8 -right-8 text-yellow-400/50 text-4xl animate-bounce">
                            ✨
                        </div>
                    </h1>

                    <p className="text-2xl md:text-3xl max-w-4xl mx-auto text-yellow-400 leading-relaxed animate-in fade-in duration-1000 delay-300">
                        In the sanctuary of silence, your heart speaks directly to the divine.
                        Share your deepest prayers, gratitude, and intentions in sacred confidence.
                    </p>
                </section>

                {/* Offering Types */}
                <section className="animate-in fade-in slide-in-from-bottom duration-600 delay-500">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                        {offeringTypes.map((type, index) => (
                            <div
                                key={type.label}
                                className="group bg-gradient-to-br from-gray-900/60 to-black/60 border-2 border-yellow-400/20 rounded-xl p-4 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {type.icon}
                                </div>
                                <div className="text-yellow-300 font-semibold text-sm mb-1">
                                    {type.label}
                                </div>
                                <div className="text-yellow-200/60 text-xs">
                                    {type.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="flex justify-center animate-in fade-in slide-in-from-bottom duration-800 delay-700">
                    <div className="w-full max-w-3xl">
                        <div className="bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 border-2 border-yellow-400/30 rounded-3xl p-10 shadow-2xl backdrop-blur-lg relative overflow-hidden hover:shadow-yellow-400/20 transition-all duration-300">
                            {/* Sacred geometry background */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none">
                                <div
                                    className="absolute text-yellow-400 text-9xl font-light top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
                                    style={{
                                        animationDuration: '30s'
                                    }}
                                >
                                    ॐ
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-4xl text-yellow-200 mb-8 font-bold text-center flex items-center justify-center space-x-4">
                                    <span>🕯️</span>
                                    <span>Sacred Submission</span>
                                    <span>🙏</span>
                                </h2>

                                {status.type ? (
                                    <StatusMessage type={status.type} message={status.message} />
                                ) : (
                                    <div className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <SacredInput
                                                label="Your Sacred Name"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Your sacred identity..."
                                                icon="🌟"
                                            />

                                            <SacredInput
                                                label="Sacred Contact"
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="your.divine@email.com"
                                                icon="📧"
                                            />
                                        </div>

                                        <SacredInput
                                            label="Your Silent Message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={6}
                                            placeholder="Share your prayers, gratitude, intentions, or any message from your heart. This sacred space holds your words in complete confidence..."
                                            icon="📜"
                                        />

                                        <div className="flex items-center justify-between text-sm text-yellow-300/60">
                                            <span>🔒 Your message is held in sacred confidence</span>
                                            <span>{form.message.length} characters</span>
                                        </div>

                                        <SacredButton
                                            onClick={handleSubmit}
                                            isLoading={isSubmitting}
                                            disabled={!form.name || !form.email || !form.message}
                                        >
                                            <span className="text-2xl">🔔</span>
                                            <span className="text-lg">Submit Silent Offering</span>
                                            <span className="text-2xl">✨</span>
                                        </SacredButton>

                                        {/* Privacy Notice */}
                                        <div className="bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl p-4 border border-purple-400/20">
                                            <div className="flex items-start space-x-3">
                                                <Moon className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
                                                <div className="text-sm text-purple-200/80">
                                                    <p className="font-semibold mb-1">Sacred Privacy Promise</p>
                                                    <p>Your silent offering is treated with the utmost reverence. Your message is encrypted and stored securely, accessible only to designated temple keepers for prayer and blessing purposes.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom decorative elements */}
                <div className="text-center space-y-4 animate-in fade-in duration-1000 delay-1000">
                    <div className="flex items-center justify-center space-x-4 text-yellow-300/40">
                        <Star size={16} />
                        <span className="text-sm">In silence, we find the deepest connection</span>
                        <Star size={16} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-in {
                    animation: slideInFadeIn 1s ease-out forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }

                .fade-in {
                    animation: fadeIn 1s ease-out forwards;
                }

                .slide-in-from-top {
                    animation: slideInFromTop 0.8s ease-out forwards;
                }

                .slide-in-from-bottom {
                    animation: slideInFromBottom 0.8s ease-out forwards;
                }

                .scale-in {
                    animation: scaleIn 0.3s ease-out forwards;
                    transform: scale(0);
                }

                @keyframes slideInFadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                @keyframes slideInFromTop {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInFromBottom {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    to { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}   