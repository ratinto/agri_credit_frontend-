import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Smartphone, Globe, Brain, CheckCircle2, ArrowRight } from 'lucide-react';
import './StaticPage.css';

const steps = [
    {
        step: '01',
        icon: <Smartphone size={40} />,
        title: 'Farmer Registration',
        desc: 'Farmers sign up via their mobile number. They provide basic details about their land (Khasra/Survey numbers) and upload crop history photos.',
    },
    {
        step: '02',
        icon: <Globe size={40} />,
        title: 'Geospatial Analysis',
        desc: 'Our system automatically fetches satellite imagery for the provided land coordinates. We analyze soil moisture, vegetation index (NDVI), and historical weather patterns.',
    },
    {
        step: '03',
        icon: <Brain size={40} />,
        title: 'AI Scoring Engine',
        desc: 'The Agri-Trust engine processes 40+ data points to generate a Credit Score. This score is shared with the farmer along with clear steps on how to improve it.',
    },
    {
        step: '04',
        icon: <CheckCircle2 size={40} />,
        title: 'Lender Matching',
        desc: 'Verified lender partners receive anonymized profiles of eligible farmers. Once the farmer consents, the lender reviews the full dashboard and disburses the loan digitally.',
    },
];

export default function HowItWorksPage() {
    return (
        <div className="static-page">
            <Navbar />
            <div className="static-page__container">
                <motion.div
                    className="static-page__header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="section-header__badge">Process Overiew</span>
                    <h1 className="static-page__title">How It <span className="text-gradient">Works</span></h1>
                    <p className="static-page__subtitle">
                        A transparent, data-driven journey from field registration to financial empowerment.
                    </p>
                </motion.div>

                <div className="how-it-works-timeline">
                    {steps.map((s, i) => (
                        <motion.div
                            key={i}
                            className="static-content"
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: '2rem', position: 'relative' }}
                        >
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    fontSize: '4rem',
                                    fontWeight: '900',
                                    color: 'rgba(0,0,0,0.05)',
                                    position: 'absolute',
                                    right: '2rem',
                                    top: '1rem',
                                    lineHeight: 1
                                }}>
                                    {s.step}
                                </div>
                                <div className="navbar__logo-icon" style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                    {s.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h2>{s.title}</h2>
                                    <p style={{ fontSize: '1.1rem' }}>{s.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
