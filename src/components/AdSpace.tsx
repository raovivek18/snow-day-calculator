
import React from "react";

interface AdSpaceProps {
  slot: "top" | "middle" | "bottom" | "sidebar";
  className?: string;
  hideUntilApproved?: boolean; // New prop to control visibility
}

const AdSpace: React.FC<AdSpaceProps> = ({ 
  slot, 
  className = "", 
  hideUntilApproved = false // Default to showing ads
}) => {
  // Check for localStorage setting that can be toggled in browser console
  // To enable ads: localStorage.setItem('showAds', 'true')
  // To disable ads: localStorage.setItem('showAds', 'false')
  const showAds = typeof window !== 'undefined' ? 
    localStorage.getItem('showAds') !== 'false' : true;
  
  // If hideUntilApproved is true and showAds is false, don't render anything
  if (hideUntilApproved && !showAds) {
    return null;
  }

  return (
    <div 
      className={`w-full overflow-hidden bg-white border border-border rounded-lg p-2 text-center text-xs text-muted-foreground mb-6 ${className}`}
      aria-label="Advertisement"
    >
      <div className="w-full h-full flex items-center justify-center min-h-[90px]">
        <p>Ad Space - {slot}</p>
        {/* Actual AdSense code would go here */}
        {/* 
        <ins 
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        */}
      </div>
    </div>
  );
};

export default AdSpace;
