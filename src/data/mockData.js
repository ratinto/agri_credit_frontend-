// ===== MOCK DATA FOR RURAL AGRICREDIT INTELLIGENCE PLATFORM =====

export const farmerProfile = {
  id: 'FRM-2024-00847',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  aadhaarLast4: '7842',
  village: 'Chandpur',
  district: 'Varanasi',
  state: 'Uttar Pradesh',
  profileCompletion: 82,
  kycVerified: true,
  registeredDate: '2024-06-15',
  familyMembers: 5,
  bankAccount: 'Yes - SBI',
  ownershipType: 'Owner',
  photo: null,
};

export const landDetails = [
  {
    id: 'LAND-001',
    area: 3.5,
    unit: 'acres',
    type: 'Irrigated',
    ownership: 'Owner',
    soilType: 'Alluvial',
    latitude: 25.3176,
    longitude: 82.9739,
    verified: true,
    documents: ['Land Record', 'Khasra'],
  },
  {
    id: 'LAND-002',
    area: 1.2,
    unit: 'acres',
    type: 'Rainfed',
    ownership: 'Tenant',
    soilType: 'Sandy Loam',
    latitude: 25.3190,
    longitude: 82.9745,
    verified: false,
    documents: ['Lease Agreement'],
  },
];

export const cropHistory = [
  {
    season: 'Kharif 2024',
    crops: [
      { name: 'Rice', area: 2.5, yield: 45, unit: 'quintal', status: 'Harvested' },
      { name: 'Maize', area: 1.2, yield: 18, unit: 'quintal', status: 'Harvested' },
    ],
    sowingDate: '2024-06-20',
    harvestDate: '2024-11-15',
  },
  {
    season: 'Rabi 2023-24',
    crops: [
      { name: 'Wheat', area: 3.0, yield: 52, unit: 'quintal', status: 'Harvested' },
      { name: 'Mustard', area: 1.5, yield: 8, unit: 'quintal', status: 'Harvested' },
    ],
    sowingDate: '2023-11-10',
    harvestDate: '2024-04-20',
  },
  {
    season: 'Kharif 2023',
    crops: [
      { name: 'Rice', area: 2.0, yield: 40, unit: 'quintal', status: 'Harvested' },
    ],
    sowingDate: '2023-06-15',
    harvestDate: '2023-11-10',
  },
];

export const currentCrops = [
  {
    name: 'Wheat',
    area: 2.5,
    sowingDate: '2024-11-05',
    expectedHarvest: '2025-04-15',
    stage: 'Growing',
    health: 'Good',
    ndvi: 0.72,
  },
  {
    name: 'Gram',
    area: 1.0,
    sowingDate: '2024-10-20',
    expectedHarvest: '2025-03-10',
    stage: 'Flowering',
    health: 'Moderate',
    ndvi: 0.58,
  },
];

export const agriTrustScore = {
  overall: 74,
  grade: 'B+',
  riskCategory: 'Low-Medium',
  lastUpdated: '2025-01-15',
  trend: 'improving',
  components: [
    { name: 'Repayment History', score: 82, weight: 25, change: +3 },
    { name: 'Crop Performance', score: 71, weight: 20, change: -2 },
    { name: 'Land Productivity', score: 78, weight: 15, change: +5 },
    { name: 'Weather Resilience', score: 65, weight: 15, change: +1 },
    { name: 'Market Alignment', score: 70, weight: 10, change: +4 },
    { name: 'Data Confidence', score: 68, weight: 15, change: +2 },
  ],
  history: [
    { season: 'Kharif 2023', score: 62, grade: 'C+' },
    { season: 'Rabi 2023-24', score: 68, grade: 'B' },
    { season: 'Kharif 2024', score: 71, grade: 'B' },
    { season: 'Rabi 2024-25', score: 74, grade: 'B+' },
  ],
  explanations: [
    { type: 'positive', text: 'Timely repayment in last 2 seasons improved your score by +5 points' },
    { type: 'positive', text: 'Crop diversification (Wheat + Gram) added +3 points' },
    { type: 'negative', text: 'Below-average rainfall in your region reduced weather resilience by -2 points' },
    { type: 'info', text: 'First-time borrower penalty removed after 3 seasons of data' },
  ],
};

