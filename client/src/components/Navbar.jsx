import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <a href="#hero" className="logo">APG.</a>

                {/* Desktop Nav */}
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#blogs">Blogs</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <div className="nav-actions">
                    <ThemeToggle />

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" aria-label="Toggle Menu" onClick={toggleMenu}>
                        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="mobile-nav-links">
                        <li><a href="#about" onClick={closeMenu}>About</a></li>
                        <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
                        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                        <li><a href="#blogs" onClick={closeMenu}>Blogs</a></li>
                        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
