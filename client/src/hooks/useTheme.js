import { useCallback } from 'react';

/**
 * Custom hook for theme toggle functionality with View Transitions API support.
 * Provides a smooth circular reveal animation when switching between light/dark themes.
 */
export const useTheme = () => {
    const performToggle = useCallback(() => {
        let theme = 'light';
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            theme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('theme', theme);
    }, []);

    const toggleTheme = useCallback((e) => {
        // Fallback for browsers that don't support View Transitions
        if (!document.startViewTransition) {
            performToggle();
            return;
        }

        // Get click coordinates
        const x = e.clientX;
        const y = e.clientY;

        // Calculate radius to the furthest corner
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // Start the transition
        const transition = document.startViewTransition(() => {
            performToggle();
        });

        // Animate the clip-path
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 400,
                    easing: 'ease-in',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    }, [performToggle]);

    return { toggleTheme };
};
