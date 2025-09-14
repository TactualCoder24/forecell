import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import SettingsPanel from './SettingsPanel';
import ecellLogo from '../assets/ecell logo.jpg';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Branding */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  src={ecellLogo} 
                  alt="E-Cell Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  E-Cell Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">Analytics & Insights</p>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all duration-200"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-4 w-4" />
                ) : (
                  <MoonIcon className="h-4 w-4" />
                )}
              </button>
              <SettingsPanel />
            </div>
            
            <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
              <span>Made by</span>
              <a 
                href="https://github.com/apaarshakti" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Apaarshakti
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
