import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__main">
                    <div className="footer__hero">
                        <span className="footer__eyebrow">AGRICREDIT</span>
                        <h2 className="footer__headline">
                            Blossoms that<br />
                            flourish with <span>joy</span><br />
                            and warmth
                        </h2>
                    </div>

                    <div className="footer__columns">
                        <div className="footer__column">
                            <h4 className="footer__column-title">Explore</h4>
                            <Link to="/about" className="footer__link">Our Story</Link>
                            <Link to="/features" className="footer__link">
                                Platform Gallery <ArrowUpRight size={14} />
                            </Link>
                            <Link to="/resources" className="footer__link">Resources</Link>
                            <Link to="/events" className="footer__link">Events</Link>
                        </div>

                        <div className="footer__column">
                            <h4 className="footer__column-title">Support</h4>
                            <Link to="/contact" className="footer__link">Contact</Link>
                            <Link to="/faqs" className="footer__link">FAQs</Link>
                            <Link to="/shipping" className="footer__link">Implementation</Link>
                            <Link to="/refund" className="footer__link">Refund Policy</Link>
                        </div>

                        <div className="footer__column">
                            <h4 className="footer__column-title">Quick Links</h4>
                            <a href="#" className="footer__link">@ Instagram</a>
                            <a href="#" className="footer__link">f Facebook</a>
                            <a href="#" className="footer__link">M Medium</a>
                            <a href="#" className="footer__link">P Pinterest</a>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>Design by AgriCredit. © 2025. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
