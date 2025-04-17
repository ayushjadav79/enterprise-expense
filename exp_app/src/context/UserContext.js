import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users', userData);
      setUsers(prev => [...prev, response.data]);
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/users/${id}`, userData);
      setUsers(prev => prev.map(user => 
        user.id === id ? response.data : user
      ));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/users/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  const getUsersByRole = (role) => {
    return users.filter(user => user.role === role);
  };

  const getUsersByDepartment = (department) => {
    return users.filter(user => user.department === department);
  };

  const getActiveUsers = () => {
    return users.filter(user => user.isActive);
  };

  const getInactiveUsers = () => {
    return users.filter(user => !user.isActive);
  };

  const activateUser = async (id) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/users/${id}/activate`);
      setUsers(prev => prev.map(user => 
        user.id === id ? response.data : user
      ));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to activate user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deactivateUser = async (id) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/users/${id}/deactivate`);
      setUsers(prev => prev.map(user => 
        user.id === id ? response.data : user
      ));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to deactivate user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (id) => {
    try {
      setLoading(true);
      await axios.post(`/api/users/${id}/reset-password`);
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsersByRole,
    getUsersByDepartment,
    getActiveUsers,
    getInactiveUsers,
    activateUser,
    deactivateUser,
    resetPassword,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 