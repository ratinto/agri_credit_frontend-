import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Users, Database, Brain, Shield, Activity, Server,
    AlertTriangle, ChevronRight, Settings, Globe,
    TrendingUp, CheckCircle2, Clock, Zap, HardDrive,
    Cpu, Wifi
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout';
import { adminStats, systemHealth, regionData, consentData, navLinks } from '../data/mockData';
import './AdminDashboard.css';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
    return (
        <DashboardLayout links={navLinks.admin} userType="admin" userName="Platform Admin">
            <div className="admin-dash">
                {/* Header */}
                <motion.div
                    className="admin-dash__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1>Admin <span className="text-gradient">Control Panel</span></h1>
                        <p className="admin-dash__subtitle">Platform Governance & System Monitoring</p>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="admin-dash__stats"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                >
                    {[
                        { icon: <Users size={22} />, label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), color: '#2D6A4F' },
                        { icon: <Activity size={22} />, label: 'System Health', value: `${adminStats.systemHealth}%`, color: '#38A169' },
                        { icon: <Database size={22} />, label: 'Data Quality', value: `${adminStats.dataQuality}%`, color: '#3182CE' },
                        { icon: <Brain size={22} />, label: 'Models Deployed', value: adminStats.modelsDeployed, color: '#D4A017' },
                        { icon: <Wifi size={22} />, label: 'API Uptime', value: `${adminStats.apiUptime}%`, color: '#0D9488' },
                        { icon: <AlertTriangle size={22} />, label: 'Pending Alerts', value: adminStats.alertsPending, color: '#E53E3E' },
                    ].map((stat, i) => (
                        <motion.div key={i} className="admin-stat" variants={fadeIn} transition={{ duration: 0.4 }}>
                            <div className="admin-stat__icon" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)` }}>
                                {stat.icon}
                            </div>
                            <span className="admin-stat__value">{stat.value}</span>
                            <span className="admin-stat__label">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="admin-dash__grid">
                    {/* System Health */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="dash-card__header">
                            <h3>System Health</h3>
                            <span className="system-status system-status--online">
                                <span className="system-status__dot" /> All Systems Operational
                            </span>
                        </div>

                        <div className="system-metrics">
                            {[
                                { label: 'CPU Usage', value: systemHealth.cpu, icon: <Cpu size={16} />, color: '#2D6A4F' },
                                { label: 'Memory', value: systemHealth.memory, icon: <HardDrive size={16} />, color: '#3182CE' },
                                { label: 'Storage', value: systemHealth.storage, icon: <Server size={16} />, color: '#D4A017' },
                            ].map((m, i) => (
                                <div key={i} className="system-metric">
                                    <div className="system-metric__header">
                                        <span className="system-metric__icon">{m.icon}</span>
                                        <span className="system-metric__label">{m.label}</span>
                                        <span className="system-metric__value">{m.value}%</span>
                                    </div>
                                    <div className="system-metric__bar">
                                        <div
                                            className="system-metric__fill"
                                            style={{
                                                width: `${m.value}%`,
                                                background: m.value > 80 ? '#E53E3E' : m.value > 60 ? '#D69E2E' : m.color
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="system-metric__extras">
                                <div className="system-extra">
                                    <span>API Latency</span>
                                    <strong>{systemHealth.apiLatency}ms</strong>
                                </div>
                                <div className="system-extra">
                                    <span>Active Connections</span>
                                    <strong>{systemHealth.activeConnections.toLocaleString()}</strong>
                                </div>
                                <div className="system-extra">
                                    <span>Error Rate</span>
                                    <strong>{systemHealth.errorRate}%</strong>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Data Privacy & Consent */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="dash-card__header">
                            <h3>Data Privacy & Consent</h3>
                            <Link to="/admin/security" className="dash-card__link">
                                Manage <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="consent-overview">
                            <div className="consent-circle">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="#38A169" strokeWidth="8"
                                        strokeDasharray="264" strokeDashoffset={264 - (264 * consentData.consentRate / 100)}
                                        strokeLinecap="round" transform="rotate(-90 50 50)" />
                                </svg>
                                <span className="consent-circle__value">{consentData.consentRate}%</span>
                            </div>
                            <div className="consent-details">
                                <h4>Consent Status</h4>
                                {[
                                    { label: 'Active Consents', value: consentData.activeConsents, color: '#38A169' },
                                    { label: 'Revoked', value: consentData.revokedConsents, color: '#E53E3E' },
                                    { label: 'Pending', value: consentData.pendingConsents, color: '#D69E2E' },
                                ].map((c, i) => (
                                    <div key={i} className="consent-item">
                                        <span className="consent-item__dot" style={{ background: c.color }} />
                                        <span className="consent-item__label">{c.label}</span>
                                        <span className="consent-item__value">{c.value.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="privacy-features">
                            {['🔒 AES-256 Encryption', '🎫 Tokenized IDs', '📝 Explicit Consent', '🔐 Secure APIs'].map((f, i) => (
                                <span key={i} className="privacy-badge">{f}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Regional Analytics */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ gridColumn: '1 / -1' }}
                    >
                        <div className="dash-card__header">
                            <h3>Regional Analytics</h3>
                            <Link to="/admin/data" className="dash-card__link">
                                Full Report <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="region-table">
                            <div className="region-table__header">
                                <span>Region</span>
                                <span>Farmers</span>
                                <span>Avg Score</span>
                                <span>Default Rate</span>
                                <span>Score Distribution</span>
                            </div>
                            {regionData.map((r, i) => (
                                <div key={i} className="region-table__row">
                                    <span className="region-table__region">
                                        <Globe size={14} /> {r.region}
                                    </span>
                                    <span>{r.farmers.toLocaleString()}</span>
                                    <span className="region-table__score">
                                        <span className={`score-badge score-badge--${r.avgScore >= 70 ? 'high' : r.avgScore >= 60 ? 'med' : 'low'}`}>
                                            {r.avgScore}
                                        </span>
                                    </span>
                                    <span className={r.defaultRate > 5 ? 'text-danger' : r.defaultRate > 4 ? 'text-warning' : 'text-success'}>
                                        {r.defaultRate}%
                                    </span>
                                    <span>
                                        <div className="region-bar">
                                            <div className="region-bar__fill" style={{ width: `${r.avgScore}%` }} />
                                        </div>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Ethical AI Safeguards */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="dash-card__header">
                            <h3>Ethical AI Safeguards</h3>
                        </div>

                        <div className="safeguards">
                            {[
                                { icon: <CheckCircle2 size={18} />, title: 'No Auto-Rejection', status: 'Active', desc: 'Human override always available' },
                                { icon: <Shield size={18} />, title: 'Bias Detection', status: 'Active', desc: 'Region-wise normalization enabled' },
                                { icon: <Users size={18} />, title: 'Fairness Checks', status: 'Active', desc: 'Small farmer protections on' },
                                { icon: <Clock size={18} />, title: 'Appeal System', status: 'Active', desc: '12 pending appeals' },
                            ].map((s, i) => (
                                <div key={i} className="safeguard">
                                    <span className="safeguard__icon">{s.icon}</span>
                                    <div className="safeguard__info">
                                        <span className="safeguard__title">{s.title}</span>
                                        <span className="safeguard__desc">{s.desc}</span>
                                    </div>
                                    <span className="safeguard__status">{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Policy Engine */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="dash-card__header">
                            <h3>Policy & Rule Engine</h3>
                            <Link to="/admin/settings" className="dash-card__link">
                                Configure <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="policies">
                            {[
                                { name: 'Disaster Year Exclusion', status: true, desc: 'Flood/drought years excluded from scoring' },
                                { name: 'First-time Borrower Bonus', status: true, desc: 'No penalty for missing credit history' },
                                { name: 'Tenant Farmer Protection', status: true, desc: 'Equal scoring for tenant farmers' },
                                { name: 'Region-wise Normalization', status: true, desc: 'Scores adjusted per regional conditions' },
                                { name: 'Seasonal Score Refresh', status: true, desc: 'Auto-update after each harvest season' },
                            ].map((p, i) => (
                                <div key={i} className="policy">
                                    <div className="policy__info">
                                        <span className="policy__name">{p.name}</span>
                                        <span className="policy__desc">{p.desc}</span>
                                    </div>
                                    <span className={`policy__toggle ${p.status ? 'policy__toggle--on' : ''}`}>
                                        <span className="policy__toggle-dot" />
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
