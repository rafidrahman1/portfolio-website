import React, { useState, useRef, useEffect } from "react";

export const AskMeAnythingBubble = () => {
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    // Focus input when open
    useEffect(() => {
        if (open && !isClosing) {
            // Small delay to ensure animation starts first
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [open, isClosing]);

    const handleOpen = () => {
        setIsClosing(false);
        setShouldRender(true);
        setOpen(true);
    };

    const handleClose = () => {
        if (!open || isClosing) return;
        
        setIsClosing(true);
        
        // Wait for exit animation to complete before hiding
        setTimeout(() => {
            setOpen(false);
            setIsClosing(false);
            setShouldRender(false);
        }, 200);
    };

    const handleToggle = () => {
        if (open && !isClosing) {
            handleClose();
        } else if (!open) {
            handleOpen();
        }
    };

    return (
        <div className="relative flex items-center" ref={containerRef}>
            {/* Chat Bubble Button */}
            <button
                aria-label="Ask Me Anything"
                onClick={handleToggle}
                className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                <span className={`text-lg transition-transform duration-200 ${open ? 'animate-pulse' : 'animate-bounce'}`}>💬</span>
                <span>Ask Me</span>
            </button>
            
            {/* Popup Bubble */}
            {shouldRender && (
                <div
                    className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 z-20
                        bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72
                        ${isClosing ? 'animate-pop-out' : 'animate-pop-in'}
                        transform origin-left`}
                    style={{ minWidth: "240px" }}
                >
                    <div className="bubble-tail"></div>
                    <div className="mb-2 font-semibold text-gray-800 flex items-center gap-2">
                        <span className="text-blue-500 animate-pulse">🤔</span>
                        Ask Me Anything
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your question..."
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:border-blue-300"
                        autoFocus
                    />
                    <button
                        className="mt-3 w-full bg-blue-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};
