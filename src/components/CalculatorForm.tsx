import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getGeocoding,
  getWeatherData,
  calculateSnowDayProbability,
  getCurrentWeatherData,
  saveRecentSearch,
  CalculationResult
} from "@/utils/weatherService";

interface CalculatorFormProps {
  onResultCalculated: (result: CalculationResult) => void;
  onSchoolTypeChange?: (schoolType: string) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ 
  onResultCalculated,
  onSchoolTypeChange 
}) => {
  const [city, setCity] = useState("");
  const [schoolType, setSchoolType] = useState("high");
  const [isCalculating, setIsCalculating] = useState(false);
  const [formError, setFormError] = useState("");

  // Notify parent component when school type changes
  useEffect(() => {
    if (onSchoolTypeChange) {
      onSchoolTypeChange(schoolType);
    }
  }, [schoolType, onSchoolTypeChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!city.trim()) {
      setFormError("Please enter a city name");
      return;
    }
    
    if (!schoolType) {
      setFormError("Please select a school type");
      return;
    }
    
    setFormError("");
    setIsCalculating(true);
    
    try {
      // Step 1: Get latitude and longitude
      const geoResult = await getGeocoding(city);
      
      if (!geoResult) {
        toast.error("Location not found. Please check the city name and try again.");
        setIsCalculating(false);
        return;
      }
      
      // Step 2: Get weather data
      const weatherData = await getWeatherData(geoResult.latitude, geoResult.longitude);
      const { temperature } = getCurrentWeatherData(weatherData);
      
      // Step 3: Calculate probability
      const probability = calculateSnowDayProbability(temperature, schoolType);
      
      // Format city name - include admin1 (state/province) for US/CA locations if available
      const formattedCityName = geoResult.admin1 
        ? `${geoResult.name}, ${geoResult.admin1}`
        : geoResult.name;
      
      // Create the result object
      const result: CalculationResult = {
        cityName: formattedCityName,
        temperature,
        schoolType: schoolType === "primary" 
          ? "Primary School" 
          : schoolType === "middle" 
          ? "Middle School" 
          : "High School",
        probability
      };
      
      // Save to recent searches
      saveRecentSearch(result);
      
      // Send result to parent component
      onResultCalculated(result);
      
    } catch (error) {
      console.error("Error calculating snow day probability:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsCalculating(false);
    }
  };

  // Define animation variants for form elements
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto glass-card p-6 md:p-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      <motion.div 
        className="space-y-6"
        variants={formVariants}
        custom={0}
      >
        <div className="space-y-2">
          <label 
            htmlFor="city" 
            className="block text-sm font-medium text-foreground"
          >
            City Name
          </label>
          <Input
            id="city"
            type="text"
            placeholder="Enter your city (e.g., Chicago)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full"
            disabled={isCalculating}
            required
          />
        </div>
      </motion.div>

      <motion.div 
        className="mt-6"
        variants={formVariants}
        custom={1}
      >
        <div className="space-y-2">
          <label 
            htmlFor="school-type" 
            className="block text-sm font-medium text-foreground"
          >
            School Type
          </label>
          <Select
            value={schoolType}
            onValueChange={(value) => {
              setSchoolType(value);
            }}
            disabled={isCalculating}
          >
            <SelectTrigger id="school-type" className="w-full">
              <SelectValue placeholder="Select school type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary School</SelectItem>
              <SelectItem value="middle">Middle School</SelectItem>
              <SelectItem value="high">High School</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Primary schools close more easily than high schools.
          </p>
        </div>
      </motion.div>

      {formError && (
        <motion.p 
          className="mt-4 text-sm text-destructive"
          variants={formVariants}
          custom={2}
        >
          {formError}
        </motion.p>
      )}

      <motion.div 
        className="mt-8"
        variants={formVariants}
        custom={3}
      >
        <Button
          type="submit"
          className="w-full button-transition bg-gradient-to-r from-winter-600 to-winter-700 hover:from-winter-700 hover:to-winter-800"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Check Snow Day Probability"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default CalculatorForm;
