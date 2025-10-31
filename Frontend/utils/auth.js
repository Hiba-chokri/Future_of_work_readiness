// Authentication utilities with FastAPI backend integration
import { authAPI, testConnection } from './api.jsx';

// User data structure (for frontend use)
const createUser = (userData) => ({
  ...userData,
  readinessScore: userData.readinessScore || 0,
  technicalScore: userData.technicalScore || 0,
  softSkillsScore: userData.softSkillsScore || 0,
  leadershipScore: userData.leadershipScore || 0,
  completedTests: userData.completedTests || [],
  badges: userData.badges || [],
  recentActivity: userData.recentActivity || []
});

// Register a new user
export const registerUser = async (email, password, name) => {
  try {
    // Test API connection first
    const connectionTest = await testConnection();
    if (!connectionTest.success) {
      throw new Error('Cannot connect to server. Please ensure the backend is running.');
    }

    // Register user with backend
    const userData = {
      email,
      password,
      name
    };
    
    const response = await authAPI.register(userData);
    
    if (response.user) {
      const user = createUser(response.user);
      // Set current user in localStorage for session management
      setCurrentUser(user);
      return { success: true, user };
    } else {
      throw new Error(response.message || 'Registration failed');
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    // Test API connection first
    const connectionTest = await testConnection();
    if (!connectionTest.success) {
      throw new Error('Cannot connect to server. Please ensure the backend is running.');
    }

    // Login with backend
    const credentials = { email, password };
    const response = await authAPI.login(credentials);
    
    if (response.user) {
      const user = createUser(response.user);
      // Set current user in localStorage for session management
      setCurrentUser(user);
      return { success: true, user };
    } else {
      throw new Error(response.message || 'Login failed');
    }
    
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

// Get current user
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// Set current user
export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Check if user is logged in
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};

// Update user data (fallback to localStorage for now)
export const updateUser = (updatedUser) => {
  try {
    setCurrentUser(updatedUser);
    return { success: true, user: updatedUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update user's selected industry
export const updateUserIndustry = async (industry) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'No user logged in' };
  }
  
  try {
    // Test API connection first
    const connectionTest = await testConnection();
    if (!connectionTest.success) {
      throw new Error('Cannot connect to server. Please ensure the backend is running.');
    }

    // Update industry with backend
    const industryData = { industry };
    const response = await authAPI.updateIndustry(currentUser.id, industryData);
    
    if (response.user) {
      const updatedUser = createUser(response.user);
      setCurrentUser(updatedUser);
      return { success: true, user: updatedUser };
    } else {
      throw new Error(response.message || 'Industry update failed');
    }
    
  } catch (error) {
    console.error('Industry update error:', error);
    // Fallback to local update if backend fails
    const updatedUser = { ...currentUser, industry };
    setCurrentUser(updatedUser);
    return { success: true, user: updatedUser, warning: 'Updated locally: ' + error.message };
  }
};

// Update user's scores
export const updateUserScores = (scores) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...scores };
    return updateUser(updatedUser);
  }
  return { success: false, error: 'No user logged in' };
};
