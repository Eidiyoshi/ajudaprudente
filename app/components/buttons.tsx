"use client";

import { useState } from "react";

export function EventSubscribeButton({ eventId, volunteerId }: { eventId: number, volunteerId: number}) {
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleSubscribe = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/eventos/${eventId}/inscrever`, {
                method: "POST",
                headers: { "Content-Type": "appiclation/json" },
                body: JSON.stringify({ volunteer: volunteerId }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Erro ao realizar inscrição.");
            }

            setSubscribed(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erro desconhecido.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
                onClick={handleSubscribe}
                disabled={subscribed || loading}
                className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white disabled:opacity-50">
                {subscribed ? "Inscrito ✓" : loading ? "Inscrevendo..." : "Inscrever-se"}
            </button>
        </div>
    );
}