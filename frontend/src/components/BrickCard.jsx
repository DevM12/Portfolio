    import { motion} from "framer-motion";

    export default function BrickCard({ title, description, tech, link }) {
        return (
            <motion.a
                href={link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-yellow-400 rounded-lg p-6 cursor-pointer bg-black text-yellow-300"
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px 5px rgba(255, 223, 0, 0.7)",
                    backgroundColor: "#b38f00",
                    color: "black",
                }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm font-light">{description}</p>
                <p className="mt-3 text-xs font-mono italic text-yellow-200">Tech: {tech || "N/A"}</p>
            </motion.a>
        );
    }
