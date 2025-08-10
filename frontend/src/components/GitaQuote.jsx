import { useEffect, useState } from "react";

export default function GitaQuote() {
    const quotes = [
        "You have the right to work, not to the fruits of work. – BG 2.47",
        "Abandon all varieties of dharma and surrender to Me alone. – BG 18.66",
        "A person is made by their faith. – BG 17.3",
    ];

    const [quote, setQuote] = useState("");

    useEffect(() => {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(random);
    }, []);

    return (
        <div className="bg-black padding-0 text-center text-yellow-300 mt-6 italic">
            “{quote}”
        </div>
    );
}