export const loanEligibility = {
  maxAmount: 275000,
  minAmount: 50000,
  recommendedAmount: 180000,
  interestRange: { min: 7, max: 9.5 },
  tenure: { min: 6, max: 24 },
  recommendedTenure: 12,
  defaultProbability: 8.2,
  microLoanAvailable: true,
  microLoanMax: 25000,
  seasonalPlan: [
    { month: 'Apr', amount: 15000 },
    { month: 'May', amount: 15000 },
    { month: 'Jun', amount: 15000 },
    { month: 'Jul', amount: 15000 },
    { month: 'Aug', amount: 15000 },
    { month: 'Sep', amount: 15000 },
    { month: 'Oct', amount: 15000 },
    { month: 'Nov', amount: 15000 },
    { month: 'Dec', amount: 30000 },
    { month: 'Jan', amount: 15000 },
    { month: 'Feb', amount: 0 },
    { month: 'Mar', amount: 15000 },
  ],
};

export const weatherData = {
  current: {
    temperature: 24,
    humidity: 72,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    rainfall: 0,
  },
  season: {
    totalRainfall: 680,
    normalRainfall: 750,
    deviation: -9.3,
    rainyDays: 42,
  },
  forecast: [
    { day: 'Today', temp: 24, condition: 'Partly Cloudy', rain: 0 },
    { day: 'Tomorrow', temp: 26, condition: 'Sunny', rain: 0 },
    { day: 'Wed', temp: 23, condition: 'Cloudy', rain: 10 },
    { day: 'Thu', temp: 22, condition: 'Rain', rain: 25 },
    { day: 'Fri', temp: 25, condition: 'Sunny', rain: 0 },
  ],
  alerts: [
    { type: 'warning', message: 'Light frost expected in next 48 hours', severity: 'moderate' },
  ],
};

export const satelliteData = {
  ndvi: {
    current: 0.72,
    previous: 0.65,
    trend: 'improving',
    classification: 'Healthy Vegetation',
  },
  cloudCover: 18,
  lastImageDate: '2025-01-12',
  soilMoisture: 42,
  cropHealthMap: 'healthy',
};

export const marketPrices = [
  { crop: 'Wheat', msp: 2275, mandi: 2180, trend: 'stable', priceChange: +2.1 },
  { crop: 'Rice', msp: 2183, mandi: 2350, trend: 'up', priceChange: +5.3 },
  { crop: 'Gram', msp: 5440, mandi: 5200, trend: 'down', priceChange: -3.2 },
  { crop: 'Mustard', msp: 5650, mandi: 5800, trend: 'up', priceChange: +4.1 },
  { crop: 'Maize', msp: 2090, mandi: 1950, trend: 'down', priceChange: -2.8 },
];

export const scoreImprovementTips = [
  {
    icon: '💰',
    title: 'Timely Repayment',
    description: 'Pay your loan installments on time to improve your repayment score by up to +10 points.',
    impact: 'High',
    points: '+10',
  },
  {
    icon: '🌾',
    title: 'Crop Diversification',
    description: 'Grow 2-3 different crops to reduce risk and improve your crop performance score.',
    impact: 'Medium',
    points: '+5',
  },
  {
    icon: '🛡️',
    title: 'Get Crop Insurance',
    description: 'PMFBY enrollment shows financial planning and adds to your resilience score.',
    impact: 'Medium',
    points: '+4',
  },
  {
    icon: '📱',
    title: 'Complete Your Profile',
    description: 'Add all land records and family details to increase your data confidence score.',
    impact: 'Low',
    points: '+3',
  },
  {
    icon: '🌤️',
    title: 'Weather-Smart Farming',
    description: 'Follow weather advisories and adjust farming practices for better yields.',
    impact: 'Medium',
    points: '+5',
  },
];

// ===== LENDER DASHBOARD DATA =====
export const lenderStats = {
  totalFarmers: 12847,
  activeLoans: 8432,
  totalDisbursed: 284500000,
  avgScore: 67,
  defaultRate: 4.2,
  npaRatio: 2.8,
  monthlyGrowth: 12.5,
  collectionRate: 94.8,
};

export const riskDistribution = [
  { level: 'Low Risk', count: 4520, percentage: 35.2, color: '#38A169' },
  { level: 'Medium Risk', count: 5180, percentage: 40.3, color: '#D69E2E' },
  { level: 'High Risk', count: 3147, percentage: 24.5, color: '#E53E3E' },
];

