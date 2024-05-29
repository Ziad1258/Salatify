"use client";
import React, { createContext, useState } from "react";

// Create the context
export const TogglerContext = createContext(null);

const TogglerProvider = ({ children }) => {
    const [showNav, setShowNav] = useState(false);

    // Wrap the values in an object
    const value = { showNav, setShowNav};

    return (
        <TogglerContext.Provider value={value}>
            {children}
        </TogglerContext.Provider>
    );
};

export default TogglerProvider;
