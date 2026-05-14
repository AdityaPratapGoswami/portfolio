import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { useScrollTrigger } from '../hooks/useScrollAnimation';

// Animation timing constants
const BAR_ANIM_DURATION = 400;
const WAVE_DELAY = 60;
const TOTAL_BARS = 8;

// Skills data with pre-calculated timing
const skills = [
    { name: 'Product Strategy', level: 8, levelName: 'Strong' },
    { name: 'User Research', level: 8, levelName: 'Strong' },
    { name: 'Data Analysis', level: 6, levelName: 'Confident' },
    { name: 'Frontend', level: 6, levelName: 'Confident' },
    { name: 'Consumer Psychology', level: 4, levelName: 'Intermediate' },
    { name: 'Backend', level: 4, levelName: 'Intermediate' },
    { name: 'Wireframing', level: 2, levelName: 'Beginner' },
].map((skill, rowIndex) => {
    const lastFilledBarIndex = skill.level - 1;
    const wavePosition = rowIndex * TOTAL_BARS + lastFilledBarIndex;
    const barStartDelay = 200 + wavePosition * WAVE_DELAY;
    const barFinishTime = barStartDelay + BAR_ANIM_DURATION;

    return {
        ...skill,
        textDelay: 200 + (rowIndex * TOTAL_BARS * WAVE_DELAY),
        textDuration: barFinishTime - (200 + rowIndex * TOTAL_BARS * WAVE_DELAY)
    };
});

const DecodeText = ({ text, trigger, delay = 0, duration = 1000 }) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!trigger || hasStarted.current) return;
        hasStarted.current = true;

        setDisplay(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));

        let timeout;
        let interval;

        timeout = setTimeout(() => {
            let iteration = 0;
            const intervalTime = 30;
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
                    setDisplay(text);
                }

                iteration += step;
            }, intervalTime);
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (interval) clearInterval(interval);
        };
    }, [trigger, text, delay, duration, chars]);

    return <span>{display}</span>;
};

const About = () => {
    const { containerRef: skillsContainerRef, isVisible: skillsVisible } = useScrollTrigger({
        threshold: 0.2
    });

    // Bar wave animation when skills card scrolls into view
    useEffect(() => {
        if (!skillsContainerRef.current || !skillsVisible) return;

        const card = skillsContainerRef.current;
        const allBars = card.querySelectorAll('.bar');
        const filledBars = card.querySelectorAll('.bar.filled');

        allBars.forEach((bar, index) => {
            const rowIndex = Math.floor(index / TOTAL_BARS);
            const colIndex = index % TOTAL_BARS;
            const wavePosition = rowIndex * TOTAL_BARS + colIndex;

            bar.style.opacity = '0';
            bar.style.transform = 'scaleY(0)';

            animate(bar, {
                opacity: [0, 1],
                scaleY: [0, 1],
                duration: 300,
                delay: 200 + wavePosition * WAVE_DELAY,
                ease: 'outQuad'
            });
        });

        filledBars.forEach((bar) => {
            const allBarsArray = Array.from(allBars);
            const globalIndex = allBarsArray.indexOf(bar);
            const rowIndex = Math.floor(globalIndex / TOTAL_BARS);
            const colIndex = globalIndex % TOTAL_BARS;
            const wavePosition = rowIndex * TOTAL_BARS + colIndex;

            animate(bar, {
                backgroundColor: ['var(--bg-body)', 'var(--accent-color)'],
                borderColor: ['var(--border-color)', 'var(--accent-color)'],
                duration: BAR_ANIM_DURATION,
                delay: 200 + wavePosition * WAVE_DELAY,
                ease: 'outQuad',
                onComplete: () => {
                    bar.style.removeProperty('background-color');
                    bar.style.removeProperty('border-color');
                }
            });
        });
    }, [skillsVisible]);

    return (
        <section id="about" className="bento-section">
            <div className="container">
                <div className="bento-grid">
                    {/* About Card */}
                    <div className="bento-card about-card">
                        <h2>About Me</h2>
                        <p>I'm someone who loves solving real user needs by understanding the psychology behind their choices. I started my journey through internships in web development and data analysis, where I learned how technology works from the inside and how data reveals user behaviour. That foundation naturally led me to product management, where after an internship I discovered how much I enjoy shaping products end-to-end. I'm thoughtful, collaborative, and motivated by building things that genuinely help people.</p>
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
                    <div
                        className="bento-card skills-card"
                        ref={skillsContainerRef}
                    >
                        <h3>Expertise</h3>
                        <div className="skills-list">
                            {skills.map((skill, index) => (
                                <div key={index} className="skill-item">
                                    <span className="skill-name">{skill.name}</span>
                                    <div className="skill-right">
                                        <div className="skill-bars">
                                            {[...Array(8)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`bar ${i < skill.level ? 'filled' : ''}`}
                                                ></div>
                                            ))}
                                        </div>
                                        <span className="skill-level-name">
                                            <DecodeText
                                                text={skill.levelName}
                                                trigger={skillsVisible}
                                                delay={skill.textDelay}
                                                duration={skill.textDuration}
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
