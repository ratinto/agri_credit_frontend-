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
    farmerProfile as mockProfile, agriTrustScore as mockTrustScore,
    currentCrops as mockCrops, weatherData as mockWeather,
    loanEligibility as mockLoanEligibility, marketPrices as mockMarketPrices,
    satelliteData, cropHistory as mockHistory, navLinks
} from '../data/mockData';
import API_BASE_URL from '../lib/api';
import { getTrustScore } from '../services/trustScoreService';
import { getLoanOffers } from '../services/loanService';
import { getFarmsByFarmer } from '../services/farmService';
import { getCropsByFarm } from '../services/cropService';
import { fetchWeather, fetchMarketPrice } from '../services/validationService';
import { getUserData } from '../services/authService';
import './FarmerDashboard.css';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function FarmerDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [profile, setProfile] = useState(mockProfile);
    const [trustScore, setTrustScore] = useState(mockTrustScore);
    const [loanOffers, setLoanOffers] = useState(mockLoanEligibility);
    const [crops, setCrops] = useState(mockCrops);
    const [weather, setWeather] = useState(mockWeather);
    const [marketPrice, setMarketPrice] = useState(mockMarketPrices[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // Get farmer ID from auth context
                const userData = getUserData();
                const farmer_id = userData?.farmer_id || userData?.id;

                if (!farmer_id) {
                    console.warn('No farmer ID found, using mock data');
                    setLoading(false);
                    return;
                }

                // Fetch farmer profile
                const farmerResponse = await axios.get(`${API_BASE_URL}/api/farmers/${farmer_id}`);
                if (farmerResponse.data) {
                    const data = farmerResponse.data;
                    setProfile({
                        name: data.name || mockProfile.name,
                        village: data.village || mockProfile.village,
                        district: data.district || mockProfile.district,
                        state: data.state || mockProfile.state,
                        id: farmer_id,
                        phone: data.phone || mockProfile.phone,
                        profileCompletion: data.profile_completion || 75,
                        kycVerified: data.kyc_verified || false,
                        familyMembers: data.family_members || mockProfile.familyMembers,
                        bankAccount: data.bank_account || mockProfile.bankAccount,
                        ownershipType: data.ownership_type || mockProfile.ownershipType,
                        registeredDate: data.created_at || mockProfile.registeredDate
                    });
                }

                // Fetch trust score
                try {
                    const trustScoreResponse = await getTrustScore(farmer_id);
                    if (trustScoreResponse.success && trustScoreResponse.data) {
                        const ts = trustScoreResponse.data;
                        setTrustScore({
                            overall: ts.overall_score || ts.trust_score || mockTrustScore.overall,
                            grade: ts.grade || mockTrustScore.grade,
                            riskCategory: ts.risk_category || ts.risk_level?.split(' ')[0] || mockTrustScore.riskCategory,
                            breakdown: ts.breakdown || mockTrustScore.breakdown
                        });
                    }
                } catch (err) {
                    console.warn('Trust score not available:', err.message);
                }

                // Fetch loan offers
                try {
                    const loanResponse = await getLoanOffers(farmer_id);
                    if (loanResponse.success && loanResponse.data) {
                        const offers = loanResponse.data.offers || [];
                        if (offers.length > 0) {
                            const bestOffer = offers[0];
                            setLoanOffers({
                                eligible: true,
                                recommendedAmount: bestOffer.max_loan_amount || mockLoanEligibility.recommendedAmount,
                                interestRange: {
                                    min: bestOffer.min_interest_rate || mockLoanEligibility.interestRange.min,
                                    max: bestOffer.max_interest_rate || mockLoanEligibility.interestRange.max
                                },
                                maxTenure: bestOffer.max_tenure_months || mockLoanEligibility.maxTenure,
                                availableLenders: offers.length
                            });
                        }
                    }
                } catch (err) {
                    console.warn('Loan offers not available:', err.message);
                }

                // Fetch farms and crops
                try {
                    const farmsResponse = await getFarmsByFarmer(farmer_id);
                    if (farmsResponse.success && farmsResponse.data) {
                        const farms = farmsResponse.data;

                        // Fetch crops for all farms
                        const allCrops = [];
                        for (const farm of farms) {
                            try {
                                const cropsResponse = await getCropsByFarm(farm.farm_id);
                                if (cropsResponse.success && cropsResponse.data) {
                                    allCrops.push(...cropsResponse.data);
                                }
                            } catch (err) {
                                console.warn(`Crops not available for farm ${farm.farm_id}`);
                            }
                        }

                        if (allCrops.length > 0) {
                            setCrops(allCrops.slice(0, 3).map(crop => ({
                                name: crop.crop_type,
                                area: `${crop.sowing_area_acres} acres`,
                                status: crop.status || 'Growing',
                                health: 'Healthy', // Can be enhanced with NDVI data
                                daysToHarvest: crop.expected_harvest_date ?
                                    Math.ceil((new Date(crop.expected_harvest_date) - new Date()) / (1000 * 60 * 60 * 24)) :
                                    null
                            })));

                            // Fetch weather for first farm
                            if (farms[0]) {
                                try {
                                    const weatherResponse = await fetchWeather(farms[0].farm_id);
                                    if (weatherResponse.success && weatherResponse.data) {
                                        const wd = weatherResponse.data;
                                        setWeather({
                                            current: {
                                                temperature: wd.current_temperature || mockWeather.current.temperature,
                                                condition: wd.weather_condition || mockWeather.current.condition,
                                                humidity: wd.humidity || mockWeather.current.humidity,
                                                windSpeed: wd.wind_speed || mockWeather.current.windSpeed
                                            },
                                            forecast: wd.forecast || mockWeather.forecast
                                        });
                                    }
                                } catch (err) {
                                    console.warn('Weather data not available:', err.message);
                                }
                            }

                            // Fetch market price for first crop
                            if (allCrops[0]) {
                                try {
                                    const priceResponse = await fetchMarketPrice(allCrops[0].crop_type);
                                    if (priceResponse.success && priceResponse.data) {
                                        const mp = priceResponse.data;
                                        setMarketPrice({
                                            crop: allCrops[0].crop_type,
                                            price: mp.current_price || mockMarketPrices[0].price,
                                            trend: mp.trend || mockMarketPrices[0].trend,
                                            change: mp.price_change || mockMarketPrices[0].change
                                        });
                                    }
                                } catch (err) {
                                    console.warn('Market price not available:', err.message);
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.warn('Farm/crop data not available:', err.message);
                }

            } catch (err) {
                console.error('Error loading dashboard data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <DashboardLayout links={navLinks.farmer} userType="farmer" userName={profile.name}>
                <div className="farmer-dash" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p>Loading dashboard data...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout links={navLinks.farmer} userType="farmer" userName={profile.name}>
            <div className="farmer-dash">
                {error && (
                    <motion.div
                        className="farmer-dash__error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            padding: '1rem',
                            marginBottom: '1rem',
                            backgroundColor: '#fee',
                            borderRadius: '8px',
                            color: '#c00'
                        }}
                    >
                        <AlertTriangle size={16} style={{ marginRight: '0.5rem' }} />
                        Some data could not be loaded. Showing available information.
                    </motion.div>
                )}

                {/* Header */}
                <motion.div
                    className="farmer-dash__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="farmer-dash__welcome">
                        <h1>Welcome back, <span className="text-posh">{profile.name.split(' ')[0]}</span> 👋</h1>
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
                                <span className="stat-card__value">₹{(loanOffers.recommendedAmount / 1000).toFixed(0)}K</span>
                                <span className="stat-card__sub">@ {loanOffers.interestRange.min}% p.a.</span>
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
                                <span className="stat-card__value">{weather.current.temperature}°C</span>
                                <span className="stat-card__sub">{weather.current.condition}</span>
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
                                <span className="stat-card__value">{crops.length}</span>
                                <span className="stat-card__sub">{crops.map(c => c.name).join(', ')}</span>
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
                                            <stop offset="0%" stopColor="var(--color-evergreen)" />
                                            <stop offset="100%" stopColor="var(--color-moss)" />
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
                            {crops.map((crop, i) => (
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
                                    <span>Humidity: {weather.current.humidity}%</span>
                                </div>
                                <div className="weather-widget__detail">
                                    <CloudSun size={16} />
                                    <span>Season Rain: {mockWeather.season.totalRainfall}mm</span>
                                </div>
                                <div className="weather-widget__detail">
                                    <BarChart3 size={16} />
                                    <span>NDVI: {satelliteData.ndvi.current} ({satelliteData.ndvi.classification})</span>
                                </div>
                            </div>

                            {mockWeather.alerts.map((alert, i) => (
                                <div key={i} className="weather-widget__alert">
                                    <AlertTriangle size={14} />
                                    <span>{alert.message}</span>
                                </div>
                            ))}

                            <div className="weather-widget__forecast">
                                {weather.forecast.map((f, i) => (
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
                            {mockMarketPrices.slice(0, 4).map((mp, i) => (
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
                                <span className="loan-card__value">₹{loanOffers.recommendedAmount.toLocaleString()}</span>
                            </div>
                            <div className="loan-card__details">
                                <div className="loan-card__detail">
                                    <span>Interest Rate</span>
                                    <strong>{loanOffers.interestRange.min}% - {loanOffers.interestRange.max}%</strong>
                                </div>
                                <div className="loan-card__detail">
                                    <span>Tenure</span>
                                    <strong>{loanOffers.maxTenure} months</strong>
                                </div>
                                <div className="loan-card__detail">
                                    <span>Lenders</span>
                                    <strong>{loanOffers.availableLenders || 0} available</strong>
                                </div>
                            </div>
                            {loanOffers.microLoanAvailable && (
                                <div className="loan-card__micro">
                                    <Star size={14} />
                                    <span>Micro-loan up to ₹{loanOffers.microLoanMax.toLocaleString()} available</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* NEW: Yield Analytics & Community Benchmarking */}
                    <YieldAnalyticsCard history={mockHistory} />
                    <CommunityBenchmarkingCard profile={profile} />
                </div>
            </div>
        </DashboardLayout>
    );
}

// ----- ADDITIONAL ANALYTICS COMPONENTS -----

function YieldAnalyticsCard({ history }) {
    return (
        <motion.div
            className="dash-card dash-card--analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
        >
            <div className="dash-card__header">
                <h3>Yield Performance Review</h3>
                <span className="badge-posh">Historical</span>
            </div>
            <div className="yield-trend">
                <div className="yield-chart">
                    {history.map((season, i) => (
                        <div key={i} className="yield-column">
                            <div className="yield-bars">
                                {season.crops.map((crop, j) => (
                                    <motion.div
                                        key={j}
                                        className="yield-bar"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(crop.yield / 60) * 100}%` }}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                        style={{ backgroundColor: j % 2 === 0 ? 'var(--color-evergreen)' : 'var(--color-moss)' }}
                                    >
                                        <span className="yield-val">{crop.yield}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <span className="yield-label">{season.season.split(' ')[0]}</span>
                        </div>
                    ))}
                </div>
                <div className="yield-stats-mini">
                    <div className="y-stat">
                        <span className="y-label">Avg Yield</span>
                        <span className="y-val">48.5 Qtl / Acre</span>
                    </div>
                    <div className="y-stat">
                        <span className="y-label">Area Growth</span>
                        <span className="y-val text-success">+12% YoY</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CommunityBenchmarkingCard({ profile }) {
    return (
        <motion.div
            className="dash-card dash-card--community"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
        >
            <div className="dash-card__header">
                <h3>Village Benchmark</h3>
                <span className="text-muted text-xs">{profile.village} Region</span>
            </div>
            <div className="benchmark-content">
                <div className="benchmark-metric">
                    <div className="b-top">
                        <span className="b-label">Your Efficiency Rank</span>
                        <span className="b-rank">Top 15%</span>
                    </div>
                    <div className="b-gauge">
                        <div className="b-gauge-fill" style={{ width: '85%' }} />
                        <span className="b-marker" style={{ left: '70%' }}>Village Avg</span>
                    </div>
                </div>
                <div className="benchmark-grid">
                    <div className="b-item">
                        <Droplets size={16} className="text-info" />
                        <div>
                            <span className="b-item-label">Water Usage</span>
                            <span className="b-item-val">-8% (Smart)</span>
                        </div>
                    </div>
                    <div className="b-item">
                        <Activity size={16} className="text-success" />
                        <div>
                            <span className="b-item-label">Output Value</span>
                            <span className="b-item-val">+₹14k / Acre</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="benchmark-footer">
                <p>Based on 1.2k regional profiles in {profile.district}</p>
            </div>
        </motion.div>
    );
}
