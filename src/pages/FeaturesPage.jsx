import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Smartphone, Shield, Brain, CloudSun, TrendingUp, Lock, BarChart3, WifiOff, Sprout } from 'lucide-react';
import './StaticPage.css';

const features = [
    {
        icon: <Smartphone className="text-primary" />,
        title: 'Digital Farmer Onboarding',
        desc: 'Mobile-first OTP login and unique Farmer ID generation. We verify profiles through Aadhaar integration and satellite-based land records to create a trusted digital identity for traditional farmers.',
        details: ['E-KYC verification', 'Land record mapping', 'Multi-lingual interface', 'Aadhaar integration']
    },
    {
        icon: <Shield className="text-secondary" />,
        title: 'Agri-Trust Score',
        desc: 'A proprietary AI-driven scoring system that evaluates creditworthiness without traditional bank statements. We use alternative data like crop history, soil health, and local yield trends.',
        details: ['0-100 score range', 'Real-time updates', 'Peer-group comparison', 'Credit history builder']
    },
    {
        icon: <CloudSun style={{ color: '#3182CE' }} />,
        title: 'Satellite Intelligence',
        desc: 'Real-time monitoring of farms using NDVI and weather data. This allows us to assess crop health remotely and predict yields with high accuracy before harvest.',
        details: ['NDVI monitoring', 'Pest alert system', 'Yield prediction', 'Weather risk hedging']
    },
    {
        icon: <Brain style={{ color: '#805AD5' }} />,
        title: 'Explainable AI Engine',
        desc: 'No "black-box" decisions. Every score and loan recommendation comes with clear reason codes, helping farmers and lenders understand exactly why a decision was made.',
        details: ['Feature importance labels', 'Model confidence levels', 'Bias mitigation', 'Reason codes']
    },
];

export default function FeaturesPage() {
    return (
        <div className="static-page">
            <Navbar />
            <div className="static-page__container">
                <motion.div
                    className="static-page__header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="section-header__badge">Our Capabilities</span>
                    <h1 className="static-page__title">Platform <span className="text-gradient">Features</span></h1>
                    <p className="static-page__subtitle">
                        Comprehensive tools designed specifically for the unique challenges of rural agricultural lending.
                    </p>
                </motion.div>

                <div className="features-detailed">
                    {features.map((f, i) => (
                        <motion.section
                            key={i}
                            className="static-content"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{ marginBottom: '2rem' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="navbar__logo-icon" style={{ width: '50px', height: '50px' }}>
                                    {f.icon}
                                </div>
                                <h2 style={{ margin: 0 }}>{f.title}</h2>
                            </div>
                            <p>{f.desc}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                                {f.details.map((detail, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                        <Sprout size={14} />
                                        <span>{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
