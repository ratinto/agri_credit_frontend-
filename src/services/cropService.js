import axios from 'axios';
import API_BASE_URL from '../lib/api';
import { getToken } from './authService';

/**
 * Crop Service
 * Handles crop management API calls
 */

// Get axios config with auth token
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

/**
 * Add a new crop
 * @param {Object} cropData - Crop details
 * @param {string} cropData.farm_id - Farm ID
 * @param {string} cropData.crop_type - Crop type (Wheat, Rice, etc.)
 * @param {string} cropData.season - Season (Kharif, Rabi, Zaid)
 * @param {number} cropData.sowing_area_acres - Sowing area in acres
 * @param {string} cropData.sowing_date - Sowing date (YYYY-MM-DD)
 * @param {string} cropData.expected_harvest_date - Expected harvest date (optional)
 * @param {number} cropData.expected_yield_qtl - Expected yield in quintals (optional)
 * @returns {Promise} - Created crop data
 */
export const addCrop = async (cropData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/crop/add`,
      cropData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Add crop error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get all crops for a farm
 * @param {string} farm_id - Farm ID
 * @returns {Promise} - List of crops
 */
export const getCropsByFarm = async (farm_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/crop/${farm_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get crops error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get specific crop details
 * @param {string} crop_id - Crop ID
 * @returns {Promise} - Crop details
 */
export const getCropDetails = async (crop_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/crop/details/${crop_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Get crop details error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Update crop information (harvest, yield, etc.)
 * @param {string} crop_id - Crop ID
 * @param {Object} updateData - Update data
 * @param {string} updateData.status - Crop status (optional)
 * @param {string} updateData.harvest_date - Actual harvest date (optional)
 * @param {number} updateData.actual_yield_qtl - Actual yield (optional)
 * @param {number} updateData.revenue_earned - Revenue earned (optional)
 * @returns {Promise} - Updated crop data
 */
export const updateCrop = async (crop_id, updateData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/crop/update/${crop_id}`,
      updateData,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Update crop error:', error);
    throw error.response?.data || error;
  }
};
