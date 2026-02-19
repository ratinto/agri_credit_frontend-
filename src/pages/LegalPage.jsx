import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './StaticPage.css';

const CONTENT = {
    '/privacy': {
        title: 'Privacy Policy',
        subtitle: 'How we handle and protect your personal and agricultural data.',
        content: (
            <>
                <section>
                    <h2>1. Data Collection</h2>
                    <p>We collect personal information (Aadhaar, Phone), agricultural data (Survey numbers, Crop history), and device information (to ensure security). All data is collected with your explicit OTP-based consent.</p>
                </section>
                <section>
                    <h2>2. How We Use Data</h2>
                    <p>Your data is used solely for generating your Agri-Trust score and matching you with lenders. We do not sell your data to third-party marketers.</p>
                </section>
                <section>
                    <h2>3. Data Security</h2>
                    <p>All data is encrypted using AES-256 standards. We use tokenized IDs so that lenders do not see your full identity until you approve a loan offer.</p>
                </section>
            </>
        )
    },
    '/terms': {
        title: 'Terms of Service',
        subtitle: 'The agreement between you and AgriCredit Intelligence Platform.',
        content: (
            <>
                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By using the AgriCredit platform, you agree to provide accurate information and follow our community guidelines.</p>
                </section>
                <section>
                    <h2>2. User Responsibility</h2>
                    <p>You are responsible for maintaining the security of your account and the accuracy of the land details you provide.</p>
                </section>
                <section>
                    <h2>3. Service Boundaries</h2>
                    <p>AgriCredit is a scoring and facilitation platform. We do not provide loans directly; lending is handled by our RBI-regulated partners.</p>
                </section>
            </>
        )
    },
    '/data-consent': {
        title: 'Data Consent Policy',
        subtitle: 'Your rights and choices regarding your information.',
        content: (
            <>
                <section>
                    <h2>1. Explicit Consent</h2>
                    <p>We will never analyze your land or share your score without explicit permission. Consent can be revoked at any time via the settings panel.</p>
                </section>
                <section>
                    <h2>2. Transparency</h2>
                    <p>You have the right to know exactly what data points are influencing your score. We provide a full breakdown in your dashboard.</p>
                </section>
                <section>
                    <h2>3. Data Portability</h2>
                    <p>You can download a summary of your verified profile and Agri-Trust score to use with other financial institutions.</p>
                </section>
            </>
        )
    },
    '/ethics': {
        title: 'AI Ethics Framework',
        subtitle: 'Our commitment to fair and unbiased algorithmic decisions.',
        content: (
            <>
                <section>
                    <h2>1. Anti-Bias Guarantee</h2>
                    <p>Our models are regularly audited for regional, gender, and caste bias. We normalize scores to ensure marginal farmers are not unfairly penalized compared to large-scale owners.</p>
                </section>
                <section>
                    <h2>2. No Auto-Rejection</h2>
                    <p>We never reject a loan automatically. Low scores trigger a manual review process where a human specialist looks at the context (e.g., historical drought impact).</p>
                </section>
                <section>
                    <h2>3. Explainability</h2>
                    <p>Every scoring decision is mapped to human-readable explanations. We ensure our AI remains an assistant to human judgment, not a replacement for it.</p>
                </section>
            </>
        )
    }
};

export default function LegalPage() {
    const { pathname } = useLocation();
    const data = CONTENT[pathname] || CONTENT['/privacy'];

    return (
        <div className="static-page">
            <Navbar />
            <div className="static-page__container">
                <motion.div
                    className="static-page__header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={pathname}
                >
                    <h1 className="static-page__title">{data.title}</h1>
                    <p className="static-page__subtitle">{data.subtitle}</p>
                </motion.div>

                <motion.div
                    className="static-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {data.content}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
