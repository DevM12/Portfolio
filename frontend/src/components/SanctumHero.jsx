import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import ParticleBackground from "./utils/ParticleBackground";

export default function SanctumHero() {

    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-black text-yellow-200 flex flex-col items-center justify-center px-4 text-center">
            <ParticleBackground />

            <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-wide"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to the Digital Temple
            </motion.h1>

            <motion.p
                className="mt-6 text-lg md:text-2xl max-w-2xl font-light text-yellow-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                “A sacred space carved from code — where offerings are made, and legends are written.”
            </motion.p>

            <motion.button
                className="mt-10 px-6 py-3 border border-yellow-300 rounded hover:bg-yellow-300 hover:text-black transition font-semibold"
                onClick={() => navigate("/temple")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                Enter the Temple
            </motion.button>

        </div>
    );
}
