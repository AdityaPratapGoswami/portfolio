import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const Projects = () => {
    // Scroll trigger (animates once)
    const { containerRef: sectionRef, isVisible } = useScrollTrigger({
        threshold: 0.3
    });

    // Animate projects when section comes into view
    useEffect(() => {
        if (!sectionRef.current) return;

        const title = sectionRef.current.querySelector('.section-title');
        const cards = sectionRef.current.querySelectorAll('.project-card');

        if (isVisible) {
            // Animate section title
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(20px)';
                animate(title, {
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    ease: 'outQuad'
                });
            }

            // Reset and animate cards
            cards.forEach((card) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
            });

            animate(cards, {
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 700,
                delay: stagger(100, { start: 200 }),
                ease: 'outExpo'
            });

            // Animate badges with a pop effect
            const badges = sectionRef.current.querySelectorAll('.badge');
            badges.forEach(badge => {
                badge.style.opacity = '0';
                badge.style.transform = 'scale(0.5)';
            });

            animate(badges, {
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 400,
                delay: stagger(100, { start: 500 }),
                ease: 'outBack'
            });

        }
    }, [isVisible, sectionRef]);

    return (
        <section id="projects" className="projects-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Selected Projects</h2>
                <div className="projects-grid">
                    <Link to="/project/okr-task-tracker" target="_blank" className="project-card-link">
                        <article className="project-card">
                            <div className="card-header">
                                <h3>OKR based Task Tracker</h3>
                                <span className="badge">Personal</span>
                            </div>
                            <p>A smart, analytics-driven daily tracker that turns your tasks, habits, and goals into actionable insights and practical OKRs.</p>
                        </article>
                    </Link>
                    <article className="project-card">
                        <div className="card-header">
                            <h3>Google Search Case</h3>
                            <span className="badge">Product Strategy</span>
                        </div>
                        <p>Increased user browsing safety by implementing safe search filters and integrating malware
                            detection.</p>
                    </article>
                    <article className="project-card">
                        <div className="card-header">
                            <h3>Big Data Analysis</h3>
                            <span className="badge">Data Science</span>
                        </div>
                        <p>Processed 10 yrs of IBM stock data using MapReduce algorithms for large-scale data cleaning.
                        </p>
                    </article>
                    <article className="project-card">
                        <div className="card-header">
                            <h3>Corporate Finance</h3>
                            <span className="badge">Finance</span>
                        </div>
                        <p>Assessed impact of different financing options on market worth considering capital structure
                            & risk.</p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Projects;
