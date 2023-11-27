import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Function to safely get localStorage if it's available
const getStorage = () => {
  if (typeof window !== 'undefined') {
    // We're in the browser
    return localStorage;
  }
  // If we're on the server, return a dummy storage (no-op)
  return {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
  };
};

const useAuthStore = create(set => ({
    token: getStorage().getItem('token') || null,
    isLoggedIn: !!getStorage().getItem('token'),
    login: (token) => {
      getStorage().setItem('token', token);
      set({ token: token, isLoggedIn: true });
    },
    logout: () => {
      getStorage().removeItem('token');
      set({ token: null, isLoggedIn: false });
    },
  }));

export default useAuthStore;
