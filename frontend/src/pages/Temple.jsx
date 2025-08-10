import { Link } from "react-router-dom";
import BrickCard from "../components/BrickCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Temple() {

    const [repos, setRepos] = useState([]);
    const username = 'DevM12';

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
            .then((res) => res.json())
            .then((data) => setRepos(data))
            .catch(console.error);
    }, []);


    

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 relative z-10">


            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-6xl md:text-7xl font-bold text-yellow-300 mb-6 relative"
                        whileHover={{ scale: 1.02 }}
                    >
                        🏛️ Temple of Bricks
                        <motion.div
                            className="absolute -top-4 -right-4 text-yellow-400/30 text-2xl"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            ✨
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-yellow-200/80 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Each brick represents a sacred offering of code, creativity, and devotion to the digital divine.
                        Here lies the foundation of our virtual sanctuary.
                    </motion.p>

                    {/* Stats Section */}
                    <motion.div
                        className="flex justify-center space-x-12 mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div>
                            <div className="text-3xl font-bold text-yellow-400">{repos.length}</div>
                            <div className="text-yellow-300/70 text-sm">Sacred Bricks</div>
                        </div>
                        <div className="w-px h-12 bg-yellow-400/30"></div>
                        <div>
                            <div className="text-3xl font-bold text-yellow-400">∞</div>
                            <div className="text-yellow-300/70 text-sm">Blessings</div>
                        </div>
                        <div className="w-px h-12 bg-yellow-400/30"></div>
                        <div>
                            <div className="text-3xl font-bold text-yellow-400">1</div>
                            <div className="text-yellow-300/70 text-sm">Divine Unity</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bricks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                    {repos.map((brick, index) => (
                        <BrickCard
                            key={brick.id}
                            title={brick.name}                   
                            description={brick.description}
                            tech={brick.language||'N/A'} 
                            link={brick.html_url}
                            index={index}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block p-8 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-3xl border border-yellow-400/30 backdrop-blur-sm"
                        whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(234, 179, 8, 0.3)" }}
                    >
                        <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                            Willing to help me in building my temple?
                        </h3>
                        <p className="text-yellow-200/80 mb-6 max-w-md mx-auto">
                            Every contribution strengthens the foundation of our digital temple.
                            Share your creation and become part of this eternal structure.
                        </p>

                        <motion.button
                            onClick={() => setCurrentPage('add-brick')}
                            className="inline-flex items-center space-x-4 px-10 py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold rounded-full shadow-xl relative overflow-hidden group"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 50px rgba(234, 179, 8, 0.8)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/add-brick"
                                className="hover:text-white text-lg"
                            >
                                <span className="text-2xl">✨</span>
                                <span className="text-lg">Add Your Sacred Brick</span>
                                <span className="text-2xl">🧱</span>

                            </Link>

                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.button>
                    </motion.div>

                    <span>.....</span>
                    <motion.div
                        className="margin-left-10 inline-block p-8 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-3xl border border-yellow-400/30 backdrop-blur-sm"
                        whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(234, 179, 8, 0.3)" }}
                    >
                        <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                            Add some donations?
                        </h3>
                        <p className="text-yellow-200/80 mb-6 max-w-md mx-auto">
                            You are welcome to collaborate with me directly, even without contributing a brick.
                            Let’s bring your vision to life with creativity, precision, and care.
                        </p>

                        <motion.button
                            onClick={() => setCurrentPage('add-brick')}
                            className="inline-flex items-center space-x-4 px-10 py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold rounded-full shadow-xl relative overflow-hidden group"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 50px rgba(234, 179, 8, 0.8)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/work-with-me"
                                className="hover:text-white text-lg"
                            >
                                <span className="text-2xl">✨</span>
                                <span className="text-lg">Work with me</span>
                            </Link>

                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
