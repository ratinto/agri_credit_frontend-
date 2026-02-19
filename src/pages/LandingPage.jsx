import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
    Sprout, Shield, Brain, CloudSun, TrendingUp, Users, Lock,
    ArrowRight, ChevronRight, Smartphone, Wifi, WifiOff,
    BarChart3, Leaf, Globe, Zap, Heart, CheckCircle2,
    Star, ArrowUpRight, Play
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './LandingPage.css';

const premiumEase = [0.16, 1, 0.3, 1];

const fadeInUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1.2, ease: premiumEase }
    },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

function TextReveal({ text, className, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.span
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.03, delayChildren: delay }
                }
            }}
        >
            {text.split("").map((char, i) => (char === " " ? (
                <span key={i}>&nbsp;</span>
            ) : (
                <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 0.8, ease: premiumEase }}
                >
                    {char}
                </motion.span>
            )))}
        </motion.span>
    );
}

function AnimatedSection({ children, className }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function StatCounter({ end, suffix, label }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, end]);

    return (
        <div ref={ref} className="stat-counter">
            <span className="stat-counter__number">{count}{suffix}</span>
            <span className="stat-counter__label">{label}</span>
        </div>
    );
}

const features = [
    {
        icon: <Smartphone size={28} />,
        title: 'Digital Farmer Onboarding',
        desc: 'Mobile-first OTP login, unique Farmer ID, profile completeness tracking for first-time borrowers.',
        tag: 'Farmer',
    },
    {
        icon: <Shield size={28} />,
        title: 'Agri-Trust Score',
        desc: 'AI-driven 0-100 credit score with full explainability. No black-box decisions.',
        tag: 'Core',
    },
    {
        icon: <CloudSun size={28} />,
        title: 'Satellite & Weather Intelligence',
        desc: 'Real-time NDVI, rainfall tracking, and disaster alerts integrated into credit scoring.',
        tag: 'Data',
    },
    {
        icon: <Brain size={28} />,
        title: 'Explainable ML Engine',
        desc: 'Feature importance, reason codes, and confidence levels for every prediction.',
        tag: 'AI',
    },
    {
        icon: <TrendingUp size={28} />,
        title: 'Loan Recommendation Engine',
        desc: 'Personalized loan amounts, tenure, and seasonal repayment plans for each farmer.',
        tag: 'Finance',
    },
    {
        icon: <Lock size={28} />,
        title: 'Privacy & Ethical AI',
        desc: 'Explicit consent, data encryption, no auto-rejection, and human override for every decision.',
        tag: 'Ethics',
    },
    {
        icon: <WifiOff size={28} />,
        title: 'Offline & Low-Bandwidth',
        desc: 'Works without internet. Local caching, sync when available, SMS alerts.',
        tag: 'Access',
    },
    {
        icon: <BarChart3 size={28} />,
        title: 'Bias Detection & Fairness',
        desc: 'Region-wise normalization, disaster year exclusion, tenant farmer safeguards.',
        tag: 'Ethics',
    },
];

const howItWorks = [
    {
        step: '01',
        title: 'Farmer Registers',
        desc: 'Simple mobile OTP signup. Add land details, crop info, and get a unique Farmer ID.',
        icon: <Smartphone size={24} />,
    },
    {
        step: '02',
        title: 'Data Intelligence Kicks In',
        desc: 'Satellite imagery, weather data, and market prices are analyzed automatically.',
        icon: <Globe size={24} />,
    },
    {
        step: '03',
        title: 'AI Scores & Explains',
        desc: 'The Agri-Trust Engine generates a transparent, explainable credit score.',
        icon: <Brain size={24} />,
    },
    {
        step: '04',
        title: 'Lenders Make Fair Decisions',
        desc: 'Banks see verified profiles, risk scores, and personalized loan recommendations.',
        icon: <CheckCircle2 size={24} />,
    },
];

const stakeholders = [
    {
        icon: <BarChart3 size={32} />,
        title: 'For Lenders',
        desc: 'Risk dashboards, ML insights, fraud alerts, and custom risk thresholds.',
        link: '/lender/dashboard',
        color: '#4C583E',
    },
    {
        icon: <Zap size={32} />,
        title: 'For Admins',
        desc: 'Platform governance, data quality monitoring, policy engine, and system health.',
        link: '/admin/dashboard',
        color: '#2C3424',
    },
];

