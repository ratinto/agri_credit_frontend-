import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsOpen(false); // Close mobile menu
            setActiveDropdown(null); // Close any open dropdown
        });
    }, [location]);

    const navItems = [
        { name: 'Home', path: '/' },
        {
            name: 'Platform',
            children: [
                { name: 'For Lenders', path: '/lender/dashboard', desc: 'Bank/NBFC dashboard' },
                { name: 'Admin Panel', path: '/admin/dashboard', desc: 'Platform governance' },
            ],
        },
        { name: 'Features', path: '/features' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container">
                <Link to="/" className="navbar__logo">
                    <div className="navbar__logo-icon">
                        <img src={logo} alt="AgriCredit logo" className="navbar__logo-image" />
                    </div>
                    <div className="navbar__logo-text">
                        <span className="navbar__brand">AgriCredit</span>
                        <span className="navbar__tagline">Intelligence Platform</span>
                    </div>
                </Link>

                <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
                    {navItems.map((item) => (
                        <div
                            key={item.name}
                            className="navbar__item"
                            onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            {item.children ? (
                                <>
                                    <button
                                        className="navbar__link navbar__link--dropdown"
                                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                    >
                                        {item.name}
                                        <ChevronDown size={16} className={`navbar__chevron ${activeDropdown === item.name ? 'navbar__chevron--open' : ''}`} />
                                    </button>
                                    <div className={`navbar__dropdown ${activeDropdown === item.name ? 'navbar__dropdown--open' : ''}`}>
                                        {item.children.map((child) => (
                                            <Link key={child.name} to={child.path} className="navbar__dropdown-item">
                                                <span className="navbar__dropdown-name">{child.name}</span>
                                                <span className="navbar__dropdown-desc">{child.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={item.path}
                                    className={`navbar__link ${location.pathname === item.path ? 'navbar__link--active' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}

                    <div className="navbar__actions navbar__actions--mobile">
                        <Link to="/login" className="navbar__btn navbar__btn--secondary">Log In</Link>
                        <Link to="/farmer/dashboard" className="navbar__btn navbar__btn--primary">Get Started</Link>
                    </div>
                </div>

                <div className="navbar__actions navbar__actions--desktop">
                    <Link to="/login" className="navbar__btn navbar__btn--secondary">Log In</Link>
                    <Link to="/lender/dashboard" className="navbar__btn navbar__btn--primary">Get Started</Link>
                </div>

                <button
                    className="navbar__toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
