import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users, TrendingUp, AlertTriangle, Shield, DollarSign,
    Search, Filter, Eye, ChevronRight, ArrowUpRight,
    ArrowDownRight, BarChart3, Brain, Activity, Bell,
    CheckCircle2, XCircle, Clock
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout';
import {
    lenderStats, riskDistribution, farmersList, fraudAlerts,
    mlInsights, navLinks
} from '../data/mockData';
import './LenderDashboard.css';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function LenderDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('All');

    const filteredFarmers = farmersList.filter(f => {
        const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRisk = riskFilter === 'All' || f.risk === riskFilter;
        return matchSearch && matchRisk;
    });

    return (
        <DashboardLayout links={navLinks.lender} userType="lender" userName="SBI Varanasi Branch">
            <div className="lender-dash">
                {/* Header */}
                <motion.div
                    className="lender-dash__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h1>Lender <span className="text-gradient">Dashboard</span></h1>
                        <p className="lender-dash__subtitle">SBI — Varanasi Branch · Agricultural Lending Division</p>
                    </div>
                    <div className="lender-dash__header-actions">
                        <button className="lender-dash__notification">
                            <Bell size={20} />
                            <span className="lender-dash__notif-badge">{fraudAlerts.length}</span>
                        </button>
                    </div>
                </motion.div>

                {/* Key Stats */}
                <motion.div
                    className="lender-dash__stats"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                >
                    {[
                        { icon: <Users size={22} />, label: 'Total Farmers', value: lenderStats.totalFarmers.toLocaleString(), color: '#2D6A4F', sub: `+${lenderStats.monthlyGrowth}% this month` },
                        { icon: <Activity size={22} />, label: 'Active Loans', value: lenderStats.activeLoans.toLocaleString(), color: '#3182CE', sub: `${lenderStats.collectionRate}% collection rate` },
                        { icon: <DollarSign size={22} />, label: 'Total Disbursed', value: `₹${(lenderStats.totalDisbursed / 10000000).toFixed(1)} Cr`, color: '#D4A017', sub: 'Since inception' },
                        { icon: <Shield size={22} />, label: 'Avg Score', value: lenderStats.avgScore, color: '#0D9488', sub: `${lenderStats.defaultRate}% default rate` },
                    ].map((stat, i) => (
                        <motion.div key={i} className="lender-stat" variants={fadeIn} transition={{ duration: 0.4 }}>
                            <div className="lender-stat__icon" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)` }}>
                                {stat.icon}
                            </div>
                            <div>
                                <span className="lender-stat__label">{stat.label}</span>
                                <span className="lender-stat__value">{stat.value}</span>
                                <span className="lender-stat__sub">{stat.sub}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="lender-dash__grid">
                    {/* Risk Distribution */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="dash-card__header">
                            <h3>Risk Distribution</h3>
                            <Link to="/lender/risk" className="dash-card__link">
                                Analysis <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="risk-dist">
                            <div className="risk-dist__bar">
                                {riskDistribution.map((r, i) => (
                                    <div
                                        key={i}
                                        className="risk-dist__segment"
                                        style={{ width: `${r.percentage}%`, background: r.color }}
                                        title={`${r.level}: ${r.percentage}%`}
                                    />
                                ))}
                            </div>
                            <div className="risk-dist__legend">
                                {riskDistribution.map((r, i) => (
                                    <div key={i} className="risk-dist__item">
                                        <span className="risk-dist__dot" style={{ background: r.color }} />
                                        <span className="risk-dist__name">{r.level}</span>
                                        <span className="risk-dist__count">{r.count}</span>
                                        <span className="risk-dist__pct">({r.percentage}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* NPA Info */}
                        <div className="npa-info">
                            <div className="npa-info__item">
                                <span className="npa-info__label">NPA Ratio</span>
                                <span className="npa-info__value">{lenderStats.npaRatio}%</span>
                            </div>
                            <div className="npa-info__item">
                                <span className="npa-info__label">Default Rate</span>
                                <span className="npa-info__value">{lenderStats.defaultRate}%</span>
                            </div>
                            <div className="npa-info__item">
                                <span className="npa-info__label">Collection</span>
                                <span className="npa-info__value" style={{ color: '#38A169' }}>{lenderStats.collectionRate}%</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ML Insights */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="dash-card__header">
                            <h3>ML Model Insights</h3>
                            <Link to="/lender/ml" className="dash-card__link">
                                Details <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="ml-insights">
                            <div className="ml-insights__confidence">
                                <div className="ml-insights__conf-circle">
                                    <svg viewBox="0 0 80 80">
                                        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
                                        <circle cx="40" cy="40" r="34" fill="none" stroke="#2D6A4F" strokeWidth="6"
                                            strokeDasharray="214" strokeDashoffset={214 - (214 * mlInsights.confidenceLevel / 100)}
                                            strokeLinecap="round" transform="rotate(-90 40 40)" />
                                    </svg>
                                    <span className="ml-insights__conf-value">{mlInsights.confidenceLevel}%</span>
                                </div>
                                <div className="ml-insights__conf-info">
                                    <span className="ml-insights__conf-label">Model Confidence</span>
                                    <span className="ml-insights__conf-version">v{mlInsights.modelVersion}</span>
                                </div>
                            </div>

                            <h4 className="ml-insights__title">Top Predictive Features</h4>
                            <div className="ml-insights__features">
                                {mlInsights.topFeatures.map((f, i) => (
                                    <div key={i} className="ml-feature">
                                        <span className="ml-feature__name">{f.name}</span>
                                        <div className="ml-feature__bar">
                                            <div
                                                className="ml-feature__fill"
                                                style={{
                                                    width: `${f.importance * 100}%`,
                                                    background: f.direction === 'positive' ? '#38A169' : f.direction === 'negative' ? '#E53E3E' : '#D69E2E'
                                                }}
                                            />
                                        </div>
                                        <span className="ml-feature__value">{(f.importance * 100).toFixed(0)}%</span>
                                    </div>
                                ))}
                            </div>

                            <div className="ml-insights__metrics">
                                {Object.entries(mlInsights.performanceMetrics).map(([key, value]) => (
                                    <div key={key} className="ml-metric">
                                        <span className="ml-metric__label">{key.replace(/([A-Z])/g, ' $1').replace('f 1', 'F1')}</span>
                                        <span className="ml-metric__value">{value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Fraud Alerts */}
                    <motion.div
                        className="dash-card dash-card--alerts"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="dash-card__header">
                            <h3>⚠️ Fraud Alerts</h3>
                            <Link to="/lender/fraud" className="dash-card__link">
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="fraud-alerts">
                            {fraudAlerts.map((alert, i) => (
                                <div key={i} className={`fraud-alert fraud-alert--${alert.severity.toLowerCase()}`}>
                                    <div className="fraud-alert__header">
                                        <span className="fraud-alert__type">{alert.type}</span>
                                        <span className={`fraud-alert__severity fraud-alert__severity--${alert.severity.toLowerCase()}`}>
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <p className="fraud-alert__message">{alert.message}</p>
                                    <div className="fraud-alert__footer">
                                        <span className="fraud-alert__farmer">{alert.farmerId}</span>
                                        <span className="fraud-alert__date">{alert.date}</span>
                                    </div>
                                    <div className="fraud-alert__actions">
                                        <button className="fraud-alert__btn fraud-alert__btn--review">
                                            <Eye size={14} /> Review
                                        </button>
                                        <button className="fraud-alert__btn fraud-alert__btn--dismiss">
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Farmer Risk Table */}
                    <motion.div
                        className="dash-card dash-card--table"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        style={{ gridColumn: '1 / -1' }}
                    >
                        <div className="dash-card__header">
                            <h3>Farmer Risk Overview</h3>
                            <Link to="/lender/farmers" className="dash-card__link">
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="farmer-table__controls">
                            <div className="farmer-table__search">
                                <Search size={16} />
                                <input
                                    type="text"
                                    placeholder="Search farmer by name or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="farmer-table__filters">
                                {['All', 'Low', 'Medium', 'High'].map(f => (
                                    <button
                                        key={f}
                                        className={`farmer-table__filter ${riskFilter === f ? 'farmer-table__filter--active' : ''}`}
                                        onClick={() => setRiskFilter(f)}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="farmer-table">
                            <div className="farmer-table__header">
                                <span>Farmer ID</span>
                                <span>Name</span>
                                <span>Score</span>
                                <span>Risk</span>
                                <span>District</span>
                                <span>Loan Amt</span>
                                <span>Status</span>
                                <span>Action</span>
                            </div>
                            {filteredFarmers.map((farmer, i) => (
                                <div key={i} className="farmer-table__row">
                                    <span className="farmer-table__id">{farmer.id}</span>
                                    <span className="farmer-table__name">{farmer.name}</span>
                                    <span className="farmer-table__score">
                                        <span className={`score-badge score-badge--${farmer.score >= 70 ? 'high' : farmer.score >= 50 ? 'med' : 'low'}`}>
                                            {farmer.score}
                                        </span>
                                    </span>
                                    <span className={`risk-badge risk-badge--${farmer.risk.toLowerCase()}`}>
                                        {farmer.risk}
                                    </span>
                                    <span>{farmer.district}</span>
                                    <span>₹{farmer.loanAmount.toLocaleString()}</span>
                                    <span className={`status-badge status-badge--${farmer.status.toLowerCase()}`}>
                                        {farmer.status === 'Active' && <CheckCircle2 size={12} />}
                                        {farmer.status === 'Review' && <Clock size={12} />}
                                        {farmer.status === 'Flagged' && <AlertTriangle size={12} />}
                                        {farmer.status}
                                    </span>
                                    <span>
                                        <button className="farmer-table__action">
                                            <Eye size={14} /> View
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
