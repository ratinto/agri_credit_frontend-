import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Book, Code, FileText, Search } from 'lucide-react';
import './StaticPage.css';

const CONTENT = {
    '/docs': {
        title: 'Documentation',
        subtitle: 'Learn how to integrate and use the AgriCredit platform.',
        icon: <Book />,
        content: 'Our documentation covers everything from farmer onboarding workflows to lender dashboard management. Whether you are a bank agent or a platform admin, find the guides you need here.'
    },
    '/api': {
        title: 'API Reference',
        subtitle: 'Developer tools and system integration guides.',
        icon: <Code />,
        content: 'Integrate the Agri-Trust score directly into your banking systems. Secure REST APIs for score retrieval, consent management, and document verification.'
    },
    '/case-studies': {
        title: 'Case Studies',
        subtitle: 'Real stories of impact across rural India.',
        icon: <FileText />,
        content: 'Read about how a cooperative bank in Purvanchal reduced their NPA by 40% using our satellite-based credit scoring, and how farmers in Bundelkhand accessed credit for the first time.'
    },
    '/research': {
        title: 'Research Papers',
        subtitle: 'The science behind our AI and remote sensing models.',
        icon: <Search />,
        content: 'Our research lab publishes periodic whitepapers on bias detection in rural credit, NDVI correlation with small-holder land yields, and the ethics of background credit scoring.'
    }
};

export default function ResourcesPage() {
    const { pathname } = useLocation();
    const data = CONTENT[pathname] || CONTENT['/docs'];

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

                <motion.section
                    className="static-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p style={{ fontSize: '1.2rem' }}>{data.content}</p>
                    <div style={{
                        marginTop: '3rem',
                        padding: '4rem',
                        border: '2px dashed var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        color: 'var(--color-text-muted)'
                    }}>
                        {data.title} repository is coming soon. Stay tuned for updates!
                    </div>
                </motion.section>
            </div>
            <Footer />
        </div>
    );
}
