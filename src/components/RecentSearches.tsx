
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CalculationResult } from "@/utils/weatherService";

interface RecentSearchesProps {
  searches: CalculationResult[];
  onSelect: (search: CalculationResult) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSelect }) => {
  if (!searches.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-md mx-auto mt-6"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Searches</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {searches.map((search, index) => (
          <motion.button
            key={`${search.cityName}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            onClick={() => onSelect(search)}
            className={cn(
              "glass text-left p-3 rounded-lg transition-all",
              "hover:shadow-md hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
          >
            <div className="font-medium truncate">{search.cityName}</div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">{search.temperature.toFixed(1)}°F</span>
              <span 
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  search.probability < 40 
                    ? "bg-blue-100 text-blue-800" 
                    : search.probability < 70 
                    ? "bg-blue-200 text-blue-800" 
                    : "bg-blue-300 text-blue-900"
                )}
              >
                {search.probability}%
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSearches;