export default function LandingPage() {
    return (
        <div className="landing">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero__bg">
                    <div className="hero__gradient" />
                    <div className="hero__pattern" />
                    <div className="hero__particles">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`hero__particle hero__particle--${i + 1}`} />
                        ))}
                    </div>
                </div>

                <div className="hero__container container">
                    <motion.div
                        className="hero__content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="hero__badge">
                            <Sprout size={16} />
                            <span>AI-Powered Agricultural Credit Scoring</span>
                        </div>

                        <h1 className="hero__title">
                            <TextReveal text="Empowering Rural India" /> <br />
                            <span className="text-gradient">
                                <TextReveal text="with Smart Credit Intelligence" delay={0.4} />
                            </span>
                        </h1>

                        <p className="hero__subtitle">
                            A fair, transparent, and inclusive platform that uses satellite data, weather intelligence,
                            and ethical AI to bring financial access to every farmer — regardless of their digital literacy
                            or credit history.
                        </p>

                        <div className="hero__actions">
                            <Link to="/signup" className="hero__btn hero__btn--primary">
                                <span>Get Started as Lender</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="hero__stats">
                            <StatCounter end={12} suffix="K+" label="Farmers Onboarded" />
                            <StatCounter end={284} suffix="Cr" label="Credit Disbursed" />
                            <StatCounter end={94} suffix="%" label="Collection Rate" />
                            <StatCounter end={4} suffix="%" label="Default Rate" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero__visual"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="hero__dashboard-preview">
                            <div className="hero__preview-header">
                                <div className="hero__preview-dots">
                                    <span /><span /><span />
                                </div>
                                <span className="hero__preview-title">Agri-Trust Score Dashboard</span>
                            </div>
                            <div className="hero__preview-body">
                                <div className="hero__preview-scroll-content">
                                    <div className="hero__score-card">
                                        <div className="hero__score-circle">
                                            <svg viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                                                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGradient)" strokeWidth="8"
                                                    strokeDasharray="264" strokeDashoffset="68" strokeLinecap="round"
                                                    transform="rotate(-90 50 50)" />
                                                <defs>
                                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#2D6A4F" />
                                                        <stop offset="100%" stopColor="#D4A017" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="hero__score-value">
                                                <span className="hero__score-num">74</span>
                                                <span className="hero__score-grade">B+</span>
                                            </div>
                                        </div>
                                        <div className="hero__score-info">
                                            <span className="hero__score-label">Rajesh Kumar</span>
                                            <span className="hero__score-risk" style={{ color: '#2C3424' }}>● Low-Medium Risk</span>
                                            <span className="hero__score-loc">Varanasi, UP · F-8821</span>
                                        </div>
                                    </div>

                                    <div className="hero__preview-metrics">
                                        <div className="hero__preview-label">Predictive Score Components</div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Crop Health</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '72%', background: '#38A169' }} />
                                            </div>
                                            <span className="hero__metric-value">Good</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Rainfall</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '58%', background: '#D69E2E' }} />
                                            </div>
                                            <span className="hero__metric-value">-9.3%</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Repayment</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '85%', background: '#2D6A4F' }} />
                                            </div>
                                            <span className="hero__metric-value">Excellent</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Land Size</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '90%', background: '#2D6A4F' }} />
                                            </div>
                                            <span className="hero__metric-value">High</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Soil Quality</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '65%', background: '#38A169' }} />
                                            </div>
                                            <span className="hero__metric-value">Rich</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Market Trend</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '45%', background: '#D69E2E' }} />
                                            </div>
                                            <span className="hero__metric-value">Stable</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Soil Moisture</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '30%', background: '#E53E3E' }} />
                                            </div>
                                            <span className="hero__metric-value">Critical</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Loan History</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '100%', background: '#38A169' }} />
                                            </div>
                                            <span className="hero__metric-value">Perfect</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Satellite ID</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '100%', background: '#3182CE' }} />
                                            </div>
                                            <span className="hero__metric-value">SNTL-2B</span>
                                        </div>
                                        <div className="hero__metric">
                                            <span className="hero__metric-label">Region Rank</span>
                                            <div className="hero__metric-bar">
                                                <div className="hero__metric-fill" style={{ width: '92%', background: '#38A169' }} />
                                            </div>
                                            <span className="hero__metric-value">#12/1.2K</span>
                                        </div>
                                    </div>

                                    <div className="hero__preview-insight">
                                        <div className="hero__preview-label">AI Logic Explanation</div>
                                        <p>Score boosted by consistent repayment over 3 seasons and positive NDVI satellite index indicating healthy vegetation.</p>
                                    </div>

                                    <div className="hero__preview-alert">
                                        <CloudSun size={16} />
                                        <span>⚠️ Heavy rainfall alert for next week</span>
                                    </div>

                                    <div className="hero__preview-footer">
                                        <span>Last Sync: Just now</span>
                                        <span>Model v3.2.1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== STAKEHOLDERS ===== */}
            <section className="stakeholders section" id="about">
                <div className="container">
                    <AnimatedSection className="stakeholders__grid">
                        {stakeholders.map((s, i) => (
                            <motion.div key={i} variants={fadeInUp} transition={{ duration: 0.5 }}>
                                <Link to={s.link} className="stakeholder-card" style={{ '--card-color': s.color }}>
                                    <div className="stakeholder-card__icon">{s.icon}</div>
                                    <h3 className="stakeholder-card__title">{s.title}</h3>
                                    <p className="stakeholder-card__desc">{s.desc}</p>
                                    <span className="stakeholder-card__link">
                                        Explore <ArrowUpRight size={16} />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatedSection>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="features-section section" id="features">
                <div className="container">
                    <AnimatedSection>
                        <motion.div className="section-header" variants={fadeInUp} transition={{ duration: 0.5 }}>
                            <span className="section-header__badge">Platform Features</span>
                            <h2 className="section-header__title">
                                <TextReveal text="Built for India's Agricultural Future" />
                            </h2>
                            <p className="section-header__desc">
                                A comprehensive platform addressing every aspect of agricultural credit — from
                                farmer onboarding to ethical AI scoring and fraud detection.
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="features-grid">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                className="feature-card"
                                variants={fadeInUp}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="feature-card__header">
                                    <div className="feature-card__icon">{f.icon}</div>
                                    <span className="feature-card__tag">{f.tag}</span>
                                </div>
                                <h3 className="feature-card__title">{f.title}</h3>
                                <p className="feature-card__desc">{f.desc}</p>
                            </motion.div>
                        ))}
                    </AnimatedSection>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="how-it-works section" id="how-it-works">
                <div className="container">
                    <AnimatedSection>
                        <motion.div className="section-header" variants={fadeInUp} transition={{ duration: 0.5 }}>
                            <span className="section-header__badge">How It Works</span>
                            <h2 className="section-header__title">
                                <TextReveal text="From Registration to Fair Credit" />
                            </h2>
                            <p className="section-header__desc">
                                A simple 4-step journey that transforms agricultural data into fair, explainable credit decisions.
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="how-it-works__grid">
                        {howItWorks.map((step, i) => (
                            <motion.div
                                key={i}
                                className="step-card"
                                variants={fadeInUp}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="step-card__number">{step.step}</div>
                                <div className="step-card__icon">{step.icon}</div>
                                <h3 className="step-card__title">{step.title}</h3>
                                <p className="step-card__desc">{step.desc}</p>
                                {i < howItWorks.length - 1 && <div className="step-card__connector" />}
                            </motion.div>
                        ))}
                    </AnimatedSection>
                </div>
            </section>

            {/* ===== ETHICAL AI SECTION ===== */}
            <section className="ethics section">
                <div className="container">
                    <AnimatedSection className="ethics__content">
                        <motion.div className="ethics__text" variants={fadeInUp} transition={{ duration: 0.5 }}>
                            <span className="section-header__badge">Ethical AI Framework</span>
                            <h2 className="section-header__title">
                                <TextReveal text="Technology with Conscience" />
                            </h2>
                            <p className="ethics__desc">
                                Our platform is built on the principle that technology should empower, not punish.
                                Every decision is explainable, every farmer has a voice, and no one is left behind.
                            </p>

                            <div className="ethics__principles">
                                {[
                                    { icon: <CheckCircle2 size={20} />, text: 'No auto-rejection — human override always available' },
                                    { icon: <CheckCircle2 size={20} />, text: 'First-time borrowers get fair scoring without penalty' },
                                    { icon: <CheckCircle2 size={20} />, text: 'Disaster years excluded from credit calculations' },
                                    { icon: <CheckCircle2 size={20} />, text: 'Tenant farmers get equal opportunities' },
                                    { icon: <CheckCircle2 size={20} />, text: 'Region-wise normalization prevents geographic bias' },
                                    { icon: <CheckCircle2 size={20} />, text: 'Every farmer can appeal and request re-verification' },
                                ].map((p, i) => (
                                    <div key={i} className="ethics__principle">
                                        <span className="ethics__principle-icon">{p.icon}</span>
                                        <span>{p.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="ethics__visual" variants={fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
                            <div className="ethics__cards">
                                <div className="ethics__card ethics__card--1">
                                    <Heart size={20} />
                                    <h4>Empowerment</h4>
                                    <p>Score improvement guidance, not punishment</p>
                                </div>
                                <div className="ethics__card ethics__card--2">
                                    <Shield size={20} />
                                    <h4>Transparency</h4>
                                    <p>Every score change is explained</p>
                                </div>
                                <div className="ethics__card ethics__card--3">
                                    <Users size={20} />
                                    <h4>Inclusion</h4>
                                    <p>Built for marginal &amp; tenant farmers</p>
                                </div>
                                <div className="ethics__card ethics__card--4">
                                    <Lock size={20} />
                                    <h4>Privacy</h4>
                                    <p>Explicit consent, encrypted data</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="cta section">
                <div className="container">
                    <motion.div
                        className="cta__card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="cta__content">
                            <h2>Ready to Transform Agricultural Credit?</h2>
                            <p>Join thousands of farmers and lenders already using our platform for fair, data-driven lending.</p>
                            <div className="cta__buttons">
                                <Link to="/lender/dashboard" className="hero__btn hero__btn--primary">
                                    <span>Start as Lender</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
