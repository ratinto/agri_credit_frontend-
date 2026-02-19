import axios from 'axios';
import API_BASE_URL from '../lib/api';
import { getToken } from './authService';

/**
 * Loan Service
 * Handles all loan-related API calls for farmers
 */

// Get axios config with auth token
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

/**
 * Get personalized loan offers for a farmer
 * @param {string} farmer_id - Farmer ID
 * @returns {Promise} - List of loan offers based on trust score
 */
export const getLoanOffers = async (farmer_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/loan/offers/${farmer_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get loan offers error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Apply for a loan
 * @param {Object} loanData - Loan application data
 * @param {string} loanData.farmer_id - Farmer ID
 * @param {number} loanData.loan_amount - Loan amount
 * @param {number} loanData.interest_rate - Interest rate
 * @param {number} loanData.loan_duration_months - Loan duration in months
 * @param {string} loanData.loan_purpose - Purpose of loan
 * @param {string} loanData.lender_name - Lender name (optional)
 * @param {string} loanData.lender_type - Lender type (optional)
 * @returns {Promise} - Loan application response
 */
export const applyLoan = async (loanData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/loan/apply`,
      loanData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Apply loan error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get loan application status
 * @param {string} loan_id - Loan ID
 * @returns {Promise} - Loan status details
 */
export const getLoanStatus = async (loan_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/loan/status/${loan_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get loan status error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Accept a loan offer
 * @param {string} loan_id - Loan ID
 * @returns {Promise} - Acceptance response
 */
export const acceptLoan = async (loan_id) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/loan/accept/${loan_id}`,
      {},
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Accept loan error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get loan history for a farmer
 * @param {string} farmer_id - Farmer ID
 * @returns {Promise} - List of past and current loans
 */
export const getLoanHistory = async (farmer_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/loan/history/${farmer_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get loan history error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Make a loan repayment
 * @param {string} loan_id - Loan ID
 * @param {Object} repaymentData - Repayment details
 * @param {number} repaymentData.amount - Repayment amount
 * @param {string} repaymentData.payment_method - Payment method
 * @returns {Promise} - Repayment confirmation
 */
export const repayLoan = async (loan_id, repaymentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/loan/repay/${loan_id}`,
      repaymentData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Repay loan error:', error);
    throw error.response?.data || error;
  }
};
