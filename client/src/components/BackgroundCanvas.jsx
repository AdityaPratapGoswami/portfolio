import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = ({ onLoaded, className }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let dots = [];
        let mouse = { x: -1000, y: -1000 };
        let animationFrameId;

        // Animation State
        let phase = 'loading'; // loading, exploding, grid
        let globalRotation = 0;
        let explosionProgress = 0;

        // Configuration
        const spacing = 30;
        const dotSize = 1.5;
        const loaderDotSize = 4; // Prominent size for loader dots
        const influenceRadius = 100;
        const forceFactor = 0.5;
        const returnSpeed = 0.05;
        const explosionSpeed = 0.02;
        const loadingRadius = 60; // Slightly larger radius for 12 dots
        const rotationSpeed = 0.02;

        const createDots = () => {
            dots = [];
            const centerX = width / 2;
            const centerY = height / 2;

            // Create all grid dots
            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    dots.push({
                        x: phase === 'grid' ? x : centerX, // Start at center for explosion effect, or at grid pos if already in grid phase
                        y: phase === 'grid' ? y : centerY,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        isLoader: false, // Default to false
                        angle: 0,
                        orbitRadius: 0
                    });
                }
            }

            // Select 12 dots to be loader dots
            // We want them roughly distributed to cover the screen area when they explode
            // Let's pick dots closest to 12 specific points on the screen
            // We can use a grid of 3x4 or similar distribution
            const targets = [];
            // Create a 4x3 grid of targets (12 points)
            for (let i = 1; i <= 4; i++) {
                for (let j = 1; j <= 3; j++) {
                    targets.push({
                        x: (width * i) / 5,
                        y: (height * j) / 4
                    });
                }
            }

            targets.forEach((target, index) => {
                // Find closest dot to this target
                let closestDot = null;
                let minDist = Infinity;

                dots.forEach(dot => {
                    if (dot.isLoader) return; // Already selected
                    const dx = dot.originX - target.x;
                    const dy = dot.originY - target.y;
                    const dist = dx * dx + dy * dy;
                    if (dist < minDist) {
                        minDist = dist;
                        closestDot = dot;
                    }
                });

                if (closestDot) {
                    closestDot.isLoader = true;
                    // Assign angle for loading circle (0 to 2PI)
                    closestDot.angle = (index / targets.length) * Math.PI * 2;
                    closestDot.orbitRadius = loadingRadius;

                    // Set initial position to circle for loader dots ONLY if not in grid phase
                    if (phase !== 'grid') {
                        closestDot.x = centerX + Math.cos(closestDot.angle) * loadingRadius;
                        closestDot.y = centerY + Math.sin(closestDot.angle) * loadingRadius;
                    }
                }
            });
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            createDots();
        };

        const getThemeColor = (opacity = 1) => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            // Base alpha is 0.25 (dark) or 0.2 (light)
            const baseAlpha = isDark ? 0.25 : 0.2;
            const finalAlpha = baseAlpha * opacity;
            return isDark ? `rgba(255, 255, 255, ${finalAlpha})` : `rgba(0, 0, 0, ${finalAlpha})`;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Check if mobile or touch device
            const isMobile = width < 768;
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const centerX = width / 2;
            const centerY = height / 2;

            if (phase === 'loading') {
                // No global rotation, each dot moves independently
                ctx.fillStyle = getThemeColor(1); // Full opacity for loader dots

                dots.forEach((dot) => {
                    if (dot.isLoader) {
                        // Gravity simulation:
                        // Top (3PI/2 or -PI/2): sin = -1 -> Fastest speed
                        // Bottom (PI/2): sin = 1 -> Slowest speed

                        const baseSpeed = 0.05;
                        const speedVariation = 0.02;

                        // Calculate speed based on current position
                        // We subtract because sin(PI/2) is 1 (bottom), where we want it slow
                        const currentSpeed = baseSpeed - Math.sin(dot.angle) * speedVariation;

                        // Update angle
                        dot.angle += currentSpeed;

                        // Keep angle normalized (optional but good practice)
                        if (dot.angle > Math.PI * 2) dot.angle -= Math.PI * 2;

                        // Fixed radius (perfect circle)
                        dot.x = centerX + Math.cos(dot.angle) * dot.orbitRadius;
                        dot.y = centerY + Math.sin(dot.angle) * dot.orbitRadius;

                        // Draw dot
                        ctx.beginPath();
                        ctx.arc(dot.x, dot.y, loaderDotSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });

            } else if (phase === 'exploding') {
                explosionProgress += explosionSpeed;

                // Ease out cubic function for smooth explosion
                const ease = 1 - Math.pow(1 - explosionProgress, 3);

                if (explosionProgress >= 1) {
                    phase = 'grid';
                    explosionProgress = 1;
                }

                dots.forEach(dot => {
                    let startX, startY;
                    let currentSize = dotSize;

                    if (dot.isLoader) {
                        // Loader dots start from their current rotated position
                        // Note: dot.angle is now updated directly in the loop, so we use it as is
                        const currentAngle = dot.angle;
                        startX = centerX + Math.cos(currentAngle) * dot.orbitRadius;
                        startY = centerY + Math.sin(currentAngle) * dot.orbitRadius;
                        ctx.fillStyle = getThemeColor(1); // Full opacity

                        // Interpolate size from loaderDotSize to dotSize
                        currentSize = loaderDotSize + (dotSize - loaderDotSize) * ease;
                    } else {
                        // Other dots start from center
                        startX = centerX;
                        startY = centerY;
                        // Fade in: opacity goes from 0 to 1 based on progress
                        ctx.fillStyle = getThemeColor(explosionProgress);
                    }

                    dot.x = startX + (dot.originX - startX) * ease;
                    dot.y = startY + (dot.originY - startY) * ease;

                    // Draw dot
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
                    ctx.fill();
                });

            } else if (phase === 'grid') {
                ctx.fillStyle = getThemeColor(1); // Full opacity

                dots.forEach(dot => {
                    // Calculate distance to mouse
                    const dx = mouse.x - dot.x;
                    const dy = mouse.y - dot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Interaction - Only on desktop and non-touch
                    if (!isMobile && !isTouch && distance < influenceRadius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (influenceRadius - distance) / influenceRadius;
                        const pushX = Math.cos(angle) * force * influenceRadius * forceFactor;
                        const pushY = Math.sin(angle) * force * influenceRadius * forceFactor;

                        dot.vx -= pushX * 0.1;
                        dot.vy -= pushY * 0.1;
                    }

                    // Return to origin (Spring force)
                    const dxOrigin = dot.originX - dot.x;
                    const dyOrigin = dot.originY - dot.y;

                    dot.vx += dxOrigin * returnSpeed;
                    dot.vy += dyOrigin * returnSpeed;

                    // Friction
                    dot.vx *= 0.8;
                    dot.vy *= 0.8;

                    // Update position
                    dot.x += dot.vx;
                    dot.y += dot.vy;

                    // Draw dot
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            // Optional: Also check here to avoid unnecessary updates
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if (window.innerWidth < 768 || isTouch) return;

            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            resize();
        };

        // Initialize
        resize();
        animate();

        // Start explosion after 2 seconds
        setTimeout(() => {
            phase = 'exploding';
            if (onLoaded) onLoaded();
        }, 2000);

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="background-canvas" ref={canvasRef} className={className}></canvas>;
};

export default BackgroundCanvas;
