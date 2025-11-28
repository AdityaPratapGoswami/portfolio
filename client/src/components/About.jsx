import React, { useState, useEffect, useRef } from 'react';

const DecodeText = ({ text, trigger, delay = 0, duration = 2000 }) => {
    const [display, setDisplay] = useState('');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        if (!trigger) return;

        let timeout;
        let interval;

        timeout = setTimeout(() => {
            let iteration = 0;
            // Calculate step size to fit duration
            // Total ticks = duration / interval_time (20ms)
            // Step = text.length / Total ticks
            const intervalTime = 20;
            const totalTicks = duration / intervalTime;
            const step = text.length / totalTicks;

            interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += step;
            }, intervalTime);
        }, delay);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [text, trigger, delay, duration]);

    return <span>{display || text}</span>;
};

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Trigger once
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the card is visible
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="bento-section">
            <div className="container">
                <div className="bento-grid">
                    {/* About Card */}
                    <div className="bento-card about-card">
                        <h2>About Me</h2>
                        <p>I’m someone who loves solving real user needs by understanding the psychology behind their choices. I started my journey through internships in web development and data analysis, where I learned how technology works from the inside and how data reveals user behaviour. That foundation naturally led me to product management, where after an internship I discovered how much I enjoy shaping products end-to-end. I’m thoughtful, collaborative, and motivated by building things that genuinely help people.</p>
                    </div>

                    {/* Education Card */}
                    <div className="bento-card education-card">
                        <h3>Education</h3>
                        <div className="edu-item">
                            <p>B.Tech, Aerospace Engineering</p>
                            <span className="year">2025 </span>
                            <strong>IIT Bombay</strong>
                        </div>
                        <div className="edu-item">
                            <p>Class 12th</p>
                            <span className="year">2020 </span>
                            <strong>Lav Kush Modal Scool, Sri Ganganagar</strong>
                        </div>
                        <div className="edu-item">
                            <p>Class 10th</p>
                            <span className="year">2018 </span>
                            <strong>Mayoor School, Sri Ganganagar</strong>
                        </div>
                    </div>

                    {/* Skills Card */}
                    <div className={`bento-card skills-card ${isVisible ? 'animate' : ''}`} ref={skillsRef}>
                        <h3>Expertise</h3>
                        <div className="skills-list">
                            {[
                                { name: 'Product Strategy', level: 8, levelName: 'Strong' },
                                { name: 'User Research', level: 8, levelName: 'Strong' },
                                { name: 'Data Analysis', level: 6, levelName: 'Confident' },
                                { name: 'Frontend', level: 6, levelName: 'Confident' },
                                { name: 'Consumer Psychology', level: 4, levelName: 'Intermediate' },
                                { name: 'Backend', level: 4, levelName: 'Intermediate' },
                                { name: 'Wireframing', level: 2, levelName: 'Beginner' },
                            ].map((skill, index) => (
                                <div key={index} className="skill-item">
                                    <span className="skill-name">{skill.name}</span>
                                    <div className="skill-right">
                                        <div className="skill-bars">
                                            {[...Array(8)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`bar ${i < skill.level ? 'filled' : ''}`}
                                                    style={{
                                                        // Stagger delay based on column index (i) and row index (index)
                                                        transitionDelay: `${index * 100 + i * 50}ms`
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                        <span className="skill-level-name">
                                            <DecodeText
                                                text={skill.levelName}
                                                trigger={isVisible}
                                                delay={index * 100}
                                                duration={2850} // 350ms (last bar stagger) + 2500ms (fill duration)
                                            />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack Card */}
                    <div className="bento-card tools-card">
                        <h3>Tools</h3>
                        <div className="tags">
                            <span>Figma</span>
                            <span>SQL</span>
                            <span>Python</span>
                            <span>Power BI</span>
                            <span>Tableau</span>
                            <span>JIRA</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
