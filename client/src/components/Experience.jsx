import React, { useState, useEffect, useRef } from 'react';

const Experience = () => {
    const [activeId, setActiveId] = useState(null);
    const timelineRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }

        return () => {
            if (timelineRef.current) {
                observer.unobserve(timelineRef.current);
            }
        };
    }, []);

    const experiences = [
        {
            id: 1,
            date: "Jan '25 – Present",
            company: "Cityflo",
            role: "Product Management Intern",
            details: [
                "Improving conversion rate through data-driven optimization strategies.",
                "Integrating AI into workflows to enhance efficiency and user experience."
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

    // Node positions along the S-curve (percentage of viewBox width, y position)
    // S-curve: starts top-left, curves down, back up, then down again
    // Shifted down to leave room for labels above top nodes
    const nodePositions = [
        { x: 5, y: 80 },    // Node 1: top-left
        { x: 35, y: 220 },  // Node 2: bottom
        { x: 65, y: 80 },   // Node 3: top
        { x: 95, y: 220 }   // Node 4: bottom-right
    ];

    const handleNodeClick = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    // S-curve path that connects all 4 points (shifted down by 50px)
    const curvePath = `
        M 50 80
        C 120 80, 180 220, 350 220
        C 520 220, 580 80, 650 80
        C 820 80, 880 220, 950 220
    `;

    return (
        <section id="experience" className="experience-section">
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <div className="timeline-road curved-road" ref={timelineRef}>
                    {/* SVG Curved Road - Desktop Only */}
                    <svg
                        className="road-svg"
                        viewBox="0 0 1000 250"
                        preserveAspectRatio="none"
                    >
                        {/* Road background (wider stroke) */}
                        <path
                            d={curvePath}
                            className="road-path-bg"
                            fill="none"
                            strokeWidth="24"
                            strokeLinecap="round"
                        />
                        {/* Road center line (dashed) */}
                        <path
                            ref={pathRef}
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
                                '--node-y': `${nodePositions[index].y}px`
                            }}
                            onClick={() => handleNodeClick(exp.id)}
                        >
                            <div className="node-circle"></div>
                            <div className="timeline-content">
                                <div className="node-label">
                                    <span className="node-date">{exp.date}</span>
                                    <span className="node-role">{exp.role}</span>
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
