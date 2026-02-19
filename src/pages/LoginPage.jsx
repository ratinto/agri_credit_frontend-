import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Phone, Lock, ArrowRight, Users, Shield, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './LoginPage.css';

import { supabase } from '../lib/supabase';

export default function LoginPage() {
    const [userType, setUserType] = useState('farmer');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (userType === 'farmer') {
                // Supabase Phone Auth
                const { error } = await supabase.auth.signInWithOtp({
                    phone: phone.startsWith('+') ? phone : `+91${phone}`,
                });
                if (error) throw error;
                setOtpSent(true);
            } else {
                // Email/Password for Lender/Admin
                setOtpSent(true); // Proceed to password field
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (userType === 'farmer') {
                const { error } = await supabase.auth.verifyOtp({
                    phone: phone.startsWith('+') ? phone : `+91${phone}`,
                    token: otp,
                    type: 'sms'
                });
                if (error) throw error;
                navigate('/farmer/dashboard');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: phone, // Assuming user/email is entered in the same field
                    password: otp,
                });
                if (error) throw error;

                if (userType === 'lender') navigate('/lender/dashboard');
                else navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-wrapper">
            <Navbar />
            <div className="login-page">
                <div className="login-page__bg">
                    <div className="login-page__gradient" />
                    <div className="login-page__pattern" />
                </div>

                <motion.div
                    className="login-card"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <Link to="/" className="login-card__logo">
                        <div className="login-card__logo-icon">
                            <Sprout size={24} />
                        </div>
                        <div>
                            <span className="login-card__brand">AgriCredit</span>
                            <span className="login-card__tagline">Intelligence Platform</span>
                        </div>
                    </Link>

                    <h2 className="login-card__title">Welcome Back</h2>
                    <p className="login-card__desc">Sign in to access your dashboard</p>

                    {error && (
                        <motion.div
                            className="login-card__error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{
                                color: '#E53E3E',
                                backgroundColor: '#FED7D7',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                marginBottom: '1rem',
                                border: '1px solid #FEB2B2'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* User Type Selector */}
                    <div className="login-card__type-selector">
                        {[
                            { value: 'farmer', label: 'Farmer', icon: <Sprout size={16} /> },
                            { value: 'lender', label: 'Lender', icon: <Users size={16} /> },
                            { value: 'admin', label: 'Admin', icon: <Shield size={16} /> },
                        ].map(t => (
                            <button
                                key={t.value}
                                className={`login-card__type-btn ${userType === t.value ? 'login-card__type-btn--active' : ''}`}
                                onClick={() => setUserType(t.value)}
                                disabled={loading}
                            >
                                {t.icon} {t.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={otpSent ? handleLogin : handleSendOtp} className="login-card__form">
                        <div className="login-card__field">
                            <label>
                                <Phone size={16} />
                                {userType === 'farmer' ? 'Mobile Number' : 'Email / Username'}
                            </label>
                            <input
                                type={userType === 'farmer' ? 'tel' : 'text'}
                                placeholder={userType === 'farmer' ? '+91 98765 43210' : 'email@bank.com'}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        {otpSent && (
                            <motion.div
                                className="login-card__field"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <label>
                                    <Lock size={16} />
                                    {userType === 'farmer' ? 'OTP' : 'Password'}
                                </label>
                                <div className="login-card__password-wrap">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={userType === 'farmer' ? '6-digit OTP' : 'Enter password'}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <button type="button" className="login-card__eye" onClick={() => setShowPassword(!showPassword)} disabled={loading}>
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        <button type="submit" className="login-card__submit" disabled={loading}>
                            {loading ? 'Processing...' : (otpSent ? 'Sign In' : (userType === 'farmer' ? 'Send OTP' : 'Continue'))}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    {userType === 'farmer' && !otpSent && (
                        <p className="login-card__new-user">
                            First time? <Link to="/farmer/dashboard">Register as new farmer →</Link>
                        </p>
                    )}

                    <div className="login-card__footer">
                        <p>By signing in, you agree to our <a href="#">Privacy Policy</a> & <a href="#">Terms</a></p>
                        <p className="login-card__consent">🔒 Your data is encrypted and handled with explicit consent</p>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
