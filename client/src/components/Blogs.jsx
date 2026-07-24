import { Link } from 'react-router-dom';

const Blogs = () => {
    return (
        <section id="blogs" className="blogs-section">
            <div className="container">
                <h2 className="section-title">Latest Writing</h2>
                <div className="blogs-grid">
                    <article className="blog-card">
                        <span className="blog-date">Nov 26, 2024</span>
                        <h3>Emotional Intelligence</h3>
                        <p>In an AI-driven world, emotional intelligence is becoming the human edge at work. A conversational look at why EQ matters more than ever.</p>
                        <Link to="/article/emotional-intelligence" target="_blank" rel="noopener noreferrer" className="read-more">Read Article &rarr;</Link>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
