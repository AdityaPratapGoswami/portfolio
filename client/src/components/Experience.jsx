import React, { useState, useEffect, useRef } from 'react';

const Experience = () => {
    const [activeId, setActiveId] = useState(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
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
            date: "Jun '24 – Sept '24",
            company: "Eshway",
            role: "Product Management Intern",
            details: [
                "Developed proprietary \"Roots\" methodology integrating Balanced Scorecard & OKRs.",
                "Reduced project setup time from 40 to 1 hour.",
                "Compiled investor deck securing $1M funding."
            ]
        },
        {
            id: 2,
            date: "Jul '23 – Sept '23",
            company: "Paathshala",
            role: "Full Stack Web Developer Intern",
            details: [
                "Improved page load speed by 25% using MERN Stack.",
                "Reduced API response times by 20%.",
                "Strengthened app security with JWT & OAuth."
            ]
        },
        {
            id: 3,
            date: "Jun '23 – Jul '23",
            company: "NoQs Digital",
            role: "Data Analyst Intern",
            details: [
                "Honored with \"Best Intern Award\" by CEO.",
                "Analyzed 100+ investment records with Excel & Power BI.",
                "Increased operational efficiency by 30%."
            ]
        }
    ];

    const handleNodeClick = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section id="experience" className="experience-section">
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <div className="timeline-road" ref={timelineRef}>
                    <div className="timeline-line"></div>
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className={`timeline-node-wrapper ${activeId === exp.id ? 'active' : ''}`}
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
                                        {exp.details.map((detail, index) => (
                                            <li key={index}>{detail}</li>
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
