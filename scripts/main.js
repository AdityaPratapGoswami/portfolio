document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');

    themeToggle.addEventListener('click', async (e) => {
        // Fallback for browsers that don't support View Transitions
        if (!document.startViewTransition) {
            toggleTheme();
            return;
        }

        // Get click coordinates
        const x = e.clientX;
        const y = e.clientY;

        // Calculate radius to the furthest corner
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // Start the transition
        const transition = document.startViewTransition(() => {
            toggleTheme();
        });

        // Wait for the pseudo-elements to be created
        await transition.ready;

        // Animate the clip-path
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

    function toggleTheme() {
        let theme = 'light';
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            theme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('theme', theme);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Interactive Background
    class BackgroundEffect {
        constructor() {
            this.canvas = document.getElementById('background-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.dots = [];
            this.mouse = { x: -1000, y: -1000 };

            // Configuration
            this.spacing = 30;
            this.dotSize = 1.5;
            this.influenceRadius = 100;
            this.forceFactor = 0.5;
            this.returnSpeed = 0.1;

            this.init();
        }

        init() {
            this.resize();
            window.addEventListener('resize', () => this.resize());
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });

            this.animate();
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.createDots();
        }

        createDots() {
            this.dots = [];
            for (let x = 0; x < this.width; x += this.spacing) {
                for (let y = 0; y < this.height; y += this.spacing) {
                    this.dots.push({
                        x: x,
                        y: y,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0
                    });
                }
            }
        }

        getThemeColor() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            // Increased opacity for better visibility while keeping it subtle
            return isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)';
        }

        animate() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = this.getThemeColor();

            this.dots.forEach(dot => {
                // Calculate distance to mouse
                const dx = this.mouse.x - dot.x;
                const dy = this.mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction
                if (distance < this.influenceRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (this.influenceRadius - distance) / this.influenceRadius;
                    const pushX = Math.cos(angle) * force * this.influenceRadius * this.forceFactor;
                    const pushY = Math.sin(angle) * force * this.influenceRadius * this.forceFactor;

                    dot.vx -= pushX * 0.1;
                    dot.vy -= pushY * 0.1;
                }

                // Return to origin (Spring force)
                const dxOrigin = dot.originX - dot.x;
                const dyOrigin = dot.originY - dot.y;

                dot.vx += dxOrigin * this.returnSpeed;
                dot.vy += dyOrigin * this.returnSpeed;

                // Friction
                dot.vx *= 0.8;
                dot.vy *= 0.8;

                // Update position
                dot.x += dot.vx;
                dot.y += dot.vy;

                // Draw dot
                this.ctx.beginPath();
                this.ctx.arc(dot.x, dot.y, this.dotSize, 0, Math.PI * 2);
                this.ctx.fill();
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize background
    new BackgroundEffect();



    // Cycling Typing Effect
    const cyclingTypeWriterElement = document.querySelector('.cycling-typewriter');
    if (cyclingTypeWriterElement) {
        const roles = ["Product Manager", "Full Stack Developer", "Data Analyst"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function cycleType() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                cyclingTypeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster deletion
            } else {
                cyclingTypeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal typing
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Finished typing current role
                isDeleting = true;
                typeSpeed = 2000; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next
            }

            setTimeout(cycleType, typeSpeed);
        }

        // Start cycling immediately or after a delay
        setTimeout(cycleType, 1000);
    }

    // Cinematic Hover Effect for Profile Photo
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate percentage
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            profileCard.style.setProperty('--x', `${xPercent}%`);
            profileCard.style.setProperty('--y', `${yPercent}%`);
        });

        profileCard.addEventListener('mouseleave', () => {
            // Optional: Reset to center or fade out is handled by CSS opacity
            // We can reset position if we want the light to return to center
            // profileCard.style.setProperty('--x', `50%`);
            // profileCard.style.setProperty('--y', `50%`);
        });
    }
});
