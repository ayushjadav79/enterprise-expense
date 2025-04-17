import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expenseData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/expenses', expenseData);
      setExpenses(prev => [...prev, response.data]);
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/expenses/${id}`, expenseData);
      setExpenses(prev => prev.map(expense => 
        expense.id === id ? response.data : expense
      ));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const approveExpense = async (id, comment) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/expenses/${id}/approve`, { comment });
      setExpenses(prev => prev.map(expense => 
        expense.id === id ? response.data : expense
      ));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to approve expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectExpense = async (id, comment) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/expenses/${id}/reject`, { comment });
      setExpenses(prev => prev.map(expense => 
        expense.id === id ? response.data : expense
      ));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reject expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getExpenseById = (id) => {
    return expenses.find(expense => expense.id === id);
  };

  const getExpensesByStatus = (status) => {
    return expenses.filter(expense => expense.status === status);
  };

  const getExpensesByUser = (userId) => {
    return expenses.filter(expense => expense.userId === userId);
  };

  const getExpensesByDateRange = (startDate, endDate) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  };

  const getExpensesByCategory = (category) => {
    return expenses.filter(expense => expense.category === category);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getTotalExpensesByStatus = (status) => {
    return getExpensesByStatus(status).reduce((total, expense) => total + expense.amount, 0);
  };

  const getTotalExpensesByUser = (userId) => {
    return getExpensesByUser(userId).reduce((total, expense) => total + expense.amount, 0);
  };

  const getTotalExpensesByCategory = (category) => {
    return getExpensesByCategory(category).reduce((total, expense) => total + expense.amount, 0);
  };

  const getTotalExpensesByDateRange = (startDate, endDate) => {
    return getExpensesByDateRange(startDate, endDate).reduce((total, expense) => total + expense.amount, 0);
  };

  const value = {
    expenses,
    loading,
    error,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    approveExpense,
    rejectExpense,
    getExpenseById,
    getExpensesByStatus,
    getExpensesByUser,
    getExpensesByDateRange,
    getExpensesByCategory,
    getTotalExpenses,
    getTotalExpensesByStatus,
    getTotalExpensesByUser,
    getTotalExpensesByCategory,
    getTotalExpensesByDateRange,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export default ExpenseContext; 