import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FoodLog from './components/FoodLog';
import SymptomLog from './components/SymptomLog';
import DataVisualization from './components/DataVisualization';  // Import Data Visualization
import CorrelationAnalysis from './components/CorrelationAnalysis';  // Import Correlation Analysis
import FoodRecommendation from './components/FoodRecommendation';  // Import AI Recommendations
import GenerateReport from './components/GenerateReport';  // Import Report Generation
import Register from './components/Register';
import Login from './components/Login';
import '@fontsource/inter';

const theme = createTheme({
  palette: {
    primary: { main: '#000000' },
    background: { default: '#f5f5f5' },
    text: { primary: '#000000', secondary: '#4d4d4d' },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h2: { fontWeight: 700, fontSize: '2.5rem', color: '#ffffff' },
    h4: { fontWeight: 500, fontSize: '1.75rem' },
    body1: { fontSize: '1rem', fontWeight: 400 },
  },
});

function Navigation({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate(); // For redirect

  return (
    <nav style={{ backgroundColor: '#000000', padding: '10px', display: 'flex', justifyContent: 'space-between', color: '#ffffff' }}>
      <h2 style={{ margin: 0 }}>TRenalGI</h2>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/register" style={{ color: '#ffffff', marginRight: '15px' }}>Register</Link>
            <Link to="/login" style={{ color: '#ffffff', marginRight: '15px' }}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/food-log" style={{ color: '#ffffff', marginRight: '15px' }}>Food Log</Link>
            <Link to="/symptom-log" style={{ color: '#ffffff', marginRight: '15px' }}>Symptom Log</Link>
            <Link to="/data-visualization" style={{ color: '#ffffff', marginRight: '15px' }}>Data Visualization</Link>
            <Link to="/food-recommendation" style={{ color: '#ffffff', marginRight: '15px' }}>AI Recommendations</Link>
            <Link to="/generate-report" style={{ color: '#ffffff', marginRight: '15px' }}>Generate Report</Link>
            <button
              onClick={() => {
                handleLogout();
                navigate('/login'); // Redirect to login on logout
                window.location.reload(); // Force refresh to update state
              }}
              style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Check if token is present
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/food-log" element={<FoodLog />} />
          <Route path="/symptom-log" element={<SymptomLog />} />
          <Route path="/data-visualization" element={<DataVisualization />} />
          <Route path="/correlation-analysis" element={<CorrelationAnalysis />} />
          <Route path="/food-recommendation" element={<FoodRecommendation />} />
          <Route path="/generate-report" element={<GenerateReport />} />
          <Route exact path="/" element={<h3 style={{ textAlign: 'center' }}>Welcome to TRenalGI</h3>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
