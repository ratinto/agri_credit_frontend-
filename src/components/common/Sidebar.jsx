import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, User, Sprout, Shield, Wallet, CloudSun,
    TrendingUp, ArrowUpCircle, Users, Calculator, Brain,
    AlertTriangle, Database, Lock, Settings, Menu, X,
    LogOut, ChevronLeft, Bell
} from 'lucide-react';
import './Sidebar.css';

const iconMap = {
    LayoutDashboard, User, Sprout, Shield, Wallet, CloudSun,
    TrendingUp, ArrowUpCircle, Users, Calculator, Brain,
    AlertTriangle, Database, Lock, Settings,
};

export default function Sidebar({ links, userType, userName }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        requestAnimationFrame(() => {
            setMobileOpen(false);
        });
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const typeColors = {
        farmer: { bg: '#D8F3DC', text: '#1B4332', label: 'Farmer Portal' },
        lender: { bg: '#FFF8E1', text: '#B8860B', label: 'Lender Dashboard' },
        admin: { bg: '#E8F4FD', text: '#1565C0', label: 'Admin Panel' },
    };

    const config = typeColors[userType] || typeColors.farmer;

    return (
        <>
            {/* Mobile toggle */}
            <button className="sidebar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {mobileOpen && <div className="sidebar__overlay" onClick={() => setMobileOpen(false)} />}

            <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
                <div className="sidebar__header">
                    <Link to="/" className="sidebar__logo">
                        <div className="sidebar__logo-icon">
                            <Sprout size={20} />
                        </div>
                        {!collapsed && (
                            <div className="sidebar__logo-text">
                                <span className="sidebar__brand">AgriCredit</span>
                                <span className="sidebar__type" style={{ color: config.text }}>
                                    {config.label}
                                </span>
                            </div>
                        )}
                    </Link>
                    <button
                        className="sidebar__collapse-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <ChevronLeft size={16} className={collapsed ? 'rotate-180' : ''} />
                    </button>
                </div>

                <nav className="sidebar__nav">
                    {links.map((link) => {
                        const IconComponent = iconMap[link.icon] || LayoutDashboard;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                                title={collapsed ? link.name : ''}
                            >
                                <IconComponent size={20} />
                                {!collapsed && <span>{link.name}</span>}
                                {isActive && <div className="sidebar__link-indicator" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar__footer">
                    {!collapsed && (
                        <div className="sidebar__user">
                            <div className="sidebar__avatar">
                                {(userName || 'U').charAt(0)}
                            </div>
                            <div className="sidebar__user-info">
                                <span className="sidebar__user-name">{userName || 'User'}</span>
                                <span className="sidebar__user-role">{config.label}</span>
                            </div>
                        </div>
                    )}
                    <Link to="/" className="sidebar__logout" title="Logout">
                        <LogOut size={18} />
                        {!collapsed && <span>Logout</span>}
                    </Link>
                </div>
            </aside>
        </>
    );
}
