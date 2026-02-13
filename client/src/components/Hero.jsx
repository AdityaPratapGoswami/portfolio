import React, { useEffect, useRef, useState } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import { useLoading } from '../context/LoadingContext';

const Hero = () => {
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [animationsComplete, setAnimationsComplete] = useState(false);

    const { isLoading } = useLoading();

    const roles = ["Product Manager", "Full Stack Developer", "Data Analyst"];
    const typeSpeedRef = useRef(100);
    const profileCardRef = useRef(null);
    const heroRef = useRef(null);
    const hasAnimated = useRef(false);

    // Typewriter effect - only starts after initial animations
    useEffect(() => {
        if (!animationsComplete) return;

        const handleType = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                setText(currentRole.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
                typeSpeedRef.current = 50;
            } else {
                setText(currentRole.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
                typeSpeedRef.current = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setIsDeleting(true);
                typeSpeedRef.current = 2000;
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
                typeSpeedRef.current = 500;
            }
        };

        const timer = setTimeout(handleType, typeSpeedRef.current);
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex, roles, animationsComplete]);

    // Profile card glow effect
    useEffect(() => {
        const card = profileCardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            card.style.setProperty('--x', `${xPercent}%`);
            card.style.setProperty('--y', `${yPercent}%`);
        };

        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Anime.js entrance animations - wait for loading to complete
    useEffect(() => {
        if (isLoading || hasAnimated.current || !heroRef.current) return;
        hasAnimated.current = true;

        const container = heroRef.current;

        // Set initial states
        const elementsToAnimate = container.querySelectorAll('.hero-text .overline, .hero-text h1, .hero-text .tagline, .hero-actions .btn, .profile-card');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
        });

        // Create the animation timeline (anime.js v4 syntax)
        const tl = createTimeline({
            defaults: {
                ease: 'outExpo'
            }
        });

        // 1. Typewriter role text fades in
        tl.add(container.querySelector('.hero-text .overline'), {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            ease: 'outQuad',
            onComplete: () => {
                setAnimationsComplete(true);
            }
        }, 0);

        // 2. Name reveal
        tl.add(container.querySelector('.hero-text h1'), {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            ease: 'outExpo'
        }, 300);

        // 3. Tagline slides in
        tl.add(container.querySelector('.hero-text .tagline'), {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            ease: 'outQuad'
        }, 500);

        // 4. Buttons animate with stagger
        tl.add(container.querySelectorAll('.hero-actions .btn'), {
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.9, 1],
            duration: 500,
            delay: stagger(100),
            ease: 'outBack'
        }, 600);

        // 5. Profile card entrance
        tl.add(container.querySelector('.profile-card'), {
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: [5, 0],
            duration: 800,
            ease: 'outExpo'
        }, 300);
    }, [isLoading]);

    return (
        <section id="hero" className="hero-section" ref={heroRef}>
            <div className="container grid-layout">
                <div className="hero-text">
                    <p className="overline cycling-typewriter">{text}<span className="cursor">|</span></p>
                    <h1>Aditya Pratap<br />Goswami</h1>
                    <p className="tagline">Blending tech insight with user psychology in product.</p>
                    <div className="hero-actions">
                        <a href="#contact" className="btn btn-primary">Get in Touch</a>
                        <a href="#experience" className="btn btn-secondary">View Work</a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="profile-card" ref={profileCardRef}>
                        <div className="profile-image-wrapper">
                            <div className="glow-overlay"></div>
                            <img src="/assets/images/profile_v2.png" alt="Aditya Pratap Goswami" className="profile-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
