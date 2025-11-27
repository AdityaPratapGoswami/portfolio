import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Blogs from './Blogs';
import Footer from './Footer';
import BackgroundCanvas from './BackgroundCanvas';
import ScrollToTop from './ScrollToTop';

const Home = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        document.title = "Aditya";
    }, []);

    return (
        <>
            <ScrollToTop />
            <BackgroundCanvas onLoaded={() => setIsLoading(false)} className={isLoading ? 'canvas-loader' : ''} />
            <a href="#main-content" className="skip-link">Skip to main content</a>

            <div className={`content-wrapper ${isLoading ? 'loading-blur' : ''}`}>
                <Navbar />

                <main id="main-content">
                    <Hero />
                    <About />
                    <Experience />
                    <Projects />
                    <Blogs />
                    <Footer />
                </main>
            </div>
        </>
    );
};

export default Home;
