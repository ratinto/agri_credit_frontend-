import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Smartphone, Shield, Brain, CloudSun, Sprout } from 'lucide-react';
import './StaticPage.css';

const features = [
    {
        icon: <Smartphone size={28} />,
        title: 'Digital Farmer Onboarding',
        desc: 'Mobile-first OTP login and unique Farmer ID generation. We verify profiles through Aadhaar integration and satellite-based land records to create a trusted digital identity for traditional farmers.',
        details: ['E-KYC verification', 'Land record mapping', 'Multi-lingual interface', 'Aadhaar integration']
    },
    {
        icon: <Shield size={28} />,
        title: 'Agri-Trust Score',
        desc: 'A proprietary AI-driven scoring system that evaluates creditworthiness without traditional bank statements. We use alternative data like crop history, soil health, and local yield trends.',
        details: ['0-100 score range', 'Real-time updates', 'Peer-group comparison', 'Credit history builder']
    },
    {
        icon: <CloudSun size={28} />,
        title: 'Satellite Intelligence',
        desc: 'Real-time monitoring of farms using NDVI and weather data. This allows us to assess crop health remotely and predict yields with high accuracy before harvest.',
        details: ['NDVI monitoring', 'Pest alert system', 'Yield prediction', 'Weather risk hedging']
    },
    {
        icon: <Brain size={28} />,
        title: 'Explainable AI Engine',
        desc: 'No "black-box" decisions. Every score and loan recommendation comes with clear reason codes, helping farmers and lenders understand exactly why a decision was made.',
        details: ['Feature importance labels', 'Model confidence levels', 'Bias mitigation', 'Reason codes']
    },
];

export default function FeaturesPage() {
    return (
        <div className="static-page">
            <Navbar />
            <div className="static-page__container bg-dot-grid">
                <motion.div
                    className="static-page__header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="section-header__badge">Our Capabilities</span>
                    <h1 className="static-page__title">Platform <span className="text-posh">Features</span></h1>
                    <p className="static-page__subtitle">
                        Comprehensive tools designed specifically for the unique challenges of rural agricultural lending.
                    </p>
                </motion.div>

                <div className="features-grid">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="feature-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="feature-card__icon">{f.icon}</div>
                            <h3 className="feature-card__title">{f.title}</h3>
                            <p>{f.desc}</p>
                            <div className="feature-card__details">
                                {f.details.map((detail, j) => (
                                    <span key={j} className="feature-chip"><Sprout size={14} />{detail}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
