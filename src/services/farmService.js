import axios from 'axios';
import API_BASE_URL from '../lib/api';
import { getToken } from './authService';

/**
 * Farm Service
 * Handles farm management API calls
 */

// Get axios config with auth token
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

/**
 * Add a new farm
 * @param {Object} farmData - Farm details
 * @param {string} farmData.farmer_id - Farmer ID
 * @param {number} farmData.land_size_acres - Land size in acres
 * @param {string} farmData.ownership_type - Ownership type (Owned/Leased/Rented)
 * @param {number} farmData.gps_lat - GPS latitude
 * @param {number} farmData.gps_long - GPS longitude
 * @param {string} farmData.state - State
 * @param {string} farmData.district - District
 * @param {string} farmData.village - Village
 * @param {string} farmData.soil_type - Soil type (optional)
 * @param {string} farmData.irrigation_type - Irrigation type (optional)
 * @returns {Promise} - Created farm data
 */
export const addFarm = async (farmData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/farm/add`,
      farmData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Add farm error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get all farms for a farmer
 * @param {string} farmer_id - Farmer ID
 * @returns {Promise} - List of farms
 */
export const getFarmsByFarmer = async (farmer_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/farm/${farmer_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get farms error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get specific farm details
 * @param {string} farm_id - Farm ID
 * @returns {Promise} - Farm details
 */
export const getFarmDetails = async (farm_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/farm/details/${farm_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get farm details error:', error);
    throw error.response?.data || error;
  }
};
