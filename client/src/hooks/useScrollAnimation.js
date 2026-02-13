import { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
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

/**
 * Hook for animating elements when they scroll into view
 * @param {Function} animationCallback - Function that receives (container, animate, stagger) and runs animations
 * @param {Object} options - Scroll trigger options
 */
export const useScrollAnimation = (animationCallback, options = {}) => {
    const { containerRef, isVisible, hasAnimated } = useScrollTrigger(options);
    const animationRef = useRef(null);
    const hasPlayedOnce = useRef(false);

    useEffect(() => {
        if (!containerRef.current || !isVisible) return;

        // Run animation
        animationRef.current = animationCallback(containerRef.current, animate, stagger);
        hasPlayedOnce.current = true;

        return () => {
            if (animationRef.current && animationRef.current.pause) {
                animationRef.current.pause();
            }
        };
    }, [isVisible, animationCallback]);

    return { containerRef, isVisible, hasAnimated };
};

/**
 * Hook for timeline-based scroll animations
 * @param {Function} timelineBuilder - Function that receives (timeline, container) and builds the animation
 * @param {Object} options - Scroll trigger options + timeline defaults
 */
export const useScrollTimeline = (timelineBuilder, options = {}) => {
    const {
        threshold = 0.5,
        once = true,
        rootMargin = '0px',
        defaults = { ease: 'outExpo', duration: 600 }
    } = options;

    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Get loading state from context
    const loadingContext = useContext(LoadingContext);
    const isLoading = loadingContext?.isLoading ?? false;

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        // Wait for loading to complete
        if (isLoading) return;

        if (hasAnimated && once) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasAnimated(true);
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

    useEffect(() => {
        if (!containerRef.current || !isVisible) return;

        // Create fresh timeline for each trigger
        const tl = createTimeline({ defaults });
        timelineBuilder(tl, containerRef.current, { animate, stagger });
        timelineRef.current = tl;

        return () => {
            if (timelineRef.current && timelineRef.current.pause) {
                timelineRef.current.pause();
            }
        };
    }, [isVisible, timelineBuilder, defaults]);

    return { containerRef, timelineRef, isVisible };
};

/**
 * Preset animation configurations for common patterns
 */
export const animationPresets = {
    fadeUp: {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        ease: 'outQuad'
    },
    fadeIn: {
        opacity: [0, 1],
        duration: 500,
        ease: 'outQuad'
    },
    scaleIn: {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
        ease: 'outBack'
    },
    slideInLeft: {
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 600,
        ease: 'outExpo'
    },
    slideInRight: {
        opacity: [0, 1],
        translateX: [50, 0],
        duration: 600,
        ease: 'outExpo'
    }
};

export { animate, createTimeline, stagger };
