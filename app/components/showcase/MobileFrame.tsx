import React from "react";

export const MobileFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto w-64 sm:w-72 max-w-full">
        <div className="relative bg-gray-900 rounded-3xl p-2 sm:p-3 shadow-2xl">
            <div className="bg-black rounded-2xl p-1 sm:p-2">
                <div className="bg-white rounded-xl overflow-hidden">
                    {children}
                </div>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-1 bg-gray-600 rounded-full"></div>
        </div>
        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-lg"></div>
    </div>
);
