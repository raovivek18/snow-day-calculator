
import React from "react";
import PageTransition from "@/components/transitions/PageTransition";
import { Snowflake, ThermometerSnowflake, School, Calculator } from "lucide-react";

const About: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About Snow Day Calculator
          </h1>
          <p className="text-muted-foreground">
            Your Fun School Closure Predictor
          </p>
        </div>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-lg leading-relaxed">
            We created the Snow Day Calculator to help students, parents, and teachers predict 
            whether schools might close tomorrow due to snow and extreme weather. 
          </p>
          
          <p className="text-lg leading-relaxed mt-4">
            Using live weather data from Open-Meteo, we calculate snow day chances 
            using temperature, snowfall, and your school type. Whether you're excited for 
            a snow day or planning ahead, our calculator makes it easy and fun!
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-6">How Our Calculator Works</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
            <div className="glass-card p-6 flex flex-col items-center text-center">
              <ThermometerSnowflake className="h-10 w-10 text-winter-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Real-Time Weather Data</h3>
              <p className="text-muted-foreground">
                We fetch current temperature and snowfall data for your location from 
                Open-Meteo's reliable weather APIs.
              </p>
            </div>
            
            <div className="glass-card p-6 flex flex-col items-center text-center">
              <School className="h-10 w-10 text-winter-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">School Type Factors</h3>
              <p className="text-muted-foreground">
                Primary schools close more easily than high schools. We adjust 
                probabilities based on the school type you select.
              </p>
            </div>
            
            <div className="glass-card p-6 flex flex-col items-center text-center">
              <Calculator className="h-10 w-10 text-winter-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Smart Calculations</h3>
              <p className="text-muted-foreground">
                Our algorithm considers temperature thresholds, snowfall amounts, 
                and school type to generate a probability percentage.
              </p>
            </div>
            
            <div className="glass-card p-6 flex flex-col items-center text-center">
              <Snowflake className="h-10 w-10 text-winter-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Simple Predictions</h3>
              <p className="text-muted-foreground">
                Get an easy-to-understand probability percentage and helpful message 
                about your chances of a snow day.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-6">Our Mission</h2>
          
          <p className="text-lg leading-relaxed">
            The Snow Day Calculator was created with a simple mission: to provide a fun, 
            easy-to-use tool that helps the school community prepare for potential snow days. 
            While official closure decisions always come from your school district, our tool 
            gives you a helpful prediction based on weather conditions.
          </p>
          
          <p className="text-lg leading-relaxed mt-4">
            We believe in making weather data accessible and useful in everyday life. 
            Whether you're a student hoping for a day off, a parent planning childcare, 
            or a teacher preparing alternative lessons, our calculator helps you prepare 
            for what might happen when winter weather arrives.
          </p>
          
          <div className="my-10 p-6 glass-card">
            <p className="text-lg font-medium text-center">
              Remember: The Snow Day Calculator is for informational purposes only. 
              Always check with your school district for official closure announcements.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
