
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getGeocoding, getWeatherData, calculateSnowDayProbability, getCurrentWeatherData, saveRecentSearch } from "@/utils/weatherService";
import { toast } from "sonner";
import { CalculationResult } from "@/utils/weatherService";

const POPULAR_CITIES = [
  "Livonia", "New York", "Macomb Township", "Colorado Springs", "Detroit",
  "Traverse City", "Chicago", "Northville", "Lake Orion", "Almonte",
  "Ottawa", "Nepean", "Mississauga", "Milton", "Orleans",
  "Stittsville", "Barrie", "Brampton", "Hamilton", "Oakville", 
  "Ann Arbor", "Buffalo", "Rochester Hills", "Grand Rapids", "Naperville",
  "Omaha", "Saginaw", "Kalamazoo", "Troy", "Cleveland"
];

interface PopularCitiesProps {
  onSelect: (result: CalculationResult) => void;
  schoolType: string;
}

const PopularCities: React.FC<PopularCitiesProps> = ({ onSelect, schoolType }) => {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleCityClick = async (city: string) => {
    setLoading(city);
    try {
      // Get geocoding data
      const geoResult = await getGeocoding(city);
      
      if (!geoResult) {
        toast.error(`Could not find location data for ${city}`);
        return;
      }
      
      // Get weather data
      const weatherData = await getWeatherData(geoResult.latitude, geoResult.longitude);
      const { temperature } = getCurrentWeatherData(weatherData);
      
      // Calculate probability
      const probability = calculateSnowDayProbability(temperature, schoolType);
      
      // Format city name with state/province if available
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
      onSelect(result);
      
    } catch (error) {
      console.error(`Error calculating for ${city}:`, error);
      toast.error(`Could not calculate for ${city}. Please try again.`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mt-4 mb-8"
    >
      <h3 className="text-lg font-medium text-center mb-4">Popular Cities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
        {POPULAR_CITIES.map((city) => (
          <motion.button
            key={city}
            onClick={() => handleCityClick(city)}
            disabled={loading === city}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "glass text-center p-3 rounded-lg transition-all min-h-[60px] flex items-center justify-center",
              "hover:shadow-md hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50",
              loading === city ? "opacity-70 cursor-not-allowed" : ""
            )}
          >
            <div className="font-medium">
              {loading === city ? (
                <span className="inline-block animate-pulse">Loading...</span>
              ) : (
                `${city}`
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default PopularCities;
