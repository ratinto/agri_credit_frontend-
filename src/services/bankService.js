import axios from 'axios';
import API_BASE_URL from '../lib/api';
import { getToken } from './authService';

/**
 * Bank Service
 * Handles all bank-side API calls
 */

// Get axios config with auth token
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

/**
 * Get all pending loan applications
 * @returns {Promise} - List of pending loan applications
 */
export const getPendingLoanApplications = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/bank/loan-applications`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get pending loans error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get farmer complete profile
 * @param {string} farmer_id - Farmer ID
 * @returns {Promise} - Farmer profile with farms, crops, trust score
 */
export const getFarmerProfile = async (farmer_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/bank/farmer/${farmer_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get farmer profile error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get credit score breakdown for a farmer
 * @param {string} farmer_id - Farmer ID
 * @returns {Promise} - Credit score breakdown
 */
export const getCreditScoreBreakdown = async (farmer_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/bank/score-breakdown/${farmer_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get score breakdown error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Filter loan applications
 * @param {Object} filters - Filter criteria
 * @returns {Promise} - Filtered loan applications
 */
export const filterLoanApplications = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/bank/filter?${params}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Filter loans error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Approve a loan application
 * @param {Object} loanData - Loan approval data
 * @returns {Promise} - Approval response with EMI calculation
 */
export const approveLoan = async (loanData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/bank/loan/approve`,
      loanData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Approve loan error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Reject a loan application
 * @param {Object} rejectionData - Loan rejection data
 * @returns {Promise} - Rejection response
 */
export const rejectLoan = async (rejectionData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/bank/loan/reject`,
      rejectionData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Reject loan error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Disburse approved loan
 * @param {Object} disbursementData - Disbursement data
 * @returns {Promise} - Disbursement response with transaction ID
 */
export const disburseLoan = async (disbursementData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/bank/loan/disburse`,
      disbursementData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Disburse loan error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get repayment schedule for a loan
 * @param {string} loan_id - Loan ID
 * @returns {Promise} - Repayment schedule
 */
export const getRepaymentSchedule = async (loan_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/bank/loan/schedule/${loan_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get repayment schedule error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Track loan status
 * @param {string} loan_id - Loan ID
 * @returns {Promise} - Loan tracking information
 */
export const trackLoan = async (loan_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/bank/loan/track/${loan_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Track loan error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get dashboard statistics
 * This is a helper that combines multiple API calls
 */
export const getDashboardStats = async () => {
  try {
    const [pendingLoans, profile] = await Promise.all([
      getPendingLoanApplications(),
      axios.get(`${API_BASE_URL}/api/v1/bank/profile`, getConfig())
    ]);

    return {
      pendingLoans: pendingLoans.data || [],
      profile: profile.data.data || {},
      totalApplications: pendingLoans.data?.length || 0
    };
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    throw error;
  }
};
