import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import FarmerDashboard from './pages/FarmerDashboard';
import FarmerProfile from './pages/FarmerProfile';
import ScoreImprovement from './pages/ScoreImprovement';
import LenderDashboard from './pages/LenderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import LegalPage from './pages/LegalPage';
import ResourcesPage from './pages/ResourcesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Static Informational Pages */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Legal & Resources (Generic Components) */}
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route path="/data-consent" element={<LegalPage />} />
        <Route path="/ethics" element={<LegalPage />} />

        <Route path="/docs" element={<ResourcesPage />} />
        <Route path="/api" element={<ResourcesPage />} />
        <Route path="/case-studies" element={<ResourcesPage />} />
        <Route path="/research" element={<ResourcesPage />} />

        {/* Farmer Routes */}
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/profile" element={<FarmerProfile />} />
        <Route path="/farmer/crops" element={<FarmerDashboard />} />
        <Route path="/farmer/score" element={<FarmerDashboard />} />
        <Route path="/farmer/loans" element={<FarmerDashboard />} />
        <Route path="/farmer/weather" element={<FarmerDashboard />} />
        <Route path="/farmer/market" element={<FarmerDashboard />} />
        <Route path="/farmer/improve" element={<ScoreImprovement />} />

        {/* Lender Routes */}
        <Route path="/lender/dashboard" element={<LenderDashboard />} />
        <Route path="/lender/farmers" element={<LenderDashboard />} />
        <Route path="/lender/risk" element={<LenderDashboard />} />
        <Route path="/lender/loans" element={<LenderDashboard />} />
        <Route path="/lender/ml" element={<LenderDashboard />} />
        <Route path="/lender/fraud" element={<LenderDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/data" element={<AdminDashboard />} />
        <Route path="/admin/models" element={<AdminDashboard />} />
        <Route path="/admin/security" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
