import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background/50 backdrop-blur-xl border-t border-border/50 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Powered by</span>
              <a 
                href="https://github.com/apaarshakti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Apaarshakti
              </a>
              <span>for E-Cell</span>
            </div>
            <div className="text-xs text-muted-foreground">
              © {currentYear}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
