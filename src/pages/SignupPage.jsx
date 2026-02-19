import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import logo from '../assets/logo.png';
import './LoginPage.css';
import { bankRegister } from '../services/authService';

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

export default function SignupPage() {
    const [formData, setFormData] = useState({
        bank_name: '',
        contact_person: '',
        email: '',
        password: '',
        confirmPassword: '',
        license_number: '',
        bank_type: 'NBFC'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [registeredBankId, setRegisteredBankId] = useState('');
    const navigate = useNavigate();

    const brandText = "Agri Credit";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(null); // Clear error on input change
    };

    const validateForm = () => {
        if (!formData.bank_name || !formData.contact_person || !formData.email || 
            !formData.password || !formData.confirmPassword || !formData.license_number) {
            setError('All fields are required');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Password validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { confirmPassword, ...registrationData } = formData;
            const response = await bankRegister(registrationData);
            
            if (response.success) {
                setSuccess(true);
                setRegisteredBankId(response.data.bank_id);
                
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="login-wrapper">
                <div className="login-page">
                    <div className="login-page__bg" />
                    <div className="login-page__overlay" />

                    <div className="login-page__content">
                        <motion.div
                            className="login-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={premiumTransition}
                        >
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                >
                                    <CheckCircle size={80} color="#22c55e" strokeWidth={2} />
                                </motion.div>
                                <motion.h2
                                    style={{ color: '#fff', marginTop: '1.5rem', fontSize: '1.8rem' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Registration Successful!
                                </motion.h2>
                                <motion.p
                                    style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', fontSize: '1.1rem' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Your Bank ID is: <strong style={{ color: '#22c55e' }}>{registeredBankId}</strong>
                                </motion.p>
                                <motion.p
                                    style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    Please save this ID for login. Redirecting to login page...
                                </motion.p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

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

                        <form onSubmit={handleSignup} className="login-card__glass-form">
                            <div className="login-card__form-fields">
                                <div className="login-card__input-group">
                                    <input
                                        type="text"
                                        name="bank_name"
                                        placeholder="Bank/Institution Name"
                                        className="login-card__glass-input"
                                        value={formData.bank_name}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="login-card__input-group" style={{ marginTop: '1rem' }}>
                                    <input
                                        type="text"
                                        name="contact_person"
                                        placeholder="Contact Person Name"
                                        className="login-card__glass-input"
                                        value={formData.contact_person}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="login-card__input-group" style={{ marginTop: '1rem' }}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        className="login-card__glass-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="login-card__input-group" style={{ marginTop: '1rem' }}>
                                    <input
                                        type="text"
                                        name="license_number"
                                        placeholder="License Number"
                                        className="login-card__glass-input"
                                        value={formData.license_number}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="login-card__input-group" style={{ marginTop: '1rem' }}>
                                    <select
                                        name="bank_type"
                                        className="login-card__glass-input"
                                        value={formData.bank_type}
                                        onChange={handleChange}
                                        disabled={loading}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <option value="NBFC">NBFC</option>
                                        <option value="Commercial Bank">Commercial Bank</option>
                                        <option value="Cooperative Bank">Cooperative Bank</option>
                                        <option value="Microfinance">Microfinance Institution</option>
                                        <option value="Regional Bank">Regional Bank</option>
                                    </select>
                                </div>

                                <div className="login-card__input-group" style={{ marginTop: '1rem' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password (min 8 characters)"
                                        className="login-card__glass-input"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="login-card__glass-eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                <div className="login-card__input-group" style={{ marginTop: '1rem' }}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="login-card__glass-input"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="login-card__glass-eye"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

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
                                        Creating Account...
                                    </motion.span>
                                ) : 'Register Bank'}
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
                            <span>Already have an account? <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Login here</Link></span>
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Enterprise access only. All sessions recorded.</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
