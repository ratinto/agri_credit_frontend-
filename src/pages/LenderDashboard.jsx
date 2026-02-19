import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, TrendingUp, AlertTriangle, Shield, DollarSign,
    Search, Filter, Eye, ChevronRight, ArrowUpRight,
    ArrowDownRight, BarChart3, Brain, Activity, Bell,
    CheckCircle2, XCircle, Clock, CloudSun, Plus, Download
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout';
import {
    riskDistribution, fraudAlerts,
    mlInsights, navLinks, farmersList,
    regionalRisk, portfolioMonthlyTrends, cropDistribution
} from '../data/mockData';
import {
    getPendingLoanApplications,
    getFarmerProfile,
    approveLoan,
    rejectLoan
} from '../services/bankService';
import { useAuth } from '../context/AuthContext';
import './LenderDashboard.css';

// Animation Variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function LenderDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const [activeTab, setActiveTab] = useState('Dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('All');
    const [showDetail, setShowDetail] = useState(false);
    const [selectedFarmer, setSelectedFarmer] = useState(null);

    // Real data from API
    const [pendingLoans, setPendingLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalApplications: 0,
        avgScore: 0,
        totalDisbursed: 0,
        approvalRate: 0
    });

    // Check authentication
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Fetch pending loans
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getPendingLoanApplications();

                if (response.success) {
                    setPendingLoans(response.data || []);

                    // Calculate stats from loans
                    const loans = response.data || [];
                    const avgScore = loans.length > 0
                        ? loans.reduce((sum, l) => sum + (l.trust_score || 0), 0) / loans.length
                        : 0;

                    setStats({
                        totalApplications: loans.length,
                        avgScore: Math.round(avgScore),
                        totalDisbursed: loans.reduce((sum, l) => sum + parseFloat(l.loan_amount || 0), 0),
                        approvalRate: 91.2 // Mock for now
                    });
                }
            } catch (err) {
                console.error('Error fetching loans:', err);
                setError(err.message || 'Failed to fetch loan applications');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated()) {
            fetchData();
        }
    }, [isAuthenticated]);

    // Sync activeTab with route
    useEffect(() => {
        const path = location.pathname;
        const currentLink = navLinks.lender.find(link => path.includes(link.path));
        if (currentLink) {
            setActiveTab(currentLink.name);
        } else {
            setActiveTab('Dashboard');
        }
    }, [location]);

    // Filter logic for loans (updated to use real data structure)
    const filteredLoans = farmersList.filter(farmer => {
        const searchLower = searchTerm.toLowerCase();
        const matchSearch =
            farmer.name.toLowerCase().includes(searchLower) ||
            farmer.id.toLowerCase().includes(searchLower) ||
            farmer.district.toLowerCase().includes(searchLower);

        const matchRisk = riskFilter === 'All' || farmer.risk === riskFilter;

        return matchSearch && matchRisk;
    });

    const handleViewFarmer = async (farmerObj) => {
        // Try to get full profile from API if possible, otherwise use local data
        const farmerId = farmerObj.farmer_id || farmerObj.id;

        try {
            const response = await getFarmerProfile(farmerId);
            if (response.success) {
                setSelectedFarmer(response.data);
                setShowDetail(true);
            } else {
                // Fallback to local data if response isn't success
                setSelectedFarmer(farmerObj);
                setShowDetail(true);
            }
        } catch (err) {
            console.warn('API fetch failed, falling back to local data:', err);
            // Fallback: Use the data we already have from the list
            setSelectedFarmer(farmerObj);
            setShowDetail(true);
        }
    };

    const bankName = user?.bank_name || 'Bank';
    const contactPerson = user?.contact_person || 'Officer';

    if (loading) {
        return (
            <DashboardLayout links={navLinks.lender} userType="lender" userName={contactPerson}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <p>Loading dashboard...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout links={navLinks.lender} userType="lender" userName={contactPerson}>
            <div className="lender-dash">
                {/* Header */}
                <motion.div
                    className="lender-dash__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h1>Lender <span className="text-posh">Portal</span></h1>
                        <p className="lender-dash__subtitle">{bankName} · Officer: {contactPerson}</p>
                    </div>
                    <div className="lender-dash__header-actions">
                        <div className="lender-dash__time">
                            <Clock size={16} />
                            <span>Last login: Just now</span>
                        </div>
                        <button className="lender-dash__notification" onClick={() => setActiveTab('Fraud & Alerts')}>
                            <Bell size={20} />
                            <span className="lender-dash__notif-badge">{fraudAlerts.length}</span>
                        </button>
                    </div>
                </motion.div>


                <div className="lender-dash__content">
                    {activeTab === 'Dashboard' && <OverviewSection stats={stats} pendingLoans={pendingLoans} setActiveTab={setActiveTab} />}
                    {activeTab === 'Farmers' && (
                        <FarmersSection
                            filteredLoans={filteredLoans}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            riskFilter={riskFilter}
                            setRiskFilter={setRiskFilter}
                            onViewDetail={handleViewFarmer}
                        />
                    )}
                    {activeTab === 'Loan Decisions' && <DecisionsSection pendingLoans={pendingLoans} />}
                    {activeTab === 'Portfolio Analytics' && <AnalyticsSection />}
                    {activeTab === 'Fraud & Alerts' && <AlertsSection />}
                    {activeTab === 'Settings' && <SettingsSection />}
                </div>

                {showDetail && selectedFarmer && (
                    <FarmerDetailModal
                        farmer={selectedFarmer}
                        onClose={() => setShowDetail(false)}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}

// ----- SUB-COMPONENTS -----

function OverviewSection({ stats, pendingLoans, setActiveTab }) {
    return (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* Key Stats */}
            <div className="lender-dash__stats">
                {[
                    { icon: <Users size={22} />, label: 'Pending Applications', value: stats.totalApplications.toString(), trend: 'New', color: '#2D6A4F' },
                    { icon: <Shield size={22} />, label: 'Avg Trust Score', value: stats.avgScore.toString(), trend: 'Good', color: '#0D9488' },
                    { icon: <DollarSign size={22} />, label: 'Total Requested', value: `₹${(stats.totalDisbursed / 100000).toFixed(1)}L`, trend: 'Pending', color: '#D4A017' },
                    { icon: <Activity size={22} />, label: 'Approval Rate', value: `${stats.approvalRate.toFixed(1)}%`, trend: 'High', color: '#3182CE' },
                ].map((stat, i) => (
                    <motion.div key={i} className="lender-stat" variants={fadeIn}>
                        <div className="lender-stat__icon" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)` }}>
                            {stat.icon}
                        </div>
                        <div>
                            <span className="lender-stat__label">{stat.label}</span>
                            <span className="lender-stat__value">{stat.value}</span>
                            <span className="lender-stat__trend text-success">
                                {stat.trend}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="dash-card">
                <div className="dash-card__header">
                    <h3>Agri-Trust Distribution</h3>
                    <Link to="/lender/analytics" className="dash-card__link">
                        Full Report <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="risk-dist-enhanced">
                    {riskDistribution.map((r, i) => (
                        <div key={i} className="risk-dist-row">
                            <div className="risk-dist-info">
                                <span className="risk-label">{r.level}</span>
                                <span className="risk-count">{r.count} Farmers</span>
                            </div>
                            <div className="risk-bar-container">
                                <motion.div
                                    className="risk-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${r.percentage}%` }}
                                    style={{ backgroundColor: r.color }}
                                />
                                <span className="risk-pct">{r.percentage}%</span>
                            </div>
                        </div>
                    ))}
                    <div className="risk-dist-footer">
                        <p className="text-muted text-xs">Based on 12.8k verified profiles</p>
                    </div>
                </div>
            </div>

            <div className="dash-card">
                <div className="dash-card__header">
                    <h3>Top Credit Candidates</h3>
                    <Link to="/lender/farmers" className="dash-card__link">
                        Approve All <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="candidates-list">
                    {farmersList.filter(f => f.score >= 80).slice(0, 4).map((f, i) => (
                        <div key={i} className="candidate-item">
                            <div className="candidate-identity">
                                <span className="candidate-avatar">{f.name.charAt(0)}</span>
                                <div>
                                    <span className="candidate-name">{f.name}</span>
                                    <span className="candidate-meta">{f.district}, {f.landSize}</span>
                                </div>
                            </div>
                            <div className="candidate-score">
                                <span className="score-val">{f.score}</span>
                                <span className="score-label">Trust Score</span>
                            </div>
                            <button className="btn-mini btn-mini--success">Pre-Approve</button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function FarmersSection({ filteredLoans, searchTerm, setSearchTerm, riskFilter, setRiskFilter, onViewDetail }) {
    return (
        <motion.div className="dash-card dash-card--table" initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dash-card__header">
                <h3>Loan Applications</h3>
                <div className="dash-card__actions">
                    <button className="btn-minimal-posh" onClick={() => alert('Exporting Applications CSV...')}><Download size={14} /> Export CSV</button>
                </div>
            </div>

            <div className="farmer-table__controls">
                <div className="farmer-table__search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, ID or district..."
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
                            {f} Risk
                        </button>
                    ))}
                </div>
            </div>

            <div className="farmer-table">
                <div className="farmer-table__header">
                    <span>Loan ID</span>
                    <span>Farmer Name</span>
                    <span>Score</span>
                    <span>Risk Band</span>
                    <span>Amount</span>
                    <span>District</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>
                {filteredLoans.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                        <p>No farmers found</p>
                    </div>
                ) : (
                    filteredLoans.map((farmer, i) => (
                        <div key={i} className="farmer-table__row">
                            <span className="farmer-table__id">{farmer.id}</span>
                            <span className="farmer-table__name">{farmer.name}</span>
                            <span>
                                <span className={`score-badge score-badge--${farmer.score >= 70 ? 'high' : farmer.score >= 50 ? 'med' : 'low'}`}>
                                    {farmer.score}
                                </span>
                            </span>
                            <span>
                                <span className={`risk-badge risk-badge--${farmer.risk.toLowerCase()}`}>
                                    {farmer.risk}
                                </span>
                            </span>
                            <span style={{ fontWeight: 600 }}>₹{farmer.loanAmount.toLocaleString()}</span>
                            <span>{farmer.district}</span>
                            <span>
                                <span className={`status-badge status-badge--${farmer.status.toLowerCase()}`}>
                                    {farmer.status}
                                </span>
                            </span>
                            <span>
                                <button className="btn-text" style={{ padding: '0.4rem' }} onClick={() => onViewDetail(farmer)}>
                                    <Eye size={16} />
                                </button>
                            </span>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
}

function DecisionsSection({ pendingLoans }) {
    const [decisions, setDecisions] = useState({});
    const [processing, setProcessing] = useState(null);

    const handleApprove = async (loan) => {
        setProcessing(loan.loan_id);
        try {
            // Calculate approved amount (90% of requested for demo)
            const approvedAmount = parseFloat(loan.loan_amount) * 0.9;
            const interestRate = 8; // Default 8%
            const tenureMonths = 12; // Default 12 months

            await approveLoan({
                loan_id: loan.loan_id,
                approved_amount: approvedAmount,
                interest_rate: interestRate,
                tenure_months: tenureMonths
            });

            setDecisions(prev => ({ ...prev, [loan.loan_id]: 'Approved' }));
            alert(`Loan ${loan.loan_id} approved for ₹${approvedAmount.toLocaleString()}`);
        } catch (err) {
            console.error('Approve error:', err);
            alert('Failed to approve loan: ' + (err.message || 'Unknown error'));
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async (loan) => {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;

        setProcessing(loan.loan_id);
        try {
            await rejectLoan({
                loan_id: loan.loan_id,
                rejection_reason: reason
            });

            setDecisions(prev => ({ ...prev, [loan.loan_id]: 'Rejected' }));
            alert(`Loan ${loan.loan_id} rejected`);
        } catch (err) {
            console.error('Reject error:', err);
            alert('Failed to reject loan: ' + (err.message || 'Unknown error'));
        } finally {
            setProcessing(null);
        }
    };

    return (
        <motion.div className="dash-card dash-card--table" initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dash-card__header">
                <h3>Loan Review Queue</h3>
                <div className="dash-card__actions">
                    <button className="btn-minimal-posh" onClick={() => alert('Opening Queue Filters...')}><Filter size={14} /> Filter Queue</button>
                    <button className="btn-minimal-posh" onClick={() => alert('Exporting Decisions Ledger...')}><Download size={14} /> Export</button>
                </div>
            </div>

            <div className="loan-review-list">
                <div className="farmer-table__header" style={{ gridTemplateColumns: '100px 1.5fr 100px 120px 100px 1.2fr 180px' }}>
                    <span>Loan ID</span>
                    <span>Farmer Name</span>
                    <span>Amount</span>
                    <span>Request Date</span>
                    <span>Score</span>
                    <span>Current Status</span>
                    <span>Action</span>
                </div>
                {pendingLoans.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                        <p>No pending loan applications</p>
                    </div>
                ) : (
                    pendingLoans.map((loan, i) => (
                        <div key={i} className="farmer-table__row" style={{ gridTemplateColumns: '100px 1.5fr 100px 120px 100px 1.2fr 180px' }}>
                            <span className="farmer-table__id">{loan.loan_id}</span>
                            <span className="farmer-table__name">{loan.farmer_name}</span>
                            <span style={{ fontWeight: 700 }}>₹{parseFloat(loan.loan_amount).toLocaleString()}</span>
                            <span>{new Date(loan.created_at).toLocaleDateString()}</span>
                            <span>
                                <span className={`score-badge score-badge--${loan.trust_score >= 70 ? 'high' : loan.trust_score >= 50 ? 'med' : 'low'}`}>
                                    {loan.trust_score || 'N/A'}
                                </span>
                            </span>
                            <span>
                                {decisions[loan.loan_id] ? (
                                    <span className={`status-pill status-pill--${decisions[loan.loan_id].toLowerCase()}`}>
                                        {decisions[loan.loan_id]}
                                    </span>
                                ) : (
                                    <span className="status-badge" style={{ color: '#D69E2E' }}>
                                        <Clock size={12} style={{ marginRight: '4px' }} />
                                        {loan.loan_status}
                                    </span>
                                )}
                            </span>
                            <span>
                                {!decisions[loan.loan_id] && loan.loan_status === 'pending' ? (
                                    <div className="decision-btns-inline">
                                        <button
                                            className="btn-mini btn-mini--success"
                                            onClick={() => handleApprove(loan)}
                                            disabled={processing === loan.loan_id}
                                        >
                                            {processing === loan.loan_id ? 'Processing...' : 'Approve'}
                                        </button>
                                        <button
                                            className="btn-mini btn-mini--danger"
                                            onClick={() => handleReject(loan)}
                                            disabled={processing === loan.loan_id}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : decisions[loan.loan_id] ? (
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Action completed</span>
                                ) : (
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{loan.loan_status}</span>
                                )}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
}

function AnalyticsSection() {
    return (
        <motion.div className="lender-analytics" initial="hidden" animate="visible" variants={fadeIn}>
            <div className="analytics-grid">
                <div className="dash-card">
                    <div className="dash-card__header">
                        <h3>Portfolio Disbursement Trend</h3>
                        <div className="lender-stat__trend text-success">+₹2.4 Cr last month</div>
                    </div>
                    <div className="analytics-placeholder">
                        <div className="complex-chart">
                            <div className="chart-y-axis">
                                <span>35L</span><span>25L</span><span>15L</span><span>5L</span>
                            </div>
                            <div className="mini-chart">
                                {portfolioMonthlyTrends.map((data, i) => (
                                    <div key={i} className="chart-group">
                                        <motion.div
                                            className="mini-chart__bar bar-primary"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(data.disbursed / 35) * 100}%` }}
                                            transition={{ delay: i * 0.1 }}
                                            title={`Disbursed: ${data.disbursed}L`}
                                        />
                                        <motion.div
                                            className="mini-chart__bar bar-secondary"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(data.collection / 35) * 100}%` }}
                                            transition={{ delay: i * 0.1 + 0.1 }}
                                            title={`Collection: ${data.collection}L`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mini-chart__labels">
                            {portfolioMonthlyTrends.map((d, i) => <span key={i}>{d.month}</span>)}
                        </div>
                        <div className="chart-legend">
                            <div className="legend-item"><span className="dot bar-primary" /> Disbursement</div>
                            <div className="legend-item"><span className="dot bar-secondary" /> Collection</div>
                        </div>
                    </div>
                </div>

                <div className="dash-card">
                    <div className="dash-card__header">
                        <h3>Credit Health by Region</h3>
                        <div className="lender-stat__trend text-success">Varanasi leads</div>
                    </div>
                    <div className="analytics-placeholder">
                        <div className="regional-grid">
                            {regionalRisk.map((r, i) => (
                                <div key={i} className="regional-card">
                                    <div className="regional-card__top">
                                        <span className="region-name">{r.region}</span>
                                        <span className={`risk-tag risk-tag--${r.risk.toLowerCase()}`}>{r.risk}</span>
                                    </div>
                                    <div className="region-score">
                                        <div className="score-label">Avg. Trust Score</div>
                                        <div className="score-value">{r.score}</div>
                                    </div>
                                    <div className="region-trend">
                                        {r.trend === 'up' ? <ArrowUpRight size={14} className="text-success" /> : r.trend === 'down' ? <ArrowDownRight size={14} className="text-danger" /> : <Activity size={14} className="text-muted" />}
                                        <span className={r.trend === 'up' ? 'text-success' : r.trend === 'down' ? 'text-danger' : ''}>
                                            {r.trend === 'up' ? 'Improving' : r.trend === 'down' ? 'Declining' : 'Stable'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="analytics-row" style={{ marginTop: '2rem' }}>
                <div className="dash-card">
                    <h3>Crop Portfolio Concentration</h3>
                    <p className="text-muted">Analysis of loan exposure across different crop cycles.</p>
                    <div className="crop-dist-grid">
                        {cropDistribution.map((c, i) => (
                            <div key={i} className="crop-dist-item">
                                <div className="crop-dist-info">
                                    <span className="crop-name">{c.crop}</span>
                                    <span className="crop-share">{c.share}% Exposure</span>
                                </div>
                                <div className="crop-progress-container">
                                    <div className="crop-progress-bar">
                                        <motion.div
                                            className="crop-progress-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${c.share}%` }}
                                            style={{ backgroundColor: `hsl(150, 40%, ${40 + i * 10}%)` }}
                                        />
                                    </div>
                                    <div className="crop-meta">
                                        <span>Yield Index: <strong>{c.avgYield.toFixed(1)}x</strong></span>
                                        <span>Risk Index: <strong>{c.riskIndex}</strong></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dash-card fraud-summary">
                    <h3>Security & Compliance</h3>
                    <div className="fraud-stats">
                        <div className="fraud-stat-item">
                            <span className="f-val">0.8%</span>
                            <span className="f-lab">Fraud Rate</span>
                        </div>
                        <div className="fraud-stat-item">
                            <span className="f-val">94.2%</span>
                            <span className="f-lab">Verification Accuracy</span>
                        </div>
                    </div>
                    <div className="fraud-indicators">
                        <div className="indicator">
                            <span>Satellite Tampering Checks</span>
                            <span className="text-success">Passed</span>
                        </div>
                        <div className="indicator">
                            <span>Bhuinaksha Data Sync</span>
                            <span className="text-success">Active</span>
                        </div>
                        <div className="indicator">
                            <span>Aadhaaar Vault Status</span>
                            <span className="text-success">Secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function AlertsSection() {
    const [dismissed, setDismissed] = useState([]);

    const handleDismiss = (id) => {
        setDismissed(prev => [...prev, id]);
    };

    const activeAlerts = fraudAlerts.filter(a => !dismissed.includes(a.id));

    return (
        <motion.div className="lender-alerts" initial="hidden" animate="visible" variants={fadeIn}>
            <div className="alerts-summary">
                <div className="dash-card alert-stat--high">
                    <AlertTriangle size={24} />
                    <div>
                        <h4>High Priority</h4>
                        <span className="alert-count">{activeAlerts.filter(a => a.severity === 'High').length} Pending</span>
                    </div>
                </div>
                <div className="dash-card alert-stat--med">
                    <Shield size={24} />
                    <div>
                        <h4>Security Ops</h4>
                        <span className="alert-count">{activeAlerts.length} Active Watches</span>
                    </div>
                </div>
            </div>

            <div className="fraud-alerts" style={{ marginTop: '2rem' }}>
                <AnimatePresence>
                    {activeAlerts.length > 0 ? activeAlerts.map((alert) => (
                        <motion.div
                            key={alert.id}
                            className={`fraud-alert fraud-alert--${alert.severity.toLowerCase()}`}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0 }}
                            whileHover={{ x: 10 }}
                            layout
                        >
                            <div className="fraud-alert__header">
                                <div className="fraud-alert__main">
                                    <div className="fraud-alert__icon">
                                        {alert.severity === 'High' ? <AlertTriangle size={18} /> : <Shield size={18} />}
                                    </div>
                                    <div>
                                        <span className="fraud-alert__type">{alert.type}</span>
                                        <p className="fraud-alert__message">{alert.message}</p>
                                    </div>
                                </div>
                                <span className={`fraud-alert__severity fraud-alert__severity--${alert.severity.toLowerCase()}`}>
                                    {alert.severity}
                                </span>
                            </div>
                            <div className="fraud-alert__footer">
                                <div className="fraud-alert__meta">
                                    <span>Farmer ID: <strong>{alert.farmerId}</strong></span>
                                    <span className="dot-sep" />
                                    <span>Detected: <strong>{alert.date}</strong></span>
                                </div>
                                <div className="fraud-alert__actions">
                                    <button className="btn-posh-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => alert(`Account for ${alert.farmerId} has been temporarily frozen. Protocols initiated.`)}>Freeze Account</button>
                                    <button className="btn-text text-muted" onClick={() => handleDismiss(alert.id)}>Dismiss</button>
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="empty-state-posh">
                            <CheckCircle2 size={48} className="text-success" />
                            <h4>System Secured</h4>
                            <p>All fraud alerts have been addressed or dismissed.</p>
                            <button className="btn-outline" onClick={() => setDismissed([])}>Restore History</button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function SettingsSection() {
    return (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dash-card">
                <h3>System Governance & Settings</h3>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>Manage branch-level configurations and ethical AI guardrails.</p>

                <div className="settings-list">
                    <div className="settings-item">
                        <div>
                            <h4>Dynamic Risk Thresholds</h4>
                            <p>Current: 45 Minimum Agri-Trust Score for auto-approval</p>
                        </div>
                        <button className="btn-minimal-posh" onClick={() => alert('Opening Risk Threshold config...')}>Adjust Limits</button>
                    </div>
                    <div className="settings-item">
                        <div>
                            <h4>Branch Officer Access</h4>
                            <p>Manage permissions for 8 dashboard users in Varanasi Branch</p>
                        </div>
                        <button className="btn-minimal-posh" onClick={() => alert('Opening Team Management...')}>Manage Team</button>
                    </div>
                    <div className="settings-item">
                        <div>
                            <h4>Ethical AI Audit Logs</h4>
                            <p>Download explainability reports for recent automated rejections</p>
                        </div>
                        <button className="btn-minimal-posh" onClick={() => alert('Generating AI Explainability PDF...')}>View Logs</button>
                    </div>
                </div>
            </div>

            <div className="dash-card" style={{ marginTop: '2rem' }}>
                <h3>Platform Notifications</h3>
                <div className="settings-list">
                    <div className="settings-item">
                        <div>
                            <h4>High-Risk Fraud Alerts</h4>
                            <p>SMS and Email alerts for immediate review</p>
                        </div>
                        <div className="toggle-placeholder" style={{ width: '40px', height: '20px', background: '#2D6A4F', borderRadius: '20px' }} />
                    </div>
                    <div className="settings-item">
                        <div>
                            <h4>Daily Portfolio Summary</h4>
                            <p>End-of-day reports on disbursements and collections</p>
                        </div>
                        <div className="toggle-placeholder" style={{ width: '40px', height: '20px', background: '#CBD5E0', borderRadius: '20px' }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function FarmerDetailModal({ farmer, onClose }) {
    const [localTab, setLocalTab] = useState('Overview');

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="modal-container"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="modal-header">
                    <div>
                        <h2>{farmer.name} <span className="text-muted">| {farmer.id}</span></h2>
                        <span className={`risk-badge risk-badge--${farmer.risk.toLowerCase()}`} style={{ marginTop: '4px' }}>
                            {farmer.risk} Risk Profile
                        </span>
                    </div>
                    <button onClick={onClose} className="modal-close"><XCircle size={28} /></button>
                </div>

                <div className="modal-tabs">
                    {['Overview', 'Agri-Trust Score', 'Farm & Crop', 'Risk & Fraud', 'Bank Compliance', 'Documentation'].map(t => (
                        <button
                            key={t}
                            className={`modal-tab ${localTab === t ? 'modal-tab--active' : ''}`}
                            onClick={() => setLocalTab(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="modal-body">
                    <div className="detail-grid">
                        <div className="detail-main">
                            {localTab === 'Overview' && (
                                <div className="detail-section">
                                    <h4 className="section-title">Personal & Land Info</h4>
                                    <div className="info-grid">
                                        <div className="info-row"><span>District:</span> <strong>{farmer.district}</strong></div>
                                        <div className="info-row"><span>Village:</span> <strong>Chandpur Sector-B</strong></div>
                                        <div className="info-row"><span>Mobile:</span> <strong>+91 98XXX XXX10</strong></div>
                                        <div className="info-row"><span>Aadhaar:</span> <strong>XXXX-XXXX-7842</strong></div>
                                        <div className="info-row"><span>Land Size:</span> <strong>4.2 Acres</strong></div>
                                        <div className="info-row"><span>Ownership:</span> <strong>Self-Owned</strong></div>
                                    </div>

                                    <h4 className="section-title" style={{ marginTop: '2rem' }}>Recent Harvests</h4>
                                    <div className="harvest-table">
                                        <div className="harvest-row header">
                                            <span>Season</span>
                                            <span>Crop</span>
                                            <span>Yield</span>
                                            <span>Income</span>
                                        </div>
                                        <div className="harvest-row">
                                            <span>Kharif 24</span>
                                            <span>Rice</span>
                                            <span>45 Qtl</span>
                                            <span>₹92,000</span>
                                        </div>
                                        <div className="harvest-row">
                                            <span>Rabi 23-24</span>
                                            <span>Wheat</span>
                                            <span>52 Qtl</span>
                                            <span>₹1.1L</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {localTab === 'Agri-Trust Score' && (
                                <div className="detail-section">
                                    <div className="score-summary-box">
                                        <div className="score-big-circle">
                                            <span className="score-big-num">{farmer.score}</span>
                                            <span className="score-big-grade">B+</span>
                                        </div>
                                        <div className="score-summary-text">
                                            <h4>Agri-Trust Score Analysis</h4>
                                            <p>Score is in Top 15% for the Varanasi region. Improving trend observed over last 3 seasons.</p>
                                        </div>
                                    </div>

                                    <h4 className="section-title">Score Components</h4>
                                    <div className="score-components">
                                        {[
                                            { name: 'Repayment History', val: 92, status: 'Excellent' },
                                            { name: 'Satellite Vegetation Health', val: 78, status: 'Good' },
                                            { name: 'Weather Resilience', val: 65, status: 'Average' },
                                            { name: 'Market Price Alignment', val: 84, status: 'Good' },
                                        ].map((c, i) => (
                                            <div key={i} className="score-comp">
                                                <div className="score-comp__label">
                                                    <span>{c.name}</span>
                                                    <strong>{c.status}</strong>
                                                </div>
                                                <div className="score-comp__bar">
                                                    <div className="score-comp__fill" style={{ width: `${c.val}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {localTab === 'Farm & Crop' && (
                                <div className="detail-section">
                                    <div className="satellite-preview">
                                        <div className="satellite-img">
                                            <div className="satellite-overlay">
                                                <span>LIVE NDVI: 0.72</span>
                                                <div className="pulse-dot" />
                                            </div>
                                            <img src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=800&q=80" alt="Farmland" />
                                        </div>
                                        <div className="satellite-info">
                                            <h4>Satellite Vegetation Index</h4>
                                            <p>Current NDVI shows healthy crop development consistent with Sowing Date (Nov 05).</p>
                                            <div className="weather-mini">
                                                <div className="weather-item">
                                                    <CloudSun size={18} />
                                                    <span>24°C / Normal Rain</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="section-title">Current Season Details</h4>
                                    <div className="info-grid">
                                        <div className="info-row"><span>Crop Type:</span> <strong>Wheat (Kalyan Sona)</strong></div>
                                        <div className="info-row"><span>Sowing Date:</span> <strong>Nov 05, 2024</strong></div>
                                        <div className="info-row"><span>Est. Harvest:</span> <strong>Apr 12, 2025</strong></div>
                                        <div className="info-row"><span>Soil Moisture:</span> <strong className="text-danger">Critical (22%)</strong></div>
                                    </div>
                                </div>
                            )}

                            {localTab === 'Bank Compliance' && (
                                <div className="detail-section">
                                    <h4 className="section-title">Institutional Health & Regulatory</h4>
                                    <div className="compliance-grid">
                                        <div className="compliance-card">
                                            <label>CIBIL / Equifax Score</label>
                                            <div className="comp-val">742 <span className="text-success">Good</span></div>
                                            <p className="text-muted">Last pulled: Jan 15, 2025</p>
                                        </div>
                                        <div className="compliance-card">
                                            <label>PSL Classification</label>
                                            <div className="comp-val">Priority Sector</div>
                                            <p className="text-muted">Category: Agriculture (Small/Marginal)</p>
                                        </div>
                                        <div className="compliance-card">
                                            <label>LGD Projection</label>
                                            <div className="comp-val">12.4%</div>
                                            <p className="text-muted">Historical regional recovery average</p>
                                        </div>
                                    </div>

                                    <h4 className="section-title" style={{ marginTop: '2rem' }}>e-KYC & Onboarding Logs</h4>
                                    <div className="kyc-logs">
                                        <div className="log-item">
                                            <span>UIDAI Vault Sync</span>
                                            <span className="badge-success">Verified</span>
                                            <span className="text-muted">Jan 12</span>
                                        </div>
                                        <div className="log-item">
                                            <span>Pan Proving (NSDL)</span>
                                            <span className="badge-success">Success</span>
                                            <span className="text-muted">Jan 12</span>
                                        </div>
                                        <div className="log-item">
                                            <span>Geographic Fencing Check</span>
                                            <span className="badge-warning">In-Progress</span>
                                            <span className="text-muted">Now</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {localTab === 'Documentation' && (
                                <div className="detail-section">
                                    <div className="docs-list">
                                        {[
                                            { name: 'Digital Land Record (Khasra)', date: 'Jan 12, 2025' },
                                            { name: 'Farmer ID Card', date: 'Jan 10, 2025' },
                                            { name: 'Mandi Receipt - Kharif 24', date: 'Nov 20, 2024' },
                                            { name: 'Bank Passbook (6M)', date: 'Jan 15, 2025' },
                                        ].map((doc, i) => (
                                            <div key={i} className="doc-item">
                                                <div className="doc-icon"><Activity size={16} /></div>
                                                <div className="doc-info">
                                                    <strong>{doc.name}</strong>
                                                    <span>Uploaded on {doc.date}</span>
                                                </div>
                                                <button className="btn-text">View</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="detail-loan-center">
                            <h4 className="section-title">Decision Engine</h4>
                            <div className="loan-calculator">
                                <div className="calc-item">
                                    <label>Recommended Amount</label>
                                    <div className="calc-value">₹{(farmer.loanAmount * 1.2).toLocaleString()}</div>
                                </div>
                                <div className="calc-item">
                                    <label>Applied Tenure</label>
                                    <div className="calc-value">12 Months</div>
                                </div>
                                <div className="calc-item">
                                    <label>EMI Calculation</label>
                                    <div className="calc-value">₹15,400 /mo</div>
                                </div>

                                <div className="decision-note">
                                    <label>Reviewer Notes</label>
                                    <textarea placeholder="Add compliance notes here..." />
                                </div>

                                <div className="calc-actions">
                                    <button className="btn-posh-success" onClick={() => { alert('Application Sanctioned successfully.'); onClose(); }}>Approve Loan</button>
                                    <button className="btn-posh-danger" onClick={() => { alert('Application sent for manual rejection review.'); onClose(); }}>Decline</button>
                                </div>
                                <button className="btn-posh-outline" onClick={() => alert('Field visit scheduled for tomorrow 10:00 AM.')}>Request Field Audit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}



