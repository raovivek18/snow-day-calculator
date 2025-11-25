
import React, { useState, useEffect } from "react";
import PageTransition from "@/components/transitions/PageTransition";
import CalculatorForm from "@/components/CalculatorForm";
import ProbabilityResult from "@/components/ProbabilityResult";
import RecentSearches from "@/components/RecentSearches";
import SnowDayInfo from "@/components/SnowDayInfo";
import AdSpace from "@/components/AdSpace";
import PopularCities from "@/components/PopularCities";
import { Snowflake } from "lucide-react";
import { motion } from "framer-motion";
import { CalculationResult, getRecentSearches } from "@/utils/weatherService";

const SnowflakeBackground: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; size: number; left: string; animationDuration: string; opacity: number; rotationSpeed: string }>>([]);

  useEffect(() => {
    const createSnowflakes = () => {
      const count = Math.min(window.innerWidth / 25, 40); // Increase flake count slightly
      const flakes = [];
      
      for (let i = 0; i < count; i++) {
        flakes.push({
          id: i,
          size: Math.random() * 18 + 5, // 5-23px
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 20 + 15}s`, // 15-35s
          opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity
          rotationSpeed: `${Math.random() * 10 + 5}s` // 5-15s rotation
        });
      }
      
      setSnowflakes(flakes);
    };
    
    createSnowflakes();
    
    // Update on resize
    const handleResize = () => {
      createSnowflakes();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute"
          style={{
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            left: flake.left,
            top: '-5%',
            animation: `snowfall ${flake.animationDuration} linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          <Snowflake
            size={flake.size}
            className="text-winter-100"
            style={{
              opacity: flake.opacity,
              animation: `spin ${flake.rotationSpeed} linear infinite`,
              filter: 'drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))'
            }}
          />
        </div>
      ))}
    </div>
  );
};

const Index: React.FC = () => {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [recentSearches, setRecentSearches] = useState<CalculationResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [schoolType, setSchoolType] = useState("high");

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleResultCalculated = (result: CalculationResult) => {
    setCalculationResult(result);
    setShowResult(true);
    setRecentSearches(getRecentSearches());
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setShowResult(false);
    setTimeout(() => {
      setCalculationResult(null);
    }, 300);
  };

  const handleRecentSearchSelect = (search: CalculationResult) => {
    setCalculationResult(search);
    setShowResult(true);
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSchoolTypeChange = (type: string) => {
    setSchoolType(type);
  };

  return (
    <>
      <SnowflakeBackground />
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center pt-20 pb-0 px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-winter-600">
                Snow Day
              </span>
              <span className="text-foreground">
                Calculator
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Check your school closure probability based on real-time weather conditions.
              Enter your city, choose your school type, and get instant results.
            </motion.p>
            
            <div className="max-w-md mx-auto w-full">
              <AdSpace slot="top" hideUntilApproved={true} />
              
              {!showResult ? (
                <>
                  <CalculatorForm 
                    onResultCalculated={handleResultCalculated} 
                    onSchoolTypeChange={handleSchoolTypeChange}
                  />
                  <RecentSearches searches={recentSearches} onSelect={handleRecentSearchSelect} />
                </>
              ) : (
                <>
                  <ProbabilityResult result={calculationResult} onReset={handleReset} />
                  <AdSpace slot="middle" className="mt-8" hideUntilApproved={true} />
                </>
              )}
            </div>

            {/* Popular Cities Section - always visible */}
            <PopularCities onSelect={handleResultCalculated} schoolType={schoolType} />
            
            {/* Snow Day Info Section - moved below Popular Cities */}
            <SnowDayInfo />

            {/* Ad Space Before Content */}
            <AdSpace slot="middle" className="mt-10 mb-6" hideUntilApproved={true} />
            
            {/* Final Ad Space - bottom with reduced margin */}
            <AdSpace slot="bottom" className="mt-6 mb-0" hideUntilApproved={true} />
          </motion.div>
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
