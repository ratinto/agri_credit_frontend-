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
  { id: 'FRM-001', name: 'Rajesh Kumar', score: 74, risk: 'Low', district: 'Varanasi', loanAmount: 180000, status: 'Active' },
  { id: 'FRM-002', name: 'Sunita Devi', score: 62, risk: 'Medium', district: 'Allahabad', loanAmount: 95000, status: 'Active' },
  { id: 'FRM-003', name: 'Mohan Singh', score: 85, risk: 'Low', district: 'Agra', loanAmount: 320000, status: 'Active' },
  { id: 'FRM-004', name: 'Priya Sharma', score: 45, risk: 'High', district: 'Lucknow', loanAmount: 50000, status: 'Review' },
  { id: 'FRM-005', name: 'Vikram Yadav', score: 58, risk: 'Medium', district: 'Kanpur', loanAmount: 120000, status: 'Active' },
  { id: 'FRM-006', name: 'Lakshmi Bai', score: 71, risk: 'Low', district: 'Jhansi', loanAmount: 200000, status: 'Active' },
  { id: 'FRM-007', name: 'Amit Patel', score: 38, risk: 'High', district: 'Bareilly', loanAmount: 45000, status: 'Flagged' },
  { id: 'FRM-008', name: 'Geeta Mishra', score: 79, risk: 'Low', district: 'Varanasi', loanAmount: 250000, status: 'Active' },
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

// ===== ADMIN DATA =====
export const adminStats = {
  totalUsers: 15234,
  activeFarmers: 12847,
  activeLenders: 42,
  systemHealth: 98.5,
  dataQuality: 94.2,
  apiUptime: 99.9,
  modelsDeployed: 4,
  alertsPending: 7,
};

export const systemHealth = {
  cpu: 42,
  memory: 68,
  storage: 55,
  apiLatency: 120,
  activeConnections: 3420,
  errorRate: 0.02,
};

export const regionData = [
  { region: 'Uttar Pradesh', farmers: 4520, avgScore: 68, defaultRate: 3.8 },
  { region: 'Maharashtra', farmers: 3180, avgScore: 71, defaultRate: 3.2 },
  { region: 'Madhya Pradesh', farmers: 2340, avgScore: 64, defaultRate: 5.1 },
  { region: 'Rajasthan', farmers: 1560, avgScore: 59, defaultRate: 6.2 },
  { region: 'Bihar', farmers: 1247, avgScore: 61, defaultRate: 5.8 },
];

export const consentData = {
  totalConsents: 12847,
  activeConsents: 12340,
  revokedConsents: 507,
  pendingConsents: 234,
  consentRate: 96.1,
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
    { name: 'Risk Analysis', path: '/lender/risk', icon: 'Shield' },
    { name: 'Loan Engine', path: '/lender/loans', icon: 'Calculator' },
    { name: 'ML Insights', path: '/lender/ml', icon: 'Brain' },
    { name: 'Fraud Alerts', path: '/lender/fraud', icon: 'AlertTriangle' },
  ],
  admin: [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
    { name: 'Users', path: '/admin/users', icon: 'Users' },
    { name: 'Data Quality', path: '/admin/data', icon: 'Database' },
    { name: 'Models', path: '/admin/models', icon: 'Brain' },
    { name: 'Security', path: '/admin/security', icon: 'Lock' },
    { name: 'Settings', path: '/admin/settings', icon: 'Settings' },
  ],
};
