import React from 'react';

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">Selected Projects</h2>
                <div className="projects-grid">
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
