import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

export default function DashboardLayout({ children, links, userType, userName }) {
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="dashboard-layout">
                <Sidebar links={links} userType={userType} userName={userName} />
                <main className="dashboard-layout__main">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
