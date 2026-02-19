import { motion } from 'framer-motion';
import {
    ArrowUpCircle, TrendingUp, Shield, Star, Lightbulb, ChevronRight,
    CheckCircle2, Target
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout';
import { agriTrustScore, scoreImprovementTips, navLinks } from '../data/mockData';
import './ScoreImprovement.css';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function ScoreImprovement() {
    return (
        <DashboardLayout links={navLinks.farmer} userType="farmer" userName="Rajesh Kumar">
            <div className="score-improve">
                <motion.div
                    className="score-improve__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Improve Your <span className="text-gradient">Trust Score</span></h1>
                    <p>Personalized recommendations to boost your credit score</p>
                </motion.div>

                {/* Current Score Summary */}
                <motion.div
                    className="score-improve__summary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="score-summary__current">
                        <div className="score-summary__circle">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#improveGrad)" strokeWidth="8"
                                    strokeDasharray="264" strokeDashoffset={264 - (264 * agriTrustScore.overall / 100)}
                                    strokeLinecap="round" transform="rotate(-90 50 50)" />
                                <defs>
                                    <linearGradient id="improveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#2D6A4F" />
                                        <stop offset="100%" stopColor="#D4A017" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="score-summary__value">
                                <span className="score-summary__num">{agriTrustScore.overall}</span>
                                <span className="score-summary__grade">{agriTrustScore.grade}</span>
                            </div>
                        </div>
                        <div>
                            <h3>Current Score</h3>
                            <p className="score-summary__trend">
                                <TrendingUp size={16} /> Improving — Up 12 points in 2 seasons
                            </p>
                        </div>
                    </div>

                    <div className="score-summary__potential">
                        <Target size={20} />
                        <div>
                            <span className="score-summary__potential-label">Potential Score</span>
                            <span className="score-summary__potential-value">
                                {agriTrustScore.overall + 22} ({String.fromCharCode(agriTrustScore.grade.charCodeAt(0) - 1)}+)
                            </span>
                            <span className="score-summary__potential-desc">If you follow all recommendations</span>
                        </div>
                    </div>
                </motion.div>

                {/* Score Components */}
                <motion.div
                    className="dash-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <div className="dash-card__header">
                        <h3>Score Breakdown</h3>
                    </div>

                    <div className="score-components">
                        {agriTrustScore.components.map((c, i) => (
                            <div key={i} className="score-component">
                                <div className="score-component__header">
                                    <span className="score-component__name">{c.name}</span>
                                    <span className="score-component__weight">{c.weight}% weight</span>
                                </div>
                                <div className="score-component__bar-wrap">
                                    <div className="score-component__bar">
                                        <div
                                            className="score-component__fill"
                                            style={{
                                                width: `${c.score}%`,
                                                background: c.score >= 75 ? '#38A169' : c.score >= 60 ? '#D69E2E' : '#E53E3E'
                                            }}
                                        />
                                    </div>
                                    <span className="score-component__score">{c.score}</span>
                                    <span className={`score-component__change ${c.change >= 0 ? 'score-component__change--up' : 'score-component__change--down'}`}>
                                        {c.change >= 0 ? '+' : ''}{c.change}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Improvement Tips */}
                <motion.div
                    className="score-improve__tips"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <h3 className="score-improve__tips-title">
                        <Lightbulb size={20} /> Actionable Recommendations
                    </h3>

                    <div className="tips-grid">
                        {scoreImprovementTips.map((tip, i) => (
                            <motion.div
                                key={i}
                                className="tip-card"
                                variants={fadeIn}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -3 }}
                            >
                                <div className="tip-card__header">
                                    <span className="tip-card__emoji">{tip.icon}</span>
                                    <span className={`tip-card__impact tip-card__impact--${tip.impact.toLowerCase()}`}>
                                        {tip.impact} Impact
                                    </span>
                                </div>
                                <h4 className="tip-card__title">{tip.title}</h4>
                                <p className="tip-card__desc">{tip.description}</p>
                                <div className="tip-card__points">
                                    <Star size={14} />
                                    <span>{tip.points} points potential</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Why This Matters */}
                <motion.div
                    className="dash-card score-improve__why"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3>🤝 We're Here to Help — Not to Judge</h3>
                    <p>
                        Your Agri-Trust Score is designed to <strong>empower you</strong>, not punish you.
                        Every farmer starts with a <strong>fair base score</strong>, and there's no penalty for
                        missing data or being a first-time borrower. Climate disasters are automatically excluded
                        from your scoring. If you believe your score is unfair, you can always
                        <strong> request a review</strong>.
                    </p>
                    <div className="score-improve__guarantees">
                        {[
                            'No penalty for first-time borrowers',
                            'Disaster years automatically excluded',
                            'Tenant farmers scored fairly',
                            'Request review anytime',
                        ].map((g, i) => (
                            <div key={i} className="score-improve__guarantee">
                                <CheckCircle2 size={16} />
                                <span>{g}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