export const farmersList = [
  { id: 'FRM-001', name: 'Rajesh Kumar', score: 74, risk: 'Low', district: 'Varanasi', loanAmount: 180000, status: 'Active', landSize: '4.2 Acres', crop: 'Wheat', lastRepayment: '2025-02-01', yieldIndex: 1.1 },
  { id: 'FRM-002', name: 'Sunita Devi', score: 62, risk: 'Medium', district: 'Allahabad', loanAmount: 95000, status: 'Active', landSize: '2.5 Acres', crop: 'Rice', lastRepayment: '2025-01-28', yieldIndex: 0.9 },
  { id: 'FRM-003', name: 'Mohan Singh', score: 85, risk: 'Low', district: 'Agra', loanAmount: 320000, status: 'Active', landSize: '12.0 Acres', crop: 'Potatoes', lastRepayment: '2025-02-05', yieldIndex: 1.3 },
  { id: 'FRM-004', name: 'Priya Sharma', score: 45, risk: 'High', district: 'Lucknow', loanAmount: 50000, status: 'Review', landSize: '1.8 Acres', crop: 'Sugarcane', lastRepayment: '2024-12-15', yieldIndex: 0.7 },
  { id: 'FRM-005', name: 'Vikram Yadav', score: 58, risk: 'Medium', district: 'Kanpur', loanAmount: 120000, status: 'Active', landSize: '3.1 Acres', crop: 'Pulses', lastRepayment: '2025-01-20', yieldIndex: 1.0 },
  { id: 'FRM-006', name: 'Lakshmi Bai', score: 71, risk: 'Low', district: 'Jhansi', loanAmount: 200000, status: 'Active', landSize: '5.5 Acres', crop: 'Mustard', lastRepayment: '2025-02-10', yieldIndex: 1.1 },
  { id: 'FRM-007', name: 'Amit Patel', score: 38, risk: 'High', district: 'Bareilly', loanAmount: 45000, status: 'Flagged', landSize: '1.2 Acres', crop: 'Wheat', lastRepayment: '2024-11-30', yieldIndex: 0.6 },
  { id: 'FRM-008', name: 'Geeta Mishra', score: 79, risk: 'Low', district: 'Varanasi', loanAmount: 250000, status: 'Active', landSize: '6.4 Acres', crop: 'Rice', lastRepayment: '2025-02-08', yieldIndex: 1.2 },
  { id: 'FRM-009', name: 'Sanjay Gupta', score: 67, risk: 'Medium', district: 'Gorakhpur', loanAmount: 140000, status: 'Active', landSize: '3.8 Acres', crop: 'Maize', lastRepayment: '2025-01-25', yieldIndex: 1.0 },
  { id: 'FRM-010', name: 'Anita Singh', score: 82, risk: 'Low', district: 'Mirzapur', loanAmount: 280000, status: 'Active', landSize: '9.2 Acres', crop: 'Wheat', lastRepayment: '2025-02-12', yieldIndex: 1.25 },
  { id: 'FRM-011', name: 'Ravi Prakash', score: 51, risk: 'Medium', district: 'Ghazipur', loanAmount: 75000, status: 'Review', landSize: '2.1 Acres', crop: 'Rice', lastRepayment: '2025-01-05', yieldIndex: 0.85 },
  { id: 'FRM-012', name: 'Suman Lata', score: 76, risk: 'Low', district: 'Jaunpur', loanAmount: 195000, status: 'Active', landSize: '4.8 Acres', crop: 'Pulses', lastRepayment: '2025-02-03', yieldIndex: 1.15 },
  { id: 'FRM-013', name: 'Deepak Tiwari', score: 42, risk: 'High', district: 'Mathura', loanAmount: 60000, status: 'Flagged', landSize: '1.5 Acres', crop: 'Maize', lastRepayment: '2024-12-20', yieldIndex: 0.75 },
  { id: 'FRM-014', name: 'Meena Kumari', score: 69, risk: 'Medium', district: 'Aligarh', loanAmount: 110000, status: 'Active', landSize: '2.9 Acres', crop: 'Mustard', lastRepayment: '2025-01-30', yieldIndex: 0.95 },
  { id: 'FRM-015', name: 'Rameshwar Dayal', score: 88, risk: 'Low', district: 'Agra', loanAmount: 450000, status: 'Active', landSize: '15.5 Acres', crop: 'Potatoes', lastRepayment: '2025-02-14', yieldIndex: 1.4 },
  { id: 'FRM-016', name: 'Savita Devi', score: 55, risk: 'Medium', district: 'Ballia', loanAmount: 85000, status: 'Active', landSize: '2.4 Acres', crop: 'Wheat', lastRepayment: '2025-01-15', yieldIndex: 0.9 },
  { id: 'FRM-017', name: 'Gopal Krishna', score: 73, risk: 'Low', district: 'Varanasi', loanAmount: 220000, status: 'Active', landSize: '5.1 Acres', crop: 'Rice', lastRepayment: '2025-02-07', yieldIndex: 1.1 },
  { id: 'FRM-018', name: 'Indu Sharma', score: 35, risk: 'High', district: 'Deoria', loanAmount: 40000, status: 'Flagged', landSize: '1.1 Acres', crop: 'Sugar', lastRepayment: '2024-10-25', yieldIndex: 0.55 },
  { id: 'FRM-019', name: 'Mohit Verma', score: 64, risk: 'Medium', district: 'Meerut', loanAmount: 130000, status: 'Active', landSize: '3.4 Acres', crop: 'Maize', lastRepayment: '2025-01-22', yieldIndex: 1.0 },
  { id: 'FRM-020', name: 'Radha Rani', score: 81, risk: 'Low', district: 'Hathras', loanAmount: 300000, status: 'Active', landSize: '10.5 Acres', crop: 'Wheat', lastRepayment: '2025-02-11', yieldIndex: 1.2 },
  { id: 'FRM-021', name: 'Vinod Chand', score: 48, risk: 'High', district: 'Bijnor', loanAmount: 55000, status: 'Review', landSize: '1.7 Acres', crop: 'Sugarcane', lastRepayment: '2024-12-05', yieldIndex: 0.8 },
  { id: 'FRM-022', name: 'Komal Singh', score: 70, risk: 'Low', district: 'Amroha', loanAmount: 185000, status: 'Active', landSize: '4.5 Acres', crop: 'Rice', lastRepayment: '2025-02-04', yieldIndex: 1.05 },
  { id: 'FRM-023', name: 'Sohan Lal', score: 57, risk: 'Medium', district: 'Rampur', loanAmount: 105000, status: 'Active', landSize: '2.8 Acres', crop: 'Maize', lastRepayment: '2025-01-18', yieldIndex: 0.95 },
  { id: 'FRM-024', name: 'Usha Devi', score: 77, risk: 'Low', district: 'Pilibhit', loanAmount: 240000, status: 'Active', landSize: '6.2 Acres', crop: 'Wheat', lastRepayment: '2025-02-09', yieldIndex: 1.15 },
  { id: 'FRM-025', name: 'Ram Prasad', score: 40, risk: 'High', district: 'Hardoi', loanAmount: 48000, status: 'Flagged', landSize: '1.3 Acres', crop: 'Rice', lastRepayment: '2024-11-20', yieldIndex: 0.65 },
  { id: 'FRM-026', name: 'Preeti Kumari', score: 68, risk: 'Medium', district: 'Unnao', loanAmount: 125000, status: 'Active', landSize: '3.2 Acres', crop: 'Mustard', lastRepayment: '2025-01-29', yieldIndex: 1.0 },
  { id: 'FRM-027', name: 'Suresh Mani', score: 84, risk: 'Low', district: 'Basti', loanAmount: 350000, status: 'Active', landSize: '13.2 Acres', crop: 'Wheat', lastRepayment: '2025-02-13', yieldIndex: 1.35 },
  { id: 'FRM-028', name: 'Nisha Bano', score: 53, risk: 'Medium', district: 'Mau', loanAmount: 82000, status: 'Active', landSize: '2.2 Acres', crop: 'Pulses', lastRepayment: '2025-01-12', yieldIndex: 0.88 },
  { id: 'FRM-029', name: 'Alok Nath', score: 72, risk: 'Low', district: 'Deoria', loanAmount: 210000, status: 'Active', landSize: '5.4 Acres', crop: 'Potatoes', lastRepayment: '2025-02-06', yieldIndex: 1.12 },
  { id: 'FRM-030', name: 'Mamta Soni', score: 44, risk: 'High', district: 'Sultanpur', loanAmount: 52000, status: 'Review', landSize: '1.6 Acres', crop: 'Wheat', lastRepayment: '2024-12-28', yieldIndex: 0.78 },
];

