import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext({
    isLoading: true,
    setLoadingComplete: () => {}
});

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const setLoadingComplete = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoadingComplete }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export default LoadingContext;
