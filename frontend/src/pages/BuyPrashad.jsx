import { useState } from "react";

export default function BuyPrashad() {
    const [offered, setOffered] = useState(false);

    return (
        <main className="min-h-screen bg-black text-yellow-100 p-10 flex flex-col items-center justify-center space-y-8">
            <h1 className="text-4xl text-yellow-300 font-bold">Offer Prashad</h1>
            <p className="max-w-xl text-center text-yellow-400">
                If this digital temple brought you clarity, inspiration, or value — you may offer Prashad to support its light.
            </p>

            {!offered ? (
                <button
                    onClick={() => setOffered(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-md transition transform hover:scale-105"
                >
                    Offer Prashad 💛
                </button>
            ) : (
                <div className="text-center animate-pulse text-yellow-300">
                    <p className="text-2xl">🙏 Gratitude Received</p>
                    <p className="mt-2 text-yellow-400">Your support lights the eternal flame 🔥</p>
                </div>
            )}
        </main>
    );
}