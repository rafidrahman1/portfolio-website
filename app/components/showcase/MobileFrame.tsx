import React from "react";

export const MobileFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto w-72">
        <div className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl">
            <div className="bg-black rounded-2xl p-2">
                <div className="bg-white rounded-xl overflow-hidden">
                    {children}
                </div>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
        </div>
        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-lg"></div>
    </div>
);
