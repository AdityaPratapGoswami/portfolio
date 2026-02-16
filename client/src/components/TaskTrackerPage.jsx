import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/ArticlePage.css';

const TaskTrackerPage = () => {
    useEffect(() => {
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.title = "OKR based Task Tracker";
    }, []);

    return (
        <div className="article-page">
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="logo">APG.</Link>
                    <div className="nav-actions">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <div className="article-layout">
                <aside className="article-sidebar">
                    <div className="sidebar-content">
                        <div className="toc-widget desktop-only">
                            <h3>Table of Contents</h3>
                            <ul>
                                <li><a href="#cracks-in-system">Cracks in the System</a></li>
                                <li><a href="#real-problem">The Real Problem</a></li>
                                <li><a href="#missing-analytics">Missing Analytics</a></li>
                                <li><a href="#introducing-balance">Introducing Balance</a></li>
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
                        <p className="lead-paragraph">I was using Notion to manage my everyday tasks. Every Sunday, I’d sit down, plan out my next week, list my goals, break them into tasks—and honestly, it worked. Once things were written down, I felt locked in. Each day, I’d open Notion and just execute.</p>

                        <h2 id="cracks-in-system">But over time, cracks started showing.</h2>
                        <p>First, everything was way too manual. Life doesn’t run on a fixed schedule. Some tasks are spontaneous, some ideas come mid-day, some priorities change on the fly. I had to constantly update, rearrange, and rethink my structure. After a while, that started feeling like work in itself.</p>
                        <p>At the same time, I wanted more than just a to-do list. I wanted to build my life around Objectives and Key Results—something that gives direction and purpose. So I created an OKR page in Notion. On paper, it sounded perfect.</p>
                        <p>In reality? It was a mess.</p>
                        <p>The OKR page lived separately from my weekly tasks. Managing both at the same time was hard. I’d start strong, check OKRs for a few days… and then slowly drift back to just ticking off weekly tasks. Eventually, the OKR page just sat there untouched.</p>

                        <h2 id="real-problem">And that’s when I hit the real problem.</h2>
                        <p>I was completing tasks every day—but I had no idea where I was actually headed.</p>
                        <p>What’s the point of being productive if your actions aren’t connected to a larger direction?</p>
                        <p>Humans need to write their goals down. More importantly, they need to see progress toward those goals. I couldn’t see that. All I saw was a growing list of completed checkboxes.</p>

                        <h2 id="missing-analytics">Another big gap was behavior analysis.</h2>
                        <p>I wanted answers to questions like:</p>
                        <ul>
                            <li>Which tasks do I keep postponing?</li>
                            <li>Which categories do I consistently ignore?</li>
                            <li>When am I most productive?</li>
                            <li>What patterns repeat every week?</li>
                        </ul>
                        <p>Notion wasn’t built for that depth of personal analytics. I couldn’t store or analyze enough meaningful data to understand my own behavior. Everything stayed static—no insights, no patterns, no feedback loop.</p>

                        <h2 id="introducing-balance">So I decided to build Balance.</h2>
                        <p>A task tracker that connects everyday tasks with long-term objectives. Something that handles spontaneous tasks naturally, keeps goals and execution in the same place, and actually tells you how you’re behaving over time—not just what you’ve checked off.</p>
                        <p>Balance wasn’t about doing more tasks.</p>
                        <p>It was about knowing why I’m doing them—and whether they’re actually taking me somewhere.</p>

                        <p>Check out the <a href="https://task-tracker-v6xe.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>Live Site</a> or explore the code on <a href="https://github.com/AdityaPratapGoswami/task-tracker" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>GitHub</a>.</p>

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
