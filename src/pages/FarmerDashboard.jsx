import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
    CloudSun, TrendingUp, Shield, Wallet, Sprout, Bell,
    ArrowUpRight, ArrowDownRight, AlertTriangle, Eye,
    MapPin, Calendar, Droplets, Thermometer, ChevronRight,
    Star, Info, BarChart3
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout';
import {
    farmerProfile, agriTrustScore, currentCrops, weatherData,
    loanEligibility, marketPrices, satelliteData, navLinks
} from '../data/mockData';
import './FarmerDashboard.css';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function FarmerDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [profile, setProfile] = useState(farmerProfile);
    const [trustScore, setTrustScore] = useState(agriTrustScore);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/farmers');
                if (response.data && response.data.length > 0) {
                    const data = response.data[0];
                    setProfile(prev => ({
                        ...prev,
                        name: data.name,
                        village: data.village,
                        district: data.district,
                        id: `F-${data.phone.slice(-4)}`,
                        profileCompletion: data.profile_completion
                    }));
                    setTrustScore(prev => ({
                        ...prev,
                        overall: data.trust_score,
                        riskCategory: data.risk_level.split(' ')[0]
                    }));
                }
            } catch (err) {
                console.warn('Backend offline, using mock data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <DashboardLayout links={navLinks.farmer} userType="farmer" userName={profile.name}>
            <div className="farmer-dash">
                {/* Header */}
                <motion.div
                    className="farmer-dash__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="farmer-dash__welcome">
                        <h1>Welcome back, <span className="text-gradient">{profile.name.split(' ')[0]}</span> 👋</h1>
                        <p className="farmer-dash__subtitle">
                            <MapPin size={14} /> {profile.village}, {profile.district} ·
                            ID: {profile.id}
                        </p>
                    </div>
                    <div className="farmer-dash__header-actions">
                        <button className="farmer-dash__notification">
                            <Bell size={20} />
                            <span className="farmer-dash__notif-badge">3</span>
                        </button>
                    </div>
                </motion.div>

                {/* Profile Completion */}
                {profile.profileCompletion < 100 && (
                    <motion.div
                        className="farmer-dash__completion"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="farmer-dash__completion-info">
                            <Info size={18} />
                            <div>
                                <strong>Complete your profile</strong>
                                <span> — Add remaining details to improve your Trust Score</span>
                            </div>
                        </div>
                        <div className="farmer-dash__completion-bar-wrap">
                            <div className="farmer-dash__completion-bar">
                                <div
                                    className="farmer-dash__completion-fill"
                                    style={{ width: `${profile.profileCompletion}%` }}
                                />
                            </div>
                            <span className="farmer-dash__completion-pct">{profile.profileCompletion}%</span>
                        </div>
                    </motion.div>
                )}

                {/* Quick Stats */}
                <motion.div
                    className="farmer-dash__stats"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.div className="stat-card stat-card--score" variants={fadeIn} transition={{ duration: 0.4 }}>
                        <div className="stat-card__icon-wrap stat-card__icon-wrap--green">
                            <Shield size={22} />
                        </div>
                        <div className="stat-card__content">
                            <span className="stat-card__label">Agri-Trust Score</span>
                            <div className="stat-card__value-row">
                                <span className="stat-card__value">{trustScore.overall}</span>
                                <span className="stat-card__grade">{trustScore.grade}</span>
                                <span className="stat-card__trend stat-card__trend--up">
                                    <ArrowUpRight size={14} /> +3
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="stat-card" variants={fadeIn} transition={{ duration: 0.4 }}>
                        <div className="stat-card__icon-wrap stat-card__icon-wrap--gold">
                            <Wallet size={22} />
                        </div>
                        <div className="stat-card__content">
                            <span className="stat-card__label">Loan Eligible</span>
                            <div className="stat-card__value-row">
                                <span className="stat-card__value">₹{(loanEligibility.recommendedAmount / 1000).toFixed(0)}K</span>
                                <span className="stat-card__sub">@ {loanEligibility.interestRange.min}% p.a.</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="stat-card" variants={fadeIn} transition={{ duration: 0.4 }}>
                        <div className="stat-card__icon-wrap stat-card__icon-wrap--blue">
                            <CloudSun size={22} />
                        </div>
                        <div className="stat-card__content">
                            <span className="stat-card__label">Weather</span>
                            <div className="stat-card__value-row">
                                <span className="stat-card__value">{weatherData.current.temperature}°C</span>
                                <span className="stat-card__sub">{weatherData.current.condition}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="stat-card" variants={fadeIn} transition={{ duration: 0.4 }}>
                        <div className="stat-card__icon-wrap stat-card__icon-wrap--teal">
                            <Sprout size={22} />
                        </div>
                        <div className="stat-card__content">
                            <span className="stat-card__label">Active Crops</span>
                            <div className="stat-card__value-row">
                                <span className="stat-card__value">{currentCrops.length}</span>
                                <span className="stat-card__sub">{currentCrops.map(c => c.name).join(', ')}</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Main Grid */}
                <div className="farmer-dash__grid">
                    {/* Agri-Trust Score Card */}
                    <motion.div
                        className="dash-card dash-card--score"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="dash-card__header">
                            <h3>Agri-Trust Score</h3>
                            <Link to="/farmer/score" className="dash-card__link">
                                Details <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="score-display">
                            <div className="score-display__circle">
                                <svg viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="10" />
                                    <circle
                                        cx="60" cy="60" r="52"
                                        fill="none"
                                        stroke="url(#dashScoreGrad)"
                                        strokeWidth="10"
                                        strokeDasharray="327"
                                        strokeDashoffset={327 - (327 * trustScore.overall / 100)}
                                        strokeLinecap="round"
                                        transform="rotate(-90 60 60)"
                                        className="score-display__progress"
                                    />
                                    <defs>
                                        <linearGradient id="dashScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#2D6A4F" />
                                            <stop offset="100%" stopColor="#D4A017" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="score-display__inner">
                                    <span className="score-display__number">{trustScore.overall}</span>
                                    <span className="score-display__grade">{trustScore.grade}</span>
                                </div>
                            </div>

                            <div className="score-display__details">
                                <div className="score-display__risk">
                                    <span className="score-display__risk-dot" style={{ background: '#38A169' }} />
                                    {trustScore.riskCategory} Risk
                                </div>
                                <div className="score-display__history">
                                    {trustScore.history.map((h, i) => (
                                        <div key={i} className="score-display__history-item">
                                            <span className="score-display__history-season">{h.season.split(' ')[0]}</span>
                                            <div className="score-display__history-bar">
                                                <div
                                                    className="score-display__history-fill"
                                                    style={{ height: `${h.score}%` }}
                                                />
                                            </div>
                                            <span className="score-display__history-score">{h.score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Score Explanations */}
                        <div className="score-explanations">
                            {trustScore.explanations.slice(0, 3).map((e, i) => (
                                <div key={i} className={`score-explanation score-explanation--${e.type}`}>
                                    <span className="score-explanation__icon">
                                        {e.type === 'positive' ? '✅' : e.type === 'negative' ? '⚠️' : 'ℹ️'}
                                    </span>
                                    <span>{e.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Current Crops */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="dash-card__header">
                            <h3>Current Crops</h3>
                            <Link to="/farmer/crops" className="dash-card__link">
                                Manage <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="crop-cards">
                            {currentCrops.map((crop, i) => (
                                <div key={i} className="crop-card">
                                    <div className="crop-card__header">
                                        <span className="crop-card__name">{crop.name}</span>
                                        <span className={`crop-card__health crop-card__health--${crop.health.toLowerCase()}`}>
                                            {crop.health}
                                        </span>
                                    </div>
                                    <div className="crop-card__details">
                                        <div className="crop-card__detail">
                                            <span className="crop-card__detail-label">Area</span>
                                            <span>{crop.area} acres</span>
                                        </div>
                                        <div className="crop-card__detail">
                                            <span className="crop-card__detail-label">Stage</span>
                                            <span>{crop.stage}</span>
                                        </div>
                                        <div className="crop-card__detail">
                                            <span className="crop-card__detail-label">NDVI</span>
                                            <span>{crop.ndvi}</span>
                                        </div>
                                        <div className="crop-card__detail">
                                            <span className="crop-card__detail-label">Harvest</span>
                                            <span>{new Date(crop.expectedHarvest).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                    <div className="crop-card__ndvi-bar">
                                        <div className="crop-card__ndvi-fill" style={{ width: `${crop.ndvi * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Weather Widget */}
                    <motion.div
                        className="dash-card dash-card--weather"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="dash-card__header">
                            <h3>Weather & Satellite</h3>
                            <Link to="/farmer/weather" className="dash-card__link">
                                Details <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="weather-widget">
                            <div className="weather-widget__main">
                                <div className="weather-widget__temp">
                                    <Thermometer size={20} />
                                    <span className="weather-widget__temp-value">{weatherData.current.temperature}°C</span>
                                </div>
                                <span className="weather-widget__condition">{weatherData.current.condition}</span>
                            </div>

                            <div className="weather-widget__details">
                                <div className="weather-widget__detail">
                                    <Droplets size={16} />
                                    <span>Humidity: {weatherData.current.humidity}%</span>
                                </div>
                                <div className="weather-widget__detail">
                                    <CloudSun size={16} />
                                    <span>Season Rain: {weatherData.season.totalRainfall}mm</span>
                                </div>
                                <div className="weather-widget__detail">
                                    <BarChart3 size={16} />
                                    <span>NDVI: {satelliteData.ndvi.current} ({satelliteData.ndvi.classification})</span>
                                </div>
                            </div>

                            {weatherData.alerts.map((alert, i) => (
                                <div key={i} className="weather-widget__alert">
                                    <AlertTriangle size={14} />
                                    <span>{alert.message}</span>
                                </div>
                            ))}

                            <div className="weather-widget__forecast">
                                {weatherData.forecast.map((f, i) => (
                                    <div key={i} className="weather-widget__forecast-day">
                                        <span className="weather-widget__forecast-label">{f.day}</span>
                                        <span className="weather-widget__forecast-temp">{f.temp}°</span>
                                        {f.rain > 0 && <Droplets size={12} className="weather-widget__rain-icon" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Market Prices */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="dash-card__header">
                            <h3>Market Prices (Mandi)</h3>
                            <Link to="/farmer/market" className="dash-card__link">
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="market-table">
                            <div className="market-table__header">
                                <span>Crop</span>
                                <span>MSP</span>
                                <span>Mandi</span>
                                <span>Trend</span>
                            </div>
                            {marketPrices.slice(0, 4).map((mp, i) => (
                                <div key={i} className="market-table__row">
                                    <span className="market-table__crop">{mp.crop}</span>
                                    <span>₹{mp.msp}</span>
                                    <span className="market-table__mandi">₹{mp.mandi}</span>
                                    <span className={`market-table__trend market-table__trend--${mp.trend}`}>
                                        {mp.trend === 'up' ? <ArrowUpRight size={14} /> : mp.trend === 'down' ? <ArrowDownRight size={14} /> : '–'}
                                        {mp.priceChange > 0 ? '+' : ''}{mp.priceChange}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Loan Eligibility */}
                    <motion.div
                        className="dash-card dash-card--loan"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="dash-card__header">
                            <h3>Loan Eligibility</h3>
                            <Link to="/farmer/loans" className="dash-card__link">
                                Details <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="loan-card">
                            <div className="loan-card__amount">
                                <span className="loan-card__label">Recommended Amount</span>
                                <span className="loan-card__value">₹{loanEligibility.recommendedAmount.toLocaleString()}</span>
                            </div>
                            <div className="loan-card__details">
                                <div className="loan-card__detail">
                                    <span>Interest Rate</span>
                                    <strong>{loanEligibility.interestRange.min}% - {loanEligibility.interestRange.max}%</strong>
                                </div>
                                <div className="loan-card__detail">
                                    <span>Tenure</span>
                                    <strong>{loanEligibility.recommendedTenure} months</strong>
                                </div>
                                <div className="loan-card__detail">
                                    <span>Default Prob.</span>
                                    <strong>{loanEligibility.defaultProbability}%</strong>
                                </div>
                            </div>
                            {loanEligibility.microLoanAvailable && (
                                <div className="loan-card__micro">
                                    <Star size={14} />
                                    <span>Micro-loan up to ₹{loanEligibility.microLoanMax.toLocaleString()} available</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
