
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share, RefreshCw } from "lucide-react";
import { CalculationResult, shareResult } from "@/utils/weatherService";
import { toast } from "sonner";

interface ProbabilityResultProps {
  result: CalculationResult | null;
  onReset: () => void;
}

const ProbabilityResult: React.FC<ProbabilityResultProps> = ({ result, onReset }) => {
  const [isSharing, setIsSharing] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (result && progressBarRef.current) {
      // Set CSS variable for the progress width to be used in the animation
      progressBarRef.current.style.setProperty('--progress-width', `${result.probability}%`);
    }
  }, [result]);
  
  if (!result) return null;
  
  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shared = await shareResult(result);
      if (shared) {
        toast.success("Result copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share result");
    } finally {
      setIsSharing(false);
    }
  };
  
  // Determine message based on probability
  const getMessage = () => {
    if (result.probability < 25) {
      return "📚 School is likely open tomorrow.";
    } else if (result.probability < 50) {
      return "📚 There's a small chance of a snow day.";
    } else if (result.probability < 75) {
      return "🎉 Good chance of a snow day tomorrow!";
    } else {
      return "🎉 Very high chance of a snow day!";
    }
  };
  
  // Determine bar color based on probability
  const getBarColor = () => {
    if (result.probability < 25) {
      return "bg-blue-300";
    } else if (result.probability < 50) {
      return "bg-blue-400";
    } else if (result.probability < 75) {
      return "bg-blue-500";
    } else {
      return "bg-gradient-to-r from-blue-500 to-indigo-600";
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6 md:p-8 w-full max-w-md mx-auto"
    >
      <h3 className="text-xl font-semibold text-center mb-6">Snow Day Results</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Location:</span>
          <span className="font-medium">{result.cityName}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Temperature:</span>
          <span className="font-medium">{result.temperature.toFixed(1)}°F</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">School Type:</span>
          <span className="font-medium">{result.schoolType}</span>
        </div>
      </div>
      
      <div className="mt-8 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Snow Day Probability</span>
          <span className="text-sm font-semibold">{result.probability}%</span>
        </div>
        
        <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className={`h-full ${getBarColor()} animate-progress-fill rounded-full`}
            style={{ width: '0%' }}
          ></div>
        </div>
        
        <motion.p 
          className="mt-4 text-center font-medium text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {getMessage()}
        </motion.p>
      </div>
      
      <div className="mt-8 flex gap-4">
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="flex-1"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Calculation
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="default" 
          className="flex-1 bg-gradient-to-r from-winter-600 to-winter-700"
          disabled={isSharing}
        >
          <Share className="h-4 w-4 mr-2" />
          {isSharing ? "Sharing..." : "Share Result"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProbabilityResult;
