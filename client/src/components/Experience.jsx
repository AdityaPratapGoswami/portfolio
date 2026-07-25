import { useState, useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

const Experience = () => {
    const [activeId, setActiveId] = useState(null);
    const roadPathBgRef = useRef(null);
    const roadPathCenterRef = useRef(null);

    // Scroll trigger (animates once)
    const { containerRef: sectionRef, isVisible } = useScrollTrigger({
        threshold: 0.3
    });

    // Handle timeline animations when section comes into view
    useEffect(() => {
        if (!sectionRef.current || !isVisible) return;

        const timeline = sectionRef.current.querySelector('.timeline-road');
        if (!timeline) return;

        timeline.classList.add('in-view');

        // Create main animation timeline
        const tl = createTimeline({
            defaults: {
                ease: 'outExpo'
            }
        });

        // 1. Animate section title
        const title = sectionRef.current.querySelector('.section-title');
        if (title) {
            tl.add(title, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 700,
                ease: 'outQuad'
            }, 0);
        }

        // 2. Animate SVG road path drawing with anime.js
        const roadBg = roadPathBgRef.current;
        const roadCenter = roadPathCenterRef.current;

        if (roadBg && roadCenter) {
            // Get path length for stroke animation
            const pathLength = roadBg.getTotalLength();

            // Set initial state
            roadBg.style.strokeDasharray = pathLength;
            roadBg.style.strokeDashoffset = pathLength;
            roadCenter.style.strokeDasharray = pathLength;
            roadCenter.style.strokeDashoffset = pathLength;

            // Animate road background path
            tl.add(roadBg, {
                strokeDashoffset: [pathLength, 0],
                duration: 1800,
                ease: 'inOutQuad'
            }, 200);

            // Animate road center line (slightly delayed)
            tl.add(roadCenter, {
                strokeDashoffset: [pathLength, 0],
                duration: 1600,
                ease: 'inOutQuad'
            }, 400);
        }

        // 3. Animate nodes along the path timing
        const nodes = timeline.querySelectorAll('.timeline-node-wrapper');
        nodes.forEach((node, index) => {
            const circle = node.querySelector('.node-circle');
            const label = node.querySelector('.node-label');
            const dateEl = label?.querySelector('.node-date');
            const roleEl = label?.querySelector('.node-role');

            // Calculate delay based on path progress
            // Nodes appear as the road "reaches" them
            const nodeDelay = 400 + (index * 400);

            // Node wrapper fade in
            tl.add(node, {
                opacity: [0, 1],
                duration: 400,
                ease: 'outQuad'
            }, nodeDelay);

            // Circle pops in with elastic effect
            if (circle) {
                tl.add(circle, {
                    scale: [0, 1.3, 1],
                    duration: 600,
                    ease: 'outElastic(1, 0.5)'
                }, nodeDelay + 100);

                // Add a subtle pulse after appearing
                tl.add(circle, {
                    boxShadow: [
                        '0 0 0 0 rgba(var(--accent-color-rgb), 0.4)',
                        '0 0 0 10px rgba(var(--accent-color-rgb), 0)',
                    ],
                    duration: 600,
                    ease: 'outQuad'
                }, nodeDelay + 500);
            }

            // Label elements animate separately for a staggered text reveal
            const companyEl = label?.querySelector('.node-company');

            if (companyEl) {
                tl.add(companyEl, {
                    opacity: [0, 1],
                    translateY: [15, 0],
                    duration: 400,
                    ease: 'outQuad'
                }, nodeDelay + 200);
            }

            if (roleEl) {
                tl.add(roleEl, {
                    opacity: [0, 1],
                    translateY: [15, 0],
                    duration: 400,
                    ease: 'outQuad'
                }, nodeDelay + 300);
            }

            if (dateEl) {
                tl.add(dateEl, {
                    opacity: [0, 1],
                    translateY: [15, 0],
                    duration: 400,
                    ease: 'outQuad'
                }, nodeDelay + 400);
            }
        });

    }, [isVisible, sectionRef]);

    const experiences = [
        {
            id: 1,
            date: "Jan '26 – July '26",
            company: "Cityflo",
            role: "Product Management Intern",
            details: [
                "Launched Bridge Pack to bridge trial → full ridepack: 30%→52% conversion, +15.6% RPU (₹13.4L/mo).",
                "Repackaged promo as Freecash wallet credit: +3.5% RPU (new users), +2.1% 10th-ride conversion (₹8.5L/mo).",
                "Won back churned users with targeted lapsed-user campaigns: +10% reactivation, +8% RPU.",
                "Cracked Ride 2 drop-off on price-sensitive routes: +18% conversion, +8.7% RPU."
            ],
            position: 'top'
        },
        {
            id: 2,
            date: "Jun '24 – Sept '24",
            company: "Eshway",
            role: "Product Management Intern",
            details: [
                "Developed proprietary \"Roots\" methodology integrating Balanced Scorecard & OKRs.",
                "Reduced project setup time from 40 to 1 hour.",
                "Compiled investor deck securing $1M funding."
            ],
            position: 'bottom'
        },
        {
            id: 3,
            date: "Jul '23 – Sept '23",
            company: "Paathshala",
            role: "Full Stack Web Developer Intern",
            details: [
                "Improved page load speed by 25% using MERN Stack.",
                "Reduced API response times by 20%.",
                "Strengthened app security with JWT & OAuth."
            ],
            position: 'top'
        },
        {
            id: 4,
            date: "Jun '23 – Jul '23",
            company: "NoQs Digital",
            role: "Data Analyst Intern",
            details: [
                "Honored with \"Best Intern Award\" by CEO.",
                "Analyzed 100+ investment records with Excel & Power BI.",
                "Increased operational efficiency by 30%."
            ],
            position: 'bottom'
        }
    ];

    const nodePositions = [
        { x: 5, y: 125 },
        { x: 35, y: 125 },
        { x: 65, y: 125 },
        { x: 95, y: 125 }
    ];

    const handleNodeClick = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    const curvePath = `M 50 125 L 950 125`;

    return (
        <section id="experience" className="experience-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <div className="timeline-road curved-road">
                    {/* SVG Curved Road - Desktop Only */}
                    <svg
                        className="road-svg"
                        viewBox="0 0 1000 250"
                        preserveAspectRatio="none"
                    >
                        {/* Road background (wider stroke) */}
                        <path
                            ref={roadPathBgRef}
                            d={curvePath}
                            className="road-path-bg"
                            fill="none"
                            strokeWidth="24"
                            strokeLinecap="round"
                        />
                        {/* Road center line (dashed) */}
                        <path
                            ref={roadPathCenterRef}
                            d={curvePath}
                            className="road-path-center"
                            fill="none"
                            strokeWidth="2"
                            strokeDasharray="8 8"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Experience Nodes */}
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`timeline-node-wrapper curved-node ${exp.position} ${activeId === exp.id ? 'active' : ''}`}
                            style={{
                                '--node-x': `${nodePositions[index].x}%`,
                                '--node-y': `${nodePositions[index].y}px`,
                                opacity: 0
                            }}
                            onClick={() => handleNodeClick(exp.id)}
                        >
                            <div className="node-circle" style={{ transform: 'scale(0)' }}></div>
                            <div className="timeline-content">
                                <div className="node-label" style={{ opacity: 1, transform: 'none' }}>
                                    <span className="node-company" style={{ opacity: 0 }}>{exp.company}</span>
                                    <span className="node-role" style={{ opacity: 0 }}>{exp.role}</span>
                                    <span className="node-date" style={{ opacity: 0 }}>{exp.date}</span>
                                </div>
                                <div className="timeline-popup">
                                    <h3 className="popup-company">{exp.company}</h3>
                                    <div className="popup-role-mobile">{exp.role}</div>
                                    <ul className="popup-details">
                                        {exp.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
