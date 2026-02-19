import axios from 'axios';
import API_BASE_URL from '../lib/api';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * Set authentication token in axios headers
 */
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

/**
 * Get token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Save token to localStorage
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token);
  setAuthToken(token);
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

/**
 * Save user data to localStorage
 */
export const saveUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get user data from localStorage
 */
export const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = () => {
  localStorage.removeItem('user');
};

/**
 * Bank Registration
 * @param {Object} bankData - Bank registration data
 * @param {string} bankData.bank_name - Bank name
 * @param {string} bankData.contact_person - Contact person name
 * @param {string} bankData.email - Bank email
 * @param {string} bankData.password - Bank password
 * @param {string} bankData.license_number - Bank license number
 * @param {string} bankData.bank_type - Bank type (optional, defaults to NBFC)
 * @returns {Promise} - Registration response with bank data
 */
export const bankRegister = async (bankData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/bank/register`, bankData);

    if (response.data.success) {
      return response.data;
    }

    throw new Error(response.data.message || 'Registration failed');
  } catch (error) {
    console.error('Bank registration error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Bank Login
 * @param {string} bank_id - Bank ID (e.g., BNK1004)
 * @param {string} password - Bank password
 * @returns {Promise} - Login response with token and bank data
 */
export const bankLogin = async (bank_id, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/bank/login`, {
      bank_id,
      password
    });

    console.log('Full backend response:', response.data);

    // Backend returns: { success, message, data: { token, bank_id, bank_name, email, role } }
    if (response.data.success && response.data.data && response.data.data.token) {
      const { token, ...bankData } = response.data.data;
      
      saveToken(token);
      saveUserData({
        ...bankData,
        role: 'BANK',
        userType: 'lender'
      });
      
      // Return in the format expected by LoginPage
      return {
        success: true,
        token,
        bank: bankData
      };
    }

    throw new Error(response.data.message || 'Login failed');
  } catch (error) {
    console.error('Bank login error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Farmer Login
 * @param {string} phone - Farmer phone number
 * @param {string} password - Farmer password
 * @returns {Promise} - Login response with token and farmer data
 */
export const farmerLogin = async (phone, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
      phone,
      password
    });

    if (response.data.token) {
      saveToken(response.data.token);
      saveUserData({
        ...response.data,
        role: 'FARMER',
        userType: 'farmer'
      });
      return response.data;
    }

    throw new Error(response.data.message || 'Login failed');
  } catch (error) {
    console.error('Farmer login error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Get Bank Profile
 * @returns {Promise} - Bank profile data
 */
export const getBankProfile = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/api/v1/bank/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Get bank profile error:', error);
    throw error.response?.data || error;
  }
};

/**
 * Logout
 */
export const logout = () => {
  removeToken();
  removeUserData();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return getUserData();
};
