import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSettings } from './SettingsContext';

const LayoutContext = createContext(null);

export const LayoutProvider = ({ children }) => {
  const { settings } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(settings.showSidebar);
  const [compactMode, setCompactMode] = useState(settings.compactMode);
  const [currentView, setCurrentView] = useState(settings.defaultView);
  const [currentFilter, setCurrentFilter] = useState(settings.defaultFilter);
  const [currentDateRange, setCurrentDateRange] = useState(settings.defaultDateRange);
  const [currentCategory, setCurrentCategory] = useState(settings.defaultCategory);
  const [currentStatus, setCurrentStatus] = useState(settings.defaultStatus);
  const [currentDepartment, setCurrentDepartment] = useState(settings.defaultDepartment);
  const [currentUser, setCurrentUser] = useState(settings.defaultUser);
  const [currentAmountRange, setCurrentAmountRange] = useState(settings.defaultAmountRange);
  const [currentSort, setCurrentSort] = useState(settings.defaultSort);
  const [currentSortOrder, setCurrentSortOrder] = useState(settings.defaultSortOrder);
  const [currentPageSize, setCurrentPageSize] = useState(settings.defaultPageSize);

  useEffect(() => {
    setSidebarOpen(settings.showSidebar);
  }, [settings.showSidebar]);

  useEffect(() => {
    setCompactMode(settings.compactMode);
  }, [settings.compactMode]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => !prev);
  };

  const setView = (view) => {
    setCurrentView(view);
  };

  const setFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const setDateRange = (dateRange) => {
    setCurrentDateRange(dateRange);
  };

  const setCategory = (category) => {
    setCurrentCategory(category);
  };

  const setStatus = (status) => {
    setCurrentStatus(status);
  };

  const setDepartment = (department) => {
    setCurrentDepartment(department);
  };

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const setAmountRange = (amountRange) => {
    setCurrentAmountRange(amountRange);
  };

  const setSort = (sort) => {
    setCurrentSort(sort);
  };

  const setSortOrder = (sortOrder) => {
    setCurrentSortOrder(sortOrder);
  };

  const setPageSize = (pageSize) => {
    setCurrentPageSize(pageSize);
  };

  const resetLayout = () => {
    setSidebarOpen(settings.showSidebar);
    setCompactMode(settings.compactMode);
    setCurrentView(settings.defaultView);
    setCurrentFilter(settings.defaultFilter);
    setCurrentDateRange(settings.defaultDateRange);
    setCurrentCategory(settings.defaultCategory);
    setCurrentStatus(settings.defaultStatus);
    setCurrentDepartment(settings.defaultDepartment);
    setCurrentUser(settings.defaultUser);
    setCurrentAmountRange(settings.defaultAmountRange);
    setCurrentSort(settings.defaultSort);
    setCurrentSortOrder(settings.defaultSortOrder);
    setCurrentPageSize(settings.defaultPageSize);
  };

  const value = {
    sidebarOpen,
    compactMode,
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
    toggleSidebar,
    toggleCompactMode,
    setView,
    setFilter,
    setDateRange,
    setCategory,
    setStatus,
    setDepartment,
    setUser,
    setAmountRange,
    setSort,
    setSortOrder,
    setPageSize,
    resetLayout,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export default LayoutContext; 