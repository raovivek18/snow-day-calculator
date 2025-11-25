
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Snowflake } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <motion.div 
        className="text-center max-w-md mx-auto glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Snowflake className="h-16 w-16 text-winter-500 mx-auto mb-6 animate-float" />
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <Button asChild className="bg-gradient-to-r from-winter-600 to-winter-700">
          <Link to="/">Return to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
