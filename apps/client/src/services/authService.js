import api from './api';

// Login with Google
export const loginWithGoogle = async (credential) => {
  try {
    const { data } = await api.post('/auth/google', { token: credential });
    localStorage.setItem('token', credential);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const { data } = await api.get('/users/profile');
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const { data } = await api.put('/users/profile', profileData);
    return data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};