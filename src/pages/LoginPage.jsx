import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';
import './LoginPage.css';
import { bankLogin } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const premiumTransition = {
    duration: 1.4,
    ease: [0.16, 1, 0.3, 1]
};

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: premiumTransition
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function LoginPage() {
    const [bankId, setBankId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useAuth();

    // Smooth reveal for brand title
    const brandText = "Agri Credit";

    // Navigate after successful login
    useEffect(() => {
        if (loginSuccess && user) {
            console.log('User state updated, navigating now...', user);
            navigate('/lender/dashboard', { replace: true });
        }
    }, [loginSuccess, user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('Starting login with Bank ID:', bankId);
            
            // Bank/Lender login with real API
            const response = await bankLogin(bankId, password);
            console.log('Login response:', response);
            
            if (!response || !response.token) {
                throw new Error('Invalid response from server');
            }

            // Save to auth context (this will update the user state)
            login(response.token, {
                ...response.bank,
                role: 'BANK',
                userType: 'lender'
            });

            console.log('Auth context updated, setting success flag...');
            
            // Set success flag to trigger navigation via useEffect
            setLoginSuccess(true);
            
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-page">
                <div className="login-page__bg" />
                <div className="login-page__overlay" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...premiumTransition, delay: 0.6 }}
                >
                    <Link to="/" className="login-page__back-btn">
                        <ArrowLeft size={18} />
                        <span>Home</span>
                    </Link>
                </motion.div>

                <div className="login-page__content">
                    <motion.div
                        className="login-page__brand-wrap"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.h1 className="login-page__title-brand">
                            {brandText.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                                    variants={{
                                        initial: { opacity: 0, y: 100, rotateX: -90, filter: 'blur(10px)' },
                                        animate: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }
                                    }}
                                    transition={{ ...premiumTransition, delay: i * 0.04 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>

                    <motion.div
                        className="login-card"
                        initial={{ opacity: 0, y: 60, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ ...premiumTransition, delay: 0.4 }}
                    >
                        <motion.div
                            className="login-card__logo-wrap"
                            variants={fadeInUp}
                        >
                            <img src={logo} alt="Logo" className="login-card__logo-img" />
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    className="login-card__error-simple"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="login-card__header"
                            variants={fadeInUp}
                            style={{ 
                                textAlign: 'center', 
                                marginBottom: '2rem',
                                paddingTop: '1rem'
                            }}
                        >
                            <h2 style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: '600',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.5rem'
                            }}>
                                Bank / Lender Login
                            </h2>
                            <p style={{ 
                                fontSize: '0.9rem', 
                                opacity: 0.7 
                            }}>
                                Enterprise access for financial institutions
                            </p>
                        </motion.div>

                        <form onSubmit={handleLogin} className="login-card__glass-form">
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="login-card__form-fields"
                            >
                                <div className="login-card__input-group">
                                    <input
                                        type="text"
                                        placeholder="Bank ID (e.g., BNK1004)"
                                        value={bankId}
                                        onChange={(e) => setBankId(e.target.value)}
                                        required
                                        className="login-card__glass-input"
                                    />
                                </div>

                                <div className="login-card__input-group" style={{ marginTop: '1.5rem' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="login-card__glass-input"
                                    />
                                    <button type="button" className="login-card__glass-eye" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="login-card__glass-submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <motion.span
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    >
                                        Authenticating...
                                    </motion.span>
                                ) : 'Login'}
                            </motion.button>
                        </form>

                        <motion.div
                            className="login-card__glass-footer"
                            variants={fadeInUp}
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '0.5rem', 
                                alignItems: 'center' 
                            }}
                        >
                            <span>Don't have an account? <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Sign up here</Link></span>
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Enterprise access only. All sessions recorded.</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
