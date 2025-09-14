import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ApiProvider } from './context/ApiProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <ApiProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <Dashboard />
            <Footer />
          </div>
        </ApiProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
