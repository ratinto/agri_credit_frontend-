import axios from 'axios';
import API_BASE_URL from '../lib/api';
import { getToken } from './authService';

/**
 * Validation Service
 * Handles external data validation APIs (Weather, NDVI, Market Prices)
 */

// Get axios config with auth token
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

/**
 * Fetch NDVI (Normalized Difference Vegetation Index) data for a farm
 * Uses satellite imagery to assess crop health
 * @param {string} farm_id - Farm ID
 * @returns {Promise} - NDVI data with health status
 */
export const fetchNDVI = async (farm_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/validation/ndvi/${farm_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Fetch NDVI error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Fetch weather data for a farm location
 * @param {string} farm_id - Farm ID
 * @returns {Promise} - Weather data including temperature, rainfall, forecast
 */
export const fetchWeather = async (farm_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/validation/weather/${farm_id}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Fetch weather error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Fetch market price for a crop
 * @param {string} crop - Crop type (e.g., "Wheat", "Rice")
 * @returns {Promise} - Market price data with trends
 */
export const fetchMarketPrice = async (crop) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/validation/market-price/${crop}`,
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Fetch market price error:', error);
    throw error.response?.data || error;
  }
};
