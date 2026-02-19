import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wave">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,0 L0,0 Z" fill="var(--color-bg)" />
                </svg>
            </div>

            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <div className="footer__logo-icon">
                                <Sprout size={22} />
                            </div>
                            <div>
                                <span className="footer__logo-name">AgriCredit</span>
                                <span className="footer__logo-tag">Intelligence Platform</span>
                            </div>
                        </Link>
                        <p className="footer__desc">
                            Empowering rural India with AI-driven agricultural credit scoring.
                            Making financial inclusion a reality for every farmer.
                        </p>
                        <div className="footer__contact-items">
                            <a href="mailto:support@agricredit.in" className="footer__contact-item">
                                <Mail size={16} /> support@agricredit.in
                            </a>
                            <a href="tel:+911800AGRI" className="footer__contact-item">
                                <Phone size={16} /> 1800-AGRI-HELP
                            </a>
                            <span className="footer__contact-item">
                                <MapPin size={16} /> New Delhi, India
                            </span>
                        </div>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Platform</h4>

                        <Link to="/lender/dashboard" className="footer__link">
                            Lender Dashboard <ArrowUpRight size={14} />
                        </Link>
                        <Link to="/admin/dashboard" className="footer__link">
                            Admin Panel <ArrowUpRight size={14} />
                        </Link>
                        <Link to="/features" className="footer__link">
                            Features <ArrowUpRight size={14} />
                        </Link>
                        <Link to="/how-it-works" className="footer__link">
                            How It Works <ArrowUpRight size={14} />
                        </Link>
                        <Link to="/about" className="footer__link">
                            About Us <ArrowUpRight size={14} />
                        </Link>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Resources</h4>
                        <Link to="/docs" className="footer__link">Documentation</Link>
                        <Link to="/api" className="footer__link">API Reference</Link>
                        <Link to="/case-studies" className="footer__link">Case Studies</Link>
                        <Link to="/research" className="footer__link">Research Papers</Link>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Legal & Ethics</h4>
                        <Link to="/privacy" className="footer__link">Privacy Policy</Link>
                        <Link to="/terms" className="footer__link">Terms of Service</Link>
                        <Link to="/data-consent" className="footer__link">Data Consent Policy</Link>
                        <Link to="/ethics" className="footer__link">AI Ethics Framework</Link>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2025 AgriCredit Intelligence Platform. Built for Indian Agriculture.</p>
                    <div className="footer__badges">
                        <span className="footer__badge">🔒 SOC 2 Compliant</span>
                        <span className="footer__badge">🌱 NABARD Aligned</span>
                        <span className="footer__badge">🤖 Ethical AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
