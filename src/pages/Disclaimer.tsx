
import React from "react";
import PageTransition from "@/components/transitions/PageTransition";
import { AlertTriangle } from "lucide-react";
import AdSpace from "@/components/AdSpace";

const Disclaimer: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Disclaimer
          </h1>
          <p className="text-muted-foreground">
            Important Information About the Snow Day Calculator
          </p>
        </div>
        
        <AdSpace slot="top" />
        
        <div className="prose prose-blue max-w-none">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md mb-10">
            <div className="flex items-start">
              <AlertTriangle className="text-red-500 w-6 h-6 mr-3 flex-shrink-0 mt-1" />
              <p className="text-xl font-medium text-red-800">
                The Snow Day Calculator is for fun predictions only. 
                Official school closure announcements come from your local school board. 
                Always check with your school for the final decision.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">For Entertainment Purposes</h2>
          
          <p>
            The Snow Day Calculator is designed primarily for entertainment and educational purposes. 
            While we use real weather data and a thoughtful algorithm to generate our predictions, 
            the results should be viewed as estimates rather than definitive forecasts.
          </p>
          
          <AdSpace slot="middle" className="my-10" />
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">School Closure Decisions</h2>
          
          <p>
            School closure decisions are complex and consider many factors beyond weather conditions, 
            including:
          </p>
          
          <ul>
            <li>Road conditions across the entire district</li>
            <li>Forecast timing and duration</li>
            <li>Transportation safety</li>
            <li>Building conditions</li>
            <li>Regional emergency management recommendations</li>
            <li>Decisions by neighboring districts</li>
          </ul>
          
          <p>
            These decisions are made by school administrators, superintendents, and local authorities 
            based on their assessment of all relevant factors. Our calculator cannot account for all 
            of these considerations.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Weather Data Limitations</h2>
          
          <p>
            Our calculator uses weather data from Open-Meteo, a reputable weather data provider. 
            However, weather forecasting has inherent limitations and uncertainties, especially:
          </p>
          
          <ul>
            <li>Forecasts become less accurate the further they extend into the future</li>
            <li>Local variations in weather conditions may not be fully captured</li>
            <li>Sudden changes in weather patterns can occur</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Official Information Sources</h2>
          
          <p>
            For official information about school closures, always refer to:
          </p>
          
          <ul>
            <li>Your school's official website</li>
            <li>School district social media accounts</li>
            <li>Local news and radio stations</li>
            <li>Official school notification systems (text/email alerts)</li>
          </ul>
          
          <AdSpace slot="middle" className="my-10" />
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">No Liability</h2>
          
          <p>
            The creators and operators of the Snow Day Calculator accept no responsibility or liability 
            for any decisions made based on our predictions. By using this tool, you acknowledge that you 
            understand its limitations and will not rely solely on its predictions for important decisions.
          </p>
          
          <div className="mt-12 p-6 glass-card">
            <p className="font-medium">
              Thank you for using the Snow Day Calculator! We hope it adds some fun to your winter 
              weather experience, but please remember to check official sources for actual school 
              closure information.
            </p>
          </div>
          
          <AdSpace slot="bottom" className="mt-10" />
        </div>
      </div>
    </PageTransition>
  );
};

export default Disclaimer;
