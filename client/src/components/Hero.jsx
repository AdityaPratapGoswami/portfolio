import { useEffect, useRef, useState } from 'react';
import { useLoading } from '../context/LoadingContext';

const ROLES = ["Product Manager", "Full Stack Developer", "Data Analyst"];

const Hero = () => {
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [animationsComplete, setAnimationsComplete] = useState(false);

    const { isLoading } = useLoading();

    const typeSpeedRef = useRef(100);
    const profileCardRef = useRef(null);

    // Start typewriter once loading is done
    useEffect(() => {
        if (!isLoading) {
            setAnimationsComplete(true);
        }
    }, [isLoading]);

    // Typewriter effect
    useEffect(() => {
        if (!animationsComplete) return;

        const handleType = () => {
            const currentRole = ROLES[roleIndex];

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
                setRoleIndex((prev) => (prev + 1) % ROLES.length);
                typeSpeedRef.current = 500;
            }
        };

        const timer = setTimeout(handleType, typeSpeedRef.current);
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex, animationsComplete]);

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

    return (
        <section id="hero" className="hero-section">
            <div className="container grid-layout">
                <div className="hero-text">
                    <p className="overline cycling-typewriter">{text}<span className="cursor">|</span></p>
                    <h1>Aditya <span className="wonk-italic">Pratap</span><br />Goswami</h1>
                    <p className="tagline">I turn vision into execution.</p>
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
