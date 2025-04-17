import React, { createContext, useState, useContext, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext(null);

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [layout, setLayout] = useState('default');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: mode === 'light' ? '#6b6b6b #f1f1f1' : '#6b6b6b #2b2b2b',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  width: 8,
                  height: 8,
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  backgroundColor: mode === 'light' ? '#6b6b6b' : '#6b6b6b',
                },
                '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                  borderRadius: 8,
                  backgroundColor: mode === 'light' ? '#f1f1f1' : '#2b2b2b',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const value = {
    mode,
    drawerOpen,
    layout,
    toggleTheme,
    toggleDrawer,
    setLayout,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 