import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';

/**
 * Custom hook for running anime.js v4 animations on component mount
 * @param {Object|Function} animationConfig - Animation config or function that returns config
 * @param {Array} deps - Dependencies array for the effect
 * @returns {Object} - ref to attach to the target element
 */
export const useAnimeOnMount = (animationConfig, deps = []) => {
    const targetRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!targetRef.current) return;

        const config = typeof animationConfig === 'function'
            ? animationConfig(targetRef.current)
            : { ...animationConfig, targets: targetRef.current };

        animationRef.current = animate(targetRef.current, config);

        return () => {
            if (animationRef.current && animationRef.current.pause) {
                animationRef.current.pause();
            }
        };
    }, deps);

    return { targetRef, animationRef };
};

/**
 * Custom hook for creating anime.js v4 timelines
 * @param {Function} timelineBuilder - Function that receives the timeline instance
 * @param {Array} deps - Dependencies array for the effect
 * @returns {Object} - ref to attach to the container element and timeline ref
 */
export const useAnimeTimeline = (timelineBuilder, deps = []) => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = createTimeline({
            defaults: {
                ease: 'outExpo',
                duration: 750
            }
        });

        timelineBuilder(tl, containerRef.current);
        timelineRef.current = tl;

        return () => {
            if (timelineRef.current && timelineRef.current.pause) {
                timelineRef.current.pause();
            }
        };
    }, deps);

    return { containerRef, timelineRef };
};

/**
 * Custom hook for staggered animations on multiple elements
 * @param {string} selector - CSS selector for target elements within the container
 * @param {Object} animationConfig - Animation config (without targets)
 * @param {Object} staggerOptions - Stagger configuration
 * @param {Array} deps - Dependencies array
 */
export const useAnimeStagger = (selector, animationConfig, staggerOptions = {}, deps = []) => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const targets = containerRef.current.querySelectorAll(selector);
        if (targets.length === 0) return;

        animationRef.current = animate(targets, {
            ...animationConfig,
            delay: stagger(staggerOptions.value || 100, staggerOptions)
        });

        return () => {
            if (animationRef.current && animationRef.current.pause) {
                animationRef.current.pause();
            }
        };
    }, deps);

    return { containerRef, animationRef };
};

export { animate, createTimeline, stagger };
export default { useAnimeOnMount, useAnimeTimeline, useAnimeStagger };
