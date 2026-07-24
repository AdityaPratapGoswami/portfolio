import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Blogs from './Blogs';
import Footer from './Footer';
import BackgroundCanvas from './BackgroundCanvas';
import ScrollToTop from './ScrollToTop';
import { LoadingProvider, useLoading } from '../context/LoadingContext';

const HomeContent = () => {
    const { isLoading, setLoadingComplete } = useLoading();

    useEffect(() => {
        document.title = "Aditya";
    }, []);

    return (
        <>
            <ScrollToTop />
            <BackgroundCanvas onLoaded={setLoadingComplete} className={isLoading ? 'canvas-loader' : ''} />
            <a href="#main-content" className="skip-link">Skip to main content</a>

            <Navbar />

            <div className={`content-wrapper ${isLoading ? 'loading-blur' : ''}`}>
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

const Home = () => {
    return (
        <LoadingProvider>
            <HomeContent />
        </LoadingProvider>
    );
};

export default Home;
