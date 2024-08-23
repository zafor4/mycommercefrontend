import axios from 'axios';

const API_URL = '/api/auth/google';

export const loginWithGoogle = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: false // Ensure credentials aren't sent
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
};