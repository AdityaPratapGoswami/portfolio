import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticlePage.css';

const TaskTrackerPage = () => {
    useEffect(() => {
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.title = "OKR based Task Tracker";
    }, []);

    const toggleTheme = (e) => {
        if (!document.startViewTransition) {
            performToggle();
            return;
        }

        const x = e.clientX;
        const y = e.clientY;

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            performToggle();
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];

            document.documentElement.animate(
                { clipPath: clipPath },
                {
                    duration: 400,
                    easing: 'ease-in',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    };

    const performToggle = () => {
        let theme = 'light';
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            theme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('theme', theme);
    };

    return (
        <div className="article-page">
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="logo">APG.</Link>
                    <div className="nav-actions">
                        <button className="theme-toggle" aria-label="Toggle Dark Mode" onClick={toggleTheme}>
                            <svg className="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            <svg className="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="article-layout">
                <aside className="article-sidebar">
                    <div className="sidebar-content">
                        <div className="toc-widget desktop-only">
                            <h3>Table of Contents</h3>
                            <ul>
                                <li><a href="#core-problem">The Core Problem</a></li>
                                <li><a href="#designed-for-real-life">Designed for Real Life</a></li>
                                <li><a href="#bringing-okrs">OKRs into Everyday Life</a></li>
                                <li><a href="#why-i-built-it">Why I Built It</a></li>
                            </ul>
                        </div>
                        <div className="author-widget desktop-only">
                            <h3>About the Author</h3>
                            <p>Aditya Pratap Goswami</p>
                            <p className="author-role"><a href="mailto:adityapratapgoswami07@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>adityapratapgoswami07@gmail.com</a></p>
                        </div>
                    </div>
                </aside>

                <main className="article-main">
                    <header className="article-header">
                        <h1>From Manual Notion Lists to OKRs</h1>
                        <p className="article-subtitle">A smart, analytics-driven daily tracker</p>
                        <div className="article-meta">
                            <span>Project Showcase</span> • <span>5 min read</span>
                        </div>
                    </header>

                    <div className="article-content">
                        <p className="lead-paragraph">For the longest time, I believed something simple: when you write your tasks down, you’re far more likely to get them done. And the research agrees.</p>
                        <p>So naturally, I used to track every day on Notion — three categories, four to five tasks under each. It kept me organized, but honestly… it was also a slog. Too manual, too repetitive, too boring. And the biggest problem? I couldn’t analyze anything.</p>
                        <p>There were questions I wanted answers to —</p>
                        <ul>
                            <li>Which tasks am I repeatedly ignoring?</li>
                            <li>Which category deserves more focus this week?</li>
                            <li>Where am I slipping, and where am I improving?</li>
                        </ul>
                        <p>Notion wasn’t built for that level of insight. And implementing OKRs on top of this system? Nearly impossible. It added so much overhead that I eventually abandoned the whole idea of integrating OKRs into my everyday workflow.</p>
                        <p>That frustration is what sparked this project: a personal task-tracking web app that actually learns from your behaviour instead of just recording it.</p>

                        <h2 id="core-problem">The Core Problem I Wanted to Solve</h2>
                        <p>My original workflow looked organized on the surface, but it had three core issues:</p>
                        <h3>1. Too much manual effort</h3>
                        <p>Creating daily pages, typing tasks, assigning points — it all took more time than the tasks themselves.</p>
                        <h3>2. Zero analytics</h3>
                        <p>I couldn't see patterns. There was no way to understand my habits beyond intuition.</p>
                        <h3>3. OKRs felt impossible to implement</h3>
                        <p>OKRs are great in theory but hard to bring into day-to-day life without automation or structure.</p>
                        <p>I wanted a system that would handle the boring parts for me and give me meaningful insights so I could actually improve.</p>

                        <h2 id="designed-for-real-life">The Task Tracker: Designed for Real Life, Not Just Recording</h2>
                        <p>This web app is my attempt at turning that messy daily routine into something structured, intelligent, and genuinely useful.</p>
                        <p>Here’s what it does:</p>
                        <p>The app mirrors the natural rhythm of life. Everything is nested, easy to navigate, and automatically generated — no more manually creating pages.</p>

                        <h3>✔️ Daily Tasks with Points</h3>
                        <p>Each day comes with task sections. Complete a task → earn points.</p>
                        <p>Your daily total feeds into your weekly average, giving instant visibility into consistency.</p>

                        <h3>Behavior-Driven Analytics</h3>
                        <p>This is the real magic. The system can highlight:</p>
                        <ul>
                            <li>Tasks you keep ignoring</li>
                            <li>Categories where you’re slipping</li>
                            <li>Weeks where productivity dipped</li>
                            <li>Patterns in focus areas</li>
                            <li>Trends across months and quarters</li>
                        </ul>
                        <p>It’s like turning your routine into a dashboard.</p>

                        <h2 id="bringing-okrs">OKRs into Everyday Life</h2>
                        <p>The biggest win for me.</p>
                        <p>By connecting tasks to categories and categories to higher-level goals, OKRs become naturally integrated into the flow instead of being a complicated separate system.</p>
                        <ul>
                            <li>Objectives guide the bigger picture</li>
                            <li>Key Results map to categories</li>
                            <li>Daily tasks push those results forward</li>
                        </ul>
                        <p>It’s OKR, but lightweight and human.</p>

                        <h2 id="why-i-built-it">Why I Built It</h2>
                        <p>Because I didn’t want another to-do list.</p>
                        <p>I wanted a tool that reflects how I think, how I work, and how I improve.</p>
                        <p>This project helped me turn an unscalable workflow into something automated, measurable, and motivating. And it showed me how personal productivity systems can evolve when combined with thoughtful product design and engineering.</p>

                        <p>Here’s the <a href="https://github.com/AdityaPratapGoswami/task-tracker" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>GitHub link</a> to the project. Once development is complete, I’ll be bringing this tool live on the web as well.</p>

                        <div className="author-widget mobile-only">
                            <h3>About the Author</h3>
                            <p>Aditya Pratap Goswami</p>
                            <p className="author-role"><a href="mailto:adityapratapgoswami07@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>adityapratapgoswami07@gmail.com</a></p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TaskTrackerPage;
