import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticlePage.css';

const ArticlePage = () => {
    useEffect(() => {
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.title = "Emotional Intelligence";
    }, []);

    const toggleTheme = (e) => {
        // Fallback for browsers that don't support View Transitions
        if (!document.startViewTransition) {
            performToggle();
            return;
        }

        // Get click coordinates
        const x = e.clientX;
        const y = e.clientY;

        // Calculate radius to the furthest corner
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // Start the transition
        const transition = document.startViewTransition(() => {
            performToggle();
        });

        // Animate the clip-path
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
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
                            {/* Moon Icon (Show in Light Mode) */}
                            <svg className="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            {/* Sun Icon (Show in Dark Mode) */}
                            <svg className="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
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
                                <li><a href="#what-is-eq">What Exactly Is EQ?</a></li>
                                <li><a href="#why-eq-matters">Why EQ Matters More Now</a></li>
                                <li><a href="#for-individuals">For Individuals</a></li>
                                <li><a href="#for-companies">For Companies and Leaders</a></li>
                                <li><a href="#conclusion">Conclusion</a></li>
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
                        <h1>Emotional Intelligence</h1>
                        <p className="article-subtitle">The Human Advantage AI Can’t Automate</p>
                        <div className="article-meta">
                            <span>Nov 26, 2024</span> • <span>5 min read</span>
                        </div>
                    </header>

                    <div className="article-content">
                        <p className="lead-paragraph">Maybe you’ve felt it too.</p>
                        <p>You join a meeting, and someone casually mentions that a chatbot wrote half their code. Another colleague shares that AI summarized a legal document in seconds. Meanwhile, your own inbox is now full of AI-generated drafts.</p>
                        <p>The pace is wild.</p>
                        <p>And yet, right in the middle of all this technological speed, something unexpected keeps happening: when it comes to the moments that matter—tension in a team, a nervous client call, a friend at work who suddenly goes quiet—everyone still turns to the human in the room.</p>
                        <p>It’s almost ironic.</p>
                        <p>The more intelligent our tools become, the more valuable our emotional intelligence becomes.</p>

                        <h2 id="what-is-eq">So… What Exactly Is EQ?</h2>
                        <p>If IQ is about thinking, EQ is about feeling. Not in a dramatic way—more in a “I understand what’s going on with myself and others” way.</p>
                        <p>EQ is made up of a few simple things we’ve been practicing our whole lives:</p>
                        <ul>
                            <li>Noticing your own emotions before they run the show</li>
                            <li>Managing stress without snapping</li>
                            <li>Understanding what someone else might be feeling</li>
                            <li>Communicating in a way people actually want to listen to</li>
                            <li>Motivating yourself from within rather than waiting for applause or fear</li>
                        </ul>
                        <p>It’s not personality. It’s not a zodiac sign. It’s not about being “nice.”</p>
                        <p>It’s the skill that sits quietly underneath every smooth conversation and every healthy relationship.</p>
                        <p>And these days, it’s becoming the secret ingredient behind effective work.</p>

                        <h2 id="why-eq-matters">Why EQ Matters More Now (In the Age of AI)</h2>
                        <p>Let’s talk about the elephant in the workplace: AI is really, really good at logical stuff now. Data crunching? Done. Pattern detection? Better than us. Drafting? Faster than us. Even coding? According to multiple industry reports, a growing percentage of professional code is AI-assisted.</p>
                        <p>So where does that leave humans?</p>
                        <p>Interestingly… in a pretty exciting place.</p>

                        <h3>1. AI can process, but humans connect</h3>
                        <p>A tool might analyze millions of data points.</p>
                        <p>But explaining those findings to someone who’s stressed, confused, or skeptical?</p>
                        <p>That’s still a job for us.</p>
                        <p>And not because AI isn’t smart enough, but because trust doesn’t come from clean data—it comes from human presence.</p>

                        <h3>2. High-EQ work is becoming the “safe” work</h3>
                        <p>Look at growth areas in the job market: healthcare, education, sales, product management, leadership roles.</p>
                        <p>They’re all rooted in people skills—listening, empathizing, resolving, encouraging.</p>
                        <p>The World Economic Forum’s recent skills outlook (2023) puts empathy, resilience, and leadership in the top tier of rising skills. Not because they’re trendy, but because they’re hard to automate.</p>
                        <p>You can outsource spreadsheets.</p>
                        <p>You can’t outsource emotional nuance.</p>

                        <h3>3. EQ is a performance multiplier</h3>
                        <p>You’ve probably noticed this yourself. There’s always that one manager who makes you want to give your best, or that teammate who calms the room instantly. They’re not necessarily the smartest person on paper—but the team performs better because of them.</p>
                        <p>Studies have shown that many top performers display strong EQ (exact percentages vary—but the trend is consistent across research).</p>
                        <p>It’s the difference between a team that works and a team that works together.</p>

                        <h3>4. AI can imitate empathy… but only on the surface</h3>
                        <p>Sure, AI can generate empathetic language. It can guess the tone. It can recommend what to say when someone is frustrated.</p>
                        <p>But compassion isn’t a script—it’s a felt experience.</p>
                        <p>You know when someone is genuinely listening versus following a checklist.</p>
                        <p>That’s what sets EQ apart: it’s human-authored, not machine-generated.</p>

                        <h2 id="for-individuals">For Individuals: How EQ Helps You Thrive in an AI-Heavy Workplace</h2>
                        <p>Let’s get practical—not with exercises or tests, but with the why.</p>

                        <h3>1. EQ makes conversations easier</h3>
                        <p>When tensions rise, EQ helps you avoid spirals, misunderstandings, awkward silences, or unnecessary conflict.</p>

                        <h3>2. EQ makes you someone people trust</h3>
                        <p>In a world where AI is doing more “thinking,” humans who can communicate with warmth stand out instantly.</p>

                        <h3>3. EQ makes you adaptable</h3>
                        <p>New tools, new processes, new AI features—change is everywhere.</p>
                        <p>EQ helps you stay grounded through it.</p>

                        <h3>4. EQ opens more career doors</h3>
                        <p>Across roles—from tech to sales to management—people skills are becoming the differentiator.</p>
                        <p>You can teach someone a new tool.</p>
                        <p>You can’t teach them curiosity, kindness, or self-awareness in a single training video.</p>

                        <h2 id="for-companies">For Companies and Leaders: EQ Isn’t Optional Anymore</h2>
                        <p>Organizations spend millions on technology upgrades but often ignore the emotional systems that actually keep teams functioning. And in an AI-driven world, this becomes even riskier.</p>

                        <h3>1. Hire for emotional clarity, not just competence</h3>
                        <p>When interviews include behavioral questions about conflict, compassion, listening, or working across differences, teams end up healthier.</p>

                        <h3>2. Onboarding should include human connection</h3>
                        <p>Buddy programs, storytelling sessions, team rituals—anything that gives people emotional anchors.</p>

                        <h3>3. Create psychological safety as a default, not a perk</h3>
                        <p>When people feel safe to speak, ask, question, and admit mistakes, everything improves: innovation, collaboration, and retention.</p>

                        <h3>4. Watch out for “performative empathy”</h3>
                        <p>Nothing kills trust faster than pretending to care. Real empathy is grounded, specific, and backed by action.</p>

                        <h3>5. EQ impacts business outcomes more than people realize</h3>
                        <p>It shows up in:</p>
                        <ul>
                            <li>lower attrition</li>
                            <li>higher customer satisfaction</li>
                            <li>better team velocity</li>
                            <li>fewer escalations</li>
                            <li>stronger client relationships</li>
                        </ul>
                        <p>No AI update can replace that.</p>

                        <h2 id="conclusion">Conclusion: The Human Edge We Need to Protect</h2>
                        <p>Here’s the truth:</p>
                        <p>AI will keep getting smarter. It will handle more tasks, more quickly, and with fewer mistakes. But that doesn’t make us obsolete. It makes our humanity more valuable.</p>
                        <p>EQ is where we comfort, connect, inspire, reassure, redirect, and collaborate.</p>
                        <p>It’s where we become more than our job descriptions.</p>
                        <p>It’s where real work—not the technical kind, but the human kind—actually happens.</p>
                        <p>So as AI accelerates our workflows, maybe EQ is what slows us down just enough to understand each other again.</p>

                        <div className="call-to-action">
                            <h3>Call to Action</h3>
                            <p>Share this with someone who leads people.</p>
                            <p>Bring it to your next team meeting.</p>
                            <p>Start a conversation about what your workplace looks like when emotions aren’t an afterthought.</p>
                            <p>Because the future of work isn’t just intelligent.</p>
                            <p>It’s emotional.</p>
                        </div>

                        <div className="tldr-section">
                            <h3>TL;DR</h3>
                            <p>AI is taking over logical, data-heavy tasks, but it can’t replace emotional intelligence—our ability to connect, empathize, and navigate complex human moments. EQ is becoming the most valuable currency in workplaces shaped by AI. It shows up in trust, leadership, collaboration, and the everyday emotional moments that tools simply can’t handle. In the age of automation, EQ isn’t a “soft skill”—it’s the human advantage.</p>
                        </div>

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

export default ArticlePage;
