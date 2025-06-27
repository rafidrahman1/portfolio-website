import React from "react";

export const LaptopFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto max-w-4xl">
        <div className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl">
            <div className="bg-black rounded-2xl p-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-inner">
                    {children}
                </div>
            </div>
            <div className="h-6 bg-gray-800 rounded-b-2xl shadow-lg relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
            </div>
        </div>
        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-lg"></div>
    </div>
);