export const regionalRisk = [
  { region: 'East UP', score: 68, risk: 'Moderate', trend: 'up' },
  { region: 'West UP', score: 72, risk: 'Low', trend: 'stable' },
  { region: 'Central UP', score: 64, risk: 'Moderate', trend: 'down' },
  { region: 'Bundelkhand', score: 52, risk: 'High', trend: 'down' },
];

export const portfolioMonthlyTrends = [
  { month: 'Sep', disbursed: 12.5, collection: 11.2, npas: 0.8 },
  { month: 'Oct', disbursed: 15.2, collection: 13.8, npas: 0.7 },
  { month: 'Nov', disbursed: 18.4, collection: 14.2, npas: 0.9 },
  { month: 'Dec', disbursed: 22.1, collection: 19.5, npas: 1.1 },
  { month: 'Jan', disbursed: 28.5, collection: 25.8, npas: 1.0 },
  { month: 'Feb', disbursed: 32.2, collection: 29.4, npas: 0.9 },
];

export const cropDistribution = [
  { crop: 'Wheat', share: 35, avgYield: 1.2, riskIndex: 0.2 },
  { crop: 'Rice', share: 25, avgYield: 1.1, riskIndex: 0.3 },
  { crop: 'Sugarcane', share: 15, avgYield: 1.4, riskIndex: 0.4 },
  { crop: 'Maize', share: 10, avgYield: 1.0, riskIndex: 0.5 },
  { crop: 'Others', share: 15, avgYield: 0.9, riskIndex: 0.3 },
];

