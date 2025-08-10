// src/components/utils/ParticleBackground.jsx
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { motion } from "framer-motion";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        console.log("Particles engine initialized ✅");
        await loadFull(engine);
    }, []);

    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fullScreen: {
                        enable: true,
                        zIndex: 1,
                    },
                    background: {
                        color: "transparent",
                    },
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
                                area: 800,
                            },
                        },
                        color: {
                            value: "#FFD700",
                        },
                        opacity: {
                            value: 0.6,
                        },
                        size: {
                            value: 2.5,
                        },
                        move: {
                            enable: true,
                            speed: 0.4,
                        },
                    },
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400/5 text-9xl pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                卍
            </motion.div>
        </>
    );
}
