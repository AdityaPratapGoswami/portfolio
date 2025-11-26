import React from 'react';

const About = () => {
    return (
        <section id="about" className="bento-section">
            <div className="container">
                <div className="bento-grid">
                    {/* About Card */}
                    <div className="bento-card about-card">
                        <h2>About Me</h2>
                        <p>I’m someone who loves solving real user needs by understanding the psychology behind their choices. I started my journey through internships in web development and data analysis, where I learned how technology works from the inside and how data reveals user behaviour. That foundation naturally led me to product management, where after an internship and discovered how much I enjoy shaping products end-to-end. I’m thoughtful, collaborative, and motivated by building things that genuinely help people.</p>
                    </div>

                    {/* Skills Card */}
                    <div className="bento-card skills-card">
                        <h3>Expertise</h3>
                        <div className="tags">
                            <span>Product Strategy</span>
                            <span>User Research</span>
                            <span>Consumer Psychology</span>
                            <span>Data Analysis</span>
                            <span>Wireframing</span>
                            <span>Frontend</span>
                            <span>Backend</span>
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

                    {/* Education Card */}
                    <div className="bento-card education-card">
                        <h3>Education</h3>
                        <div className="edu-item">
                            <span className="year">2025 </span>
                            <strong>IIT Bombay</strong>
                            <p>B.Tech, Aerospace Engineering</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
