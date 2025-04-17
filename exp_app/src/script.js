// Utility functions for the Expense Management System

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get status color
export const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
      return 'error';
    default:
      return 'default';
  }
};

// Get role color
export const getRoleColor = (role) => {
  switch (role) {
    case 'ADMIN':
      return 'error';
    case 'MANAGER':
      return 'warning';
    case 'EMPLOYEE':
      return 'success';
    default:
      return 'default';
  }
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

// Get user initials
export const getUserInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Merge objects
export const mergeObjects = (target, source) => {
  return { ...target, ...source };
};

// Remove duplicates from array
export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

// Sort array by property
export const sortByProperty = (array, property, order = 'asc') => {
  return array.sort((a, b) => {
    if (order === 'asc') {
      return a[property] > b[property] ? 1 : -1;
    } else {
      return a[property] < b[property] ? 1 : -1;
    }
  });
};

// Filter array by search term
export const filterBySearch = (array, searchTerm, properties) => {
  if (!searchTerm) return array;
  return array.filter(item => {
    return properties.some(property => {
      const value = item[property];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  });
};

// Group array by property
export const groupBy = (array, property) => {
  return array.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

// Calculate total
export const calculateTotal = (array, property) => {
  return array.reduce((acc, obj) => acc + obj[property], 0);
};

// Calculate average
export const calculateAverage = (array, property) => {
  if (array.length === 0) return 0;
  return calculateTotal(array, property) / array.length;
};

// Format percentage
export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(2)}%`;
};

// Get month name
export const getMonthName = (date) => {
  return new Date(date).toLocaleString('default', { month: 'long' });
};

// Get day name
export const getDayName = (date) => {
  return new Date(date).toLocaleString('default', { weekday: 'long' });
};

// Get time ago
export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return Math.floor(seconds) + ' seconds ago';
};

// Capitalize first letter
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Generate random color
export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};

// Check if date is today
export const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

// Check if date is this week
export const isThisWeek = (date) => {
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  return date >= weekStart && date <= weekEnd;
};

// Check if date is this month
export const isThisMonth = (date) => {
  const today = new Date();
  return date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

// Check if date is this year
export const isThisYear = (date) => {
  return date.getFullYear() === new Date().getFullYear();
};

// Get days between dates
export const getDaysBetweenDates = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get months between dates
export const getMonthsBetweenDates = (date1, date2) => {
  return (date2.getFullYear() - date1.getFullYear()) * 12 + 
         (date2.getMonth() - date1.getMonth());
};

// Get years between dates
export const getYearsBetweenDates = (date1, date2) => {
  return date2.getFullYear() - date1.getFullYear();
};

// Format duration
export const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

// Check if value is number
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Check if value is string
export const isString = (value) => {
  return typeof value === 'string';
};

// Check if value is object
export const isObject = (value) => {
  return typeof value === 'object' && value !== null;
};

// Check if value is array
export const isArray = (value) => {
  return Array.isArray(value);
};

// Check if value is function
export const isFunction = (value) => {
  return typeof value === 'function';
};

// Check if value is null or undefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

// Check if value is empty
export const isEmptyValue = (value) => {
  if (isNullOrUndefined(value)) return true;
  if (isString(value)) return value.trim() === '';
  if (isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
};

// Get object keys
export const getObjectKeys = (obj) => {
  return Object.keys(obj);
};

// Get object values
export const getObjectValues = (obj) => {
  return Object.values(obj);
};

// Get object entries
export const getObjectEntries = (obj) => {
  return Object.entries(obj);
};

// Map object
export const mapObject = (obj, fn) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value, key)])
  );
};

// Filter object
export const filterObject = (obj, fn) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => fn(value, key))
  );
};

// Reduce object
export const reduceObject = (obj, fn, initialValue) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => fn(acc, value, key),
    initialValue
  );
};

// Pick object properties
export const pick = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

// Omit object properties
export const omit = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
};

// Default export
export default {
  formatCurrency,
  formatDate,
  getStatusColor,
  getRoleColor,
  validateEmail,
  validatePassword,
  getUserInitials,
  getFileExtension,
  formatFileSize,
  debounce,
  truncateText,
  generateId,
  isEmpty,
  deepClone,
  mergeObjects,
  removeDuplicates,
  sortByProperty,
  filterBySearch,
  groupBy,
  calculateTotal,
  calculateAverage,
  formatPercentage,
  getMonthName,
  getDayName,
  getTimeAgo,
  capitalizeFirstLetter,
  generateRandomColor,
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  getDaysBetweenDates,
  getMonthsBetweenDates,
  getYearsBetweenDates,
  formatDuration,
  isNumber,
  isString,
  isObject,
  isArray,
  isFunction,
  isNullOrUndefined,
  isEmptyValue,
  getObjectKeys,
  getObjectValues,
  getObjectEntries,
  mapObject,
  filterObject,
  reduceObject,
  pick,
  omit
}; 