export const pendingLoans = [
  { id: 'LNR-901', farmerId: 'FRM-004', name: 'Priya Sharma', amount: 50000, date: '2025-01-15', score: 45, status: 'In Review' },
  { id: 'LNR-902', farmerId: 'FRM-102', name: 'Kamal Nath', amount: 120000, date: '2025-01-16', score: 68, status: 'Pending Verification' },
  { id: 'LNR-903', farmerId: 'FRM-125', name: 'Sita Ram', amount: 85000, date: '2025-01-16', score: 72, status: 'Documents Uploaded' },
  { id: 'LNR-904', farmerId: 'FRM-088', name: 'Arjun Dev', amount: 210000, date: '2025-01-17', score: 55, status: 'Field Visit Scheduled' },
];

export const fraudAlerts = [
  { id: 'FA-001', farmerId: 'FRM-007', type: 'Yield Spike', message: 'Reported yield 3x above regional average', severity: 'High', date: '2025-01-10' },
  { id: 'FA-002', farmerId: 'FRM-004', type: 'Duplicate Land', message: 'Land parcel overlaps with FRM-112', severity: 'Medium', date: '2025-01-08' },
  { id: 'FA-003', farmerId: 'FRM-023', type: 'Satellite Mismatch', message: 'NDVI shows barren land, crop declared', severity: 'High', date: '2025-01-05' },
];

export const mlInsights = {
  topFeatures: [
    { name: 'Repayment History', importance: 0.28, direction: 'positive' },
    { name: 'Crop Yield Ratio', importance: 0.22, direction: 'positive' },
    { name: 'Land Size', importance: 0.15, direction: 'neutral' },
    { name: 'Rainfall Deviation', importance: 0.18, direction: 'negative' },
    { name: 'Market Price Trend', importance: 0.12, direction: 'positive' },
  ],
  confidenceLevel: 87,
  modelVersion: '3.2.1',
  lastRetrained: '2025-01-01',
  performanceMetrics: {
    accuracy: 91.2,
    precision: 89.5,
    recall: 88.7,
    f1Score: 89.1,
  },
};

export const navLinks = {
  farmer: [
    { name: 'Dashboard', path: '/farmer/dashboard', icon: 'LayoutDashboard' },
    { name: 'My Profile', path: '/farmer/profile', icon: 'User' },
    { name: 'Crops', path: '/farmer/crops', icon: 'Sprout' },
    { name: 'Trust Score', path: '/farmer/score', icon: 'Shield' },
    { name: 'Loan Info', path: '/farmer/loans', icon: 'Wallet' },
    { name: 'Weather', path: '/farmer/weather', icon: 'CloudSun' },
    { name: 'Market', path: '/farmer/market', icon: 'TrendingUp' },
    { name: 'Improve Score', path: '/farmer/improve', icon: 'ArrowUpCircle' },
  ],
  lender: [
    { name: 'Dashboard', path: '/lender/dashboard', icon: 'LayoutDashboard' },
    { name: 'Farmers', path: '/lender/farmers', icon: 'Users' },
    { name: 'Loan Decisions', path: '/lender/decisions', icon: 'ClipboardCheck' },
    { name: 'Portfolio Analytics', path: '/lender/analytics', icon: 'BarChart3' },
    { name: 'Fraud & Alerts', path: '/lender/fraud', icon: 'AlertTriangle' },
    { name: 'Settings', path: '/lender/settings', icon: 'Settings' },
  ],
};
