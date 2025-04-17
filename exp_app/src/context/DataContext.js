import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useSettings } from './SettingsContext';
import { useLayout } from './LayoutContext';
import { useNotification } from './NotificationContext';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const { settings } = useSettings();
  const { showError } = useNotification();
  const {
    currentView,
    currentFilter,
    currentDateRange,
    currentCategory,
    currentStatus,
    currentDepartment,
    currentUser,
    currentAmountRange,
    currentSort,
    currentSortOrder,
    currentPageSize,
  } = useLayout();

  const [data, setData] = useState({
    expenses: [],
    users: [],
    departments: [],
    categories: [],
    statuses: [],
    filters: [],
    views: [],
    dateRanges: [],
    amountRanges: [],
    sorts: [],
    sortOrders: [],
    pageSizes: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(currentPageSize);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [
    user,
    currentView,
    currentFilter,
    currentDateRange,
    currentCategory,
    currentStatus,
    currentDepartment,
    currentUser,
    currentAmountRange,
    currentSort,
    currentSortOrder,
    currentPageSize,
    page,
    rowsPerPage,
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/data', {
        params: {
          view: currentView,
          filter: currentFilter,
          dateRange: currentDateRange,
          category: currentCategory,
          status: currentStatus,
          department: currentDepartment,
          user: currentUser,
          amountRange: currentAmountRange,
          sort: currentSort,
          sortOrder: currentSortOrder,
          page,
          pageSize: rowsPerPage,
        },
      });
      setData(response.data.data);
      setTotal(response.data.total);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch data');
      showError(error.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const createData = async (type, data) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/${type}`, data);
      setData(prev => ({
        ...prev,
        [type]: [...prev[type], response.data],
      }));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || `Failed to create ${type}`);
      showError(error.response?.data?.message || `Failed to create ${type}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (type, id, data) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/${type}/${id}`, data);
      setData(prev => ({
        ...prev,
        [type]: prev[type].map(item => 
          item.id === id ? response.data : item
        ),
      }));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || `Failed to update ${type}`);
      showError(error.response?.data?.message || `Failed to update ${type}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (type, id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${type}/${id}`);
      setData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id),
      }));
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || `Failed to delete ${type}`);
      showError(error.response?.data?.message || `Failed to delete ${type}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const value = {
    data,
    loading,
    error,
    total,
    page,
    rowsPerPage,
    createData,
    updateData,
    deleteData,
    handleChangePage,
    handleChangeRowsPerPage,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext; 