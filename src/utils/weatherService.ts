export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export interface CalculationResult {
  cityName: string;
  temperature: number;
  schoolType: string;
  probability: number;
}

export const getGeocoding = async (location: string): Promise<GeocodingResult | null> => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return null;
    }
    
    return data.results[0];
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw new Error("Failed to fetch location data");
  }
};

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=1`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export const calculateSnowDayProbability = (
  temperature: number,
  schoolType: string
): number => {
  let probability = 0;
  
  // Temperature calculation
  if (temperature < 32) {
    probability += (32 - temperature) * 2;
  }
  
  // School type bonus
  if (schoolType === "primary") {
    probability += 20;
  } else if (schoolType === "middle") {
    probability += 10;
  }
  
  // Cap at 95%
  return Math.min(Math.round(probability), 95);
};

export const saveRecentSearch = (calculationResult: CalculationResult): void => {
  try {
    const recentSearches = getRecentSearches();
    
    // Check if this city already exists in recent searches
    const existingIndex = recentSearches.findIndex(
      search => search.cityName.toLowerCase() === calculationResult.cityName.toLowerCase()
    );
    
    // If it exists, remove it (we'll add the updated version at the beginning)
    if (existingIndex !== -1) {
      recentSearches.splice(existingIndex, 1);
    }
    
    // Add the new search at the beginning
    recentSearches.unshift(calculationResult);
    
    // Keep only the most recent 5 searches
    const limitedSearches = recentSearches.slice(0, 5);
    
    // Save to localStorage
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
  } catch (error) {
    console.error("Error saving recent search:", error);
  }
};

export const getRecentSearches = (): CalculationResult[] => {
  try {
    const searches = localStorage.getItem("recentSearches");
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error("Error getting recent searches:", error);
    return [];
  }
};

export const shareResult = async (result: CalculationResult): Promise<boolean> => {
  try {
    const shareText = `🌨️ Snow Day Calculator Results:\n` +
      `🏙️ ${result.cityName}\n` +
      `🌡️ ${result.temperature}°F\n` +
      `🏫 ${result.schoolType}\n` +
      `🎓 ${result.probability}% chance of a snow day!\n` +
      `Check your chances at snowdaycalculator.com`;
      
    if (navigator.share) {
      await navigator.share({
        title: 'Snow Day Calculator Result',
        text: shareText,
      });
      return true;
    } else {
      await navigator.clipboard.writeText(shareText);
      return true;
    }
  } catch (error) {
    console.error("Error sharing result:", error);
    return false;
  }
};

export const getCurrentWeatherData = (weatherData: WeatherData): { temperature: number } => {
  // Get the current hour
  const now = new Date();
  const currentHour = now.getHours();
  
  return {
    temperature: weatherData.hourly.temperature_2m[currentHour]
  };
};
