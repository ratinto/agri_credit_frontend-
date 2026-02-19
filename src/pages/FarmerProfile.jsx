import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    User, MapPin, Phone, Calendar, FileText, CheckCircle2,
    AlertCircle, Edit, ChevronRight, Home, Landmark, Users
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout';
import { farmerProfile, landDetails, navLinks } from '../data/mockData';
import './FarmerProfile.css';

export default function FarmerProfile() {
    return (
        <DashboardLayout links={navLinks.farmer} userType="farmer" userName={farmerProfile.name}>
            <div className="farmer-profile">
                <motion.div
                    className="farmer-profile__header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>My <span className="text-posh">Profile</span></h1>
                    <button className="farmer-profile__edit-btn">
                        <Edit size={16} /> Edit Profile
                    </button>
                </motion.div>

                {/* Profile Completion */}
                <motion.div
                    className="profile-completion"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="profile-completion__header">
                        <h3>Profile Completeness</h3>
                        <span className="profile-completion__pct">{farmerProfile.profileCompletion}%</span>
                    </div>
                    <div className="profile-completion__bar">
                        <div className="profile-completion__fill" style={{ width: `${farmerProfile.profileCompletion}%` }} />
                    </div>
                    <div className="profile-completion__steps">
                        {[
                            { name: 'Personal Details', done: true },
                            { name: 'Land Details', done: true },
                            { name: 'Bank Account', done: true },
                            { name: 'Crop History', done: true },
                            { name: 'Family Linking', done: false },
                            { name: 'Insurance Details', done: false },
                        ].map((step, i) => (
                            <div key={i} className={`profile-step ${step.done ? 'profile-step--done' : ''}`}>
                                {step.done ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                <span>{step.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="farmer-profile__grid">
                    {/* Personal Info */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="dash-card__header">
                            <h3><User size={18} /> Personal Details</h3>
                        </div>

                        <div className="profile-avatar">
                            <div className="profile-avatar__circle">
                                {farmerProfile.name.charAt(0)}
                            </div>
                            <div className="profile-avatar__info">
                                <h2>{farmerProfile.name}</h2>
                                <span className="profile-avatar__id">ID: {farmerProfile.id}</span>
                                {farmerProfile.kycVerified && (
                                    <span className="profile-avatar__verified">
                                        <CheckCircle2 size={14} /> KYC Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="profile-details">
                            {[
                                { icon: <Phone size={16} />, label: 'Phone', value: farmerProfile.phone },
                                { icon: <MapPin size={16} />, label: 'Village', value: farmerProfile.village },
                                { icon: <MapPin size={16} />, label: 'District', value: `${farmerProfile.district}, ${farmerProfile.state}` },
                                { icon: <Users size={16} />, label: 'Family Members', value: farmerProfile.familyMembers },
                                { icon: <Landmark size={16} />, label: 'Bank Account', value: farmerProfile.bankAccount },
                                { icon: <Home size={16} />, label: 'Ownership', value: farmerProfile.ownershipType },
                                { icon: <Calendar size={16} />, label: 'Registered', value: new Date(farmerProfile.registeredDate).toLocaleDateString('en-IN') },
                            ].map((d, i) => (
                                <div key={i} className="profile-detail">
                                    <span className="profile-detail__icon">{d.icon}</span>
                                    <span className="profile-detail__label">{d.label}</span>
                                    <span className="profile-detail__value">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Land Details */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="dash-card__header">
                            <h3><MapPin size={18} /> Land Details</h3>
                        </div>

                        <div className="land-cards">
                            {landDetails.map((land, i) => (
                                <div key={i} className="land-card">
                                    <div className="land-card__header">
                                        <span className="land-card__id">{land.id}</span>
                                        <span className={`land-card__status ${land.verified ? 'land-card__status--verified' : 'land-card__status--pending'}`}>
                                            {land.verified ? '✅ Verified' : '⏳ Pending'}
                                        </span>
                                    </div>

                                    {/* Map placeholder */}
                                    <div className="land-card__map">
                                        <MapPin size={24} />
                                        <span>{land.latitude.toFixed(4)}°N, {land.longitude.toFixed(4)}°E</span>
                                    </div>

                                    <div className="land-card__details">
                                        <div>
                                            <span className="land-card__detail-label">Area</span>
                                            <span>{land.area} {land.unit}</span>
                                        </div>
                                        <div>
                                            <span className="land-card__detail-label">Type</span>
                                            <span>{land.type}</span>
                                        </div>
                                        <div>
                                            <span className="land-card__detail-label">Ownership</span>
                                            <span>{land.ownership}</span>
                                        </div>
                                        <div>
                                            <span className="land-card__detail-label">Soil</span>
                                            <span>{land.soilType}</span>
                                        </div>
                                    </div>

                                    <div className="land-card__docs">
                                        {land.documents.map((doc, j) => (
                                            <span key={j} className="land-card__doc">
                                                <FileText size={12} /> {doc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Consent Management */}
                    <motion.div
                        className="dash-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ gridColumn: '1 / -1' }}
                    >
                        <div className="dash-card__header">
                            <h3>🔒 Data Privacy & Consent</h3>
                        </div>

                        <div className="consent-section">
                            <div className="consent-card">
                                <h4>Your Data is Protected</h4>
                                <p>We use AES-256 encryption and tokenized IDs. Your data is only shared with explicit consent.</p>
                            </div>

                            <div className="consent-permissions">
                                {[
                                    { name: 'Share with Banks/NBFCs', active: true, desc: 'For loan eligibility assessment' },
                                    { name: 'Satellite Data Analysis', active: true, desc: 'For crop health monitoring' },
                                    { name: 'Weather Advisory Alerts', active: true, desc: 'SMS/notification alerts' },
                                    { name: 'Market Price Notifications', active: true, desc: 'Mandi price updates' },
                                    { name: 'Research & Analytics', active: false, desc: 'Anonymized data for research' },
                                ].map((p, i) => (
                                    <div key={i} className="consent-permission">
                                        <div className="consent-permission__info">
                                            <span className="consent-permission__name">{p.name}</span>
                                            <span className="consent-permission__desc">{p.desc}</span>
                                        </div>
                                        <span className={`policy__toggle ${p.active ? 'policy__toggle--on' : ''}`}>
                                            <span className="policy__toggle-dot" />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
