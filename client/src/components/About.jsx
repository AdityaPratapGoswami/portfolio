import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

// Animation timing constants
const TOTAL_BARS = 8;

// Wall-clock length of the whole expertise wave, first bar to last. Tune this one
// number to speed the section up or slow it down; everything below derives from it.
const TOTAL_ANIM_DURATION = 4000;
const BASE_DELAY = 300;           // beat before the wave starts
const BAR_ANIM_DURATION = 1400;   // how long a single bar takes to fill
const BAR_APPEAR_DURATION = 600;  // fade/scale-in of every bar, filled or not

// Whatever time is left is spread across the columns as the left-to-right ripple.
const WAVE_DELAY = (TOTAL_ANIM_DURATION - BASE_DELAY - BAR_ANIM_DURATION) / (TOTAL_BARS - 1);

const SKILLS = [
    { name: 'Product Strategy', level: 8, levelName: 'Strong' },
    { name: 'User Research', level: 8, levelName: 'Strong' },
    { name: 'Data Analysis', level: 6, levelName: 'Confident' },
    { name: 'Frontend', level: 6, levelName: 'Confident' },
    { name: 'Consumer Psychology', level: 4, levelName: 'Intermediate' },
    { name: 'Backend', level: 4, levelName: 'Intermediate' },
    { name: 'Wireframing', level: 2, levelName: 'Beginner' },
];

// Every row animates in parallel — the wave runs left-to-right within a row only,
// so each row's delay depends on column position alone, not on its own index.
const waveDelayFor = (colIndex) => BASE_DELAY + colIndex * WAVE_DELAY;

// All level labels decode over one shared window, ending as the longest row finishes filling.
const TEXT_DURATION = (Math.max(...SKILLS.map(s => s.level)) - 1) * WAVE_DELAY + BAR_ANIM_DURATION;

const skills = SKILLS.map((skill) => ({
    ...skill,
    textDelay: BASE_DELAY,
    textDuration: TEXT_DURATION
}));

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
            bar.style.opacity = '0';
            bar.style.transform = 'scaleY(0)';

            animate(bar, {
                opacity: [0, 1],
                scaleY: [0, 1],
                duration: BAR_APPEAR_DURATION,
                delay: waveDelayFor(index % TOTAL_BARS),
                ease: 'outQuad'
            });
        });

        const allBarsArray = Array.from(allBars);

        filledBars.forEach((bar) => {
            const colIndex = allBarsArray.indexOf(bar) % TOTAL_BARS;

            animate(bar, {
                backgroundColor: ['var(--bg-body)', 'var(--accent-color)'],
                borderColor: ['var(--border-color)', 'var(--accent-color)'],
                duration: BAR_ANIM_DURATION,
                delay: waveDelayFor(colIndex),
                ease: 'outQuad',
                onComplete: () => {
                    bar.style.removeProperty('background-color');
                    bar.style.removeProperty('border-color');
                }
            });
        });
    }, [skillsVisible, skillsContainerRef]);

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
