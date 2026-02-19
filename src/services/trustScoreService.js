import axios from 'axios';
import API_BASE_URL from '../lib/api';
import { getToken } from './authService';

/**
 * Trust Score Service
 * Handles trust score calculation and retrieval
 */

// Get axios config with auth token
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

/**
 * Calculate or recalculate trust score for a farmer
 * @param {string} farmer_id - Farmer ID
 * @returns {Promise} - Updated trust score with breakdown
 */
export const calculateTrustScore = async (farmer_id) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/trust-score/calculate/${farmer_id}`,
      {},
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Calculate trust score error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get trust score details for a farmer
 * @param {string} farmer_id - Farmer ID
 * @returns {Promise} - Trust score with detailed breakdown
 */
export const getTrustScore = async (farmer_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/trust-score/${farmer_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get trust score error:', error);
    throw error.response?.data || error;
  }
};
