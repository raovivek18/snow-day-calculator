
import React from "react";
import PageTransition from "@/components/transitions/PageTransition";

const Privacy: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated: April 2025
          </p>
        </div>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-lg">
            At Snow Day Calculator, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-medium mt-6 mb-2">City Data</h3>
          <p>
            When you use our Snow Day Calculator, we temporarily process the city name you enter 
            to fetch weather data from Open-Meteo. We do not permanently store this location information 
            on our servers.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Recent Searches</h3>
          <p>
            For your convenience, we save your recent searches in your browser's local storage. 
            This information stays on your device and is not transmitted to our servers. You can 
            clear this data by clearing your browser's local storage.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Cookies and Analytics</h3>
          <p>
            Our site uses cookies to improve your browsing experience. We also use Google Analytics 
            to understand how visitors use our website. Google Analytics may collect information such 
            as your IP address, browser type, and pages visited.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements on our website. Google AdSense may use 
            cookies to personalize ads based on your browsing history. You can opt out of personalized 
            advertising by visiting Google's Ad Settings.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Your Information</h2>
          
          <p>
            We use the information we collect to:
          </p>
          
          <ul>
            <li>Provide the Snow Day Calculator functionality</li>
            <li>Improve our website and services</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Display relevant advertisements</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Third-Party Services</h2>
          
          <p>
            We use the following third-party services:
          </p>
          
          <ul>
            <li>Open-Meteo for weather data</li>
            <li>Google Analytics for website analytics</li>
            <li>Google AdSense for displaying advertisements</li>
          </ul>
          
          <p>
            Each of these services has its own privacy policy governing how they handle your information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Data Security</h2>
          
          <p>
            We implement appropriate technical and organizational measures to protect the information 
            we collect. However, no method of transmission over the internet or electronic storage is 
            100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Children's Privacy</h2>
          
          <p>
            Our website is not directed at children under the age of 13. We do not knowingly collect 
            personal information from children under 13. If you believe we have collected information 
            from a child under 13, please contact us so we can promptly remove the information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Changes to This Privacy Policy</h2>
          
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
          
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:support@snowdaycalculator.com" className="text-primary hover:underline">
              support@snowdaycalculator.com
            </a>
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Privacy;
