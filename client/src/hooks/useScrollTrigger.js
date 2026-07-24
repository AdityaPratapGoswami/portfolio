import { useEffect, useRef, useState, useContext } from 'react';
import LoadingContext from '../context/LoadingContext';

/**
 * Custom hook for scroll-triggered animations
 * Waits for loading animation to complete before observing
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1), default 0.5
 * @param {boolean} options.once - Whether to animate only once (default true)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @returns {Object} - containerRef, isVisible, hasAnimated
 */
export const useScrollTrigger = (options = {}) => {
    const {
        threshold = 0.5,
        once = true,
        rootMargin = '0px'
    } = options;

    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Get loading state from context (will be undefined if not in provider)
    const loadingContext = useContext(LoadingContext);
    const isLoading = loadingContext?.isLoading ?? false;

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        // Wait for loading to complete
        if (isLoading) return;

        // If already animated and once=true, don't observe
        if (hasAnimated && once) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasAnimated(true);
                    // Disconnect after first trigger if once=true
                    if (once) {
                        observer.disconnect();
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, once, rootMargin, hasAnimated, isLoading]);

    return { containerRef, isVisible, hasAnimated };
};
