import React, { useState, useRef, useEffect } from "react";

export const AskMeAnythingBubble = () => {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    // Focus input when open
    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    return (
        <div className="relative flex items-center" ref={containerRef}>
            {/* Chat Bubble Button */}
            <button
                aria-label="Ask Me Anything"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100 transition transform hover:scale-105 focus:outline-none"
            >
                <span className="text-lg animate-bounce">💬</span>
                <span>Ask Me</span>
            </button>
            {/* Popup Bubble */}
            {open && (
                <div
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-20
            bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72
            animate-pop-in"
                    style={{ minWidth: "240px" }}
                >
                    <div className="bubble-tail"></div>
                    <div className="mb-2 font-semibold text-gray-800 flex items-center gap-2">
                        <span className="text-blue-500">🤔</span>
                        Ask Me Anything
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your question..."
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        autoFocus
                    />
                    <button
                        className="mt-3 w-full bg-blue-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </div>
            )}

        </div>
    );
};
