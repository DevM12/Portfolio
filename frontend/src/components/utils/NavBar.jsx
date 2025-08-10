import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: "Home", path: "/", icon: "🏠" },
        { name: "Temple", path: "/temple", icon: "🏛️" },
        { name: "Add a Brick", path: "/add-brick", icon: "🧱" },
        { name: "Work With Me", path: "/work-with-me", icon: "🤝" },
        { name: "Buy Prashad", path: "/buy-prashad", icon: "🍯" },
        { name: "Resume", path: "/Dev-Malhotra.pdf", icon: "📄", external: true },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 transition-all duration-300
          ${isScrolled
                        ? "bg-black/90 border-b border-yellow-400/30 backdrop-blur-lg shadow-lg shadow-yellow-400/10"
                        : "bg-black/70 border-b border-yellow-400/20 backdrop-blur-md"
                    }
        `}
                role="navigation"
                aria-label="Primary Navigation"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded">
                        <div
                            className="text-3xl animate-spin"
                            style={{
                                animation: "spin 20s linear infinite, pulse 2s ease-in-out infinite alternate",
                            }}
                            aria-label="Om Symbol Logo"
                            role="img"
                        >
                            🕉
                        </div>
                        <div className="flex flex-col select-none">
                            <span className="text-yellow-300 text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                                Digital Temple
                            </span>
                            <div className="h-[1px] bg-gradient-to-r from-yellow-400 to-transparent transition-all duration-300 group-hover:w-full w-0" />
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden md:flex items-center space-x-3 lg:space-x-5">
                        {navItems.map(({ name, path, icon, external }) => {
                            const isActive = activeItem === path;
                            return (
                                <li key={path}>
                                    {external ? (
                                        <a
                                            href={path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 transform
            hover:scale-110 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400
            text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-400/5"
                                        >
                                            <span className="text-sm">{icon}</span>
                                            <span className="text-sm lg:text-base">{name}</span>
                                        </a>
                                    ) : (
                                        <Link
                                            to={path}
                                            className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 transform
                    hover:scale-110 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400
                    ${isActive
                                                    ? "text-yellow-300 font-semibold bg-yellow-400/10 shadow-lg shadow-yellow-400/20"
                                                    : "text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-400/5"
                                                }`}
                                            aria-current={isActive ? "page" : undefined}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span className="text-sm">{icon}</span>
                                            <span className="text-sm lg:text-base">{name}</span>
                                            {isActive && (
                                                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-lg border border-yellow-400/30 animate-pulse pointer-events-none" aria-hidden="true" />
                                            )}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile menu button */}
                    <button
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-yellow-300 hover:bg-yellow-400/10 transition-all duration-300 hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        type="button"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-16 inset-x-4 z-50 md:hidden bg-black/95 backdrop-blur-lg rounded-2xl border border-yellow-400/20 shadow-xl shadow-yellow-400/10 overflow-hidden transform transition-transform duration-300
        ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}`}
                role="menu"
                aria-label="Mobile Navigation Menu"
            >
                <ul className="px-6 py-4 space-y-2">
                    {navItems.map(({ name, path, icon,external }, index) => {
                        const isActive = activeItem === path;
                        return (
                            <li
                                key={path}
                                style={{ animationDelay: `${index * 75}ms` }}
                                className={`opacity-0 animate-fade-in`}
                            >
                                {external ? (
                                    <a
                                        href={path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 transform
            hover:scale-110 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400
            text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-400/5"
                                    >
                                        <span className="text-sm">{icon}</span>
                                        <span className="text-sm lg:text-base">{name}</span>
                                    </a>
                                ) : (
                                <Link
                                    to={path}
                                    role="menuitem"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
                    ${isActive
                                            ? "text-yellow-300 font-semibold bg-yellow-400/15 border border-yellow-400/30"
                                            : "text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-400/5"
                                        }
                    focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <span className="text-lg">{icon}</span>
                                    <span>{name}</span>
                                    {isActive && (
                                        <span className="absolute right-3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse pointer-events-none" aria-hidden="true" />
                                    )}
                                </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Bottom decoration */}
                <div className="px-6 py-3 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 border-t border-yellow-400/20">
                    <div className="flex items-center justify-center space-x-2 text-yellow-300/60 select-none">
                        <Sparkles size={16} />
                        <span className="text-sm">Sacred Navigation</span>
                        <Sparkles size={16} />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease forwards;
        }
      `}</style>
        </>
    );
}
