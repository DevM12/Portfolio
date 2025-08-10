import { useState, useEffect, useRef } from "react";

function loadPaypalScript(clientId, currency = "USD") {
    return new Promise((resolve, reject) => {
        if (document.getElementById("paypal-sdk")) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
        script.id = "paypal-sdk";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("PayPal SDK could not load."));
        document.body.appendChild(script);
    });
}

export default function BuyPrashad() {
    const [paid, setPaid] = useState(false);
    const paypalRef = useRef();

    useEffect(() => {
        if (paid) return;

        const clientId = import.meta.env.VITE_CLIENT_ID;

        loadPaypalScript(clientId)
            .then(() => {
                if (!window.paypal) throw new Error("PayPal SDK not available");

                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: "1.00"
                                }
                            }],
                        });
                    },
                    onApprove: async (data, actions) => {
                        await actions.order.capture();
                        setPaid(true);
                    },
                    onError: (err) => {
                        console.error(err);
                        alert("Payment could not be processed.");
                    },
                }).render(paypalRef.current);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [paid]);

    return (
        <main className="min-h-screen bg-black text-yellow-100 p-10 flex flex-col items-center justify-center space-y-8">
            <h1 className="text-4xl text-yellow-300 font-bold">Offer Prashad</h1>
            <p className="max-w-xl text-center text-yellow-400">
                If this digital temple brought you clarity, inspiration, or value — you
                may offer Prashad to support its light.
            </p>

            {!paid ? (
                <div
                    ref={paypalRef}
                    className="w-full max-w-md mx-auto p-6 rounded-lg border border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)] bg-[#1a140c]"
                    style={{
                        transition: 'height 0.3s ease',
                        backgroundColor: "#FF6600",
                        color: "#EAB308",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        boxShadow: "0 0 20px rgba(234, 179, 8, 0.5)",
                    }}
                ></div>
            ) : (
                <div className="text-center animate-pulse text-yellow-300">
                    <p className="text-2xl">🙏 Gratitude Received</p>
                    <p className="mt-2 text-yellow-400">
                        Your support lights the eternal flame 🔥
                    </p>
                </div>
            )}
        </main>
    );
}
