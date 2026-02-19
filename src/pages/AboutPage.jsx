import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Leaf, Heart, Shield, Users, Target } from 'lucide-react';
import './StaticPage.css';

export default function AboutPage() {
    return (
        <div className="static-page">
            <Navbar />
            <div className="static-page__container">
                <motion.div
                    className="static-page__header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="section-header__badge">Our Mission</span>
                    <h1 className="static-page__title">About <span className="text-gradient">AgriCredit</span></h1>
                    <p className="static-page__subtitle">
                        Redefining rural finance through empathy, data, and ethical artificial intelligence.
                    </p>
                </motion.div>

                <motion.section
                    className="static-content"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2>The Problem We're Solving</h2>
                    <p>
                        In India, over 100 million farmers lack access to formal credit. Traditional banking systems rely on credit scores that don't exist in rural sectors and collateral that is often disputed or undocumented. This drives farmers toward predatory informal moneylenders, leading to a cycle of debt.
                    </p>
                    <p>
                        AgriCredit was founded to bridge this gap. We believe that a farmer's creditworthiness should be judged by their hard work, their land's potential, and their environmental resilience—not just their bank balance.
                    </p>
                </motion.section>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <motion.div className="static-content" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}><Target size={32} /></div>
                        <h3>Our Vision</h3>
                        <p>To become the digital backbone of rural lending in India, ensuring every honest farmer has the capital they need to grow their future.</p>
                    </motion.div>
                    <motion.div className="static-content" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <div style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}><Heart size={32} /></div>
                        <h3>Our Values</h3>
                        <p>Radical transparency, data privacy, and ethical AI. We never use a "black-box" model; if we say no, we explain why and how to get to a yes.</p>
                    </motion.div>
                </div>

                <motion.section
                    className="static-content"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2>Meet the Team</h2>
                    <p>
                        We are a group of data scientists, agronomists, and former rural bankers who saw a system that wasn't working and decided to build a better one. Our team is spread across Delhi, Varanasi, and Bangalore, working directly with local Mandis and farmer collectives to understand ground realities.
                    </p>
                </motion.section>
            </div>
            <Footer />
        </div>
    );
}
