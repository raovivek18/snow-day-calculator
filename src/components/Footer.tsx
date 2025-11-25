
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-primary mb-4">
                <img 
                  src="/lovable-uploads/27347efa-1b23-4be1-bc57-9619431c55f9.png" 
                  alt="Snowflake Logo" 
                  className="h-6 w-6" 
                />
                <span className="font-semibold text-lg">Snow Day Calculator</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Your ultimate tool to predict whether your school might close
                tomorrow due to snow and extreme weather.
              </p>
            </div>
            
            <div className="flex flex-col md:items-end justify-center">
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row md:justify-between items-center">
            <p>
              &copy; {currentYear} Snow Day Calculator. All rights reserved.
            </p>
            <p className="mt-2 md:mt-0">
              Weather data provided by{" "}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Open-Meteo
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
