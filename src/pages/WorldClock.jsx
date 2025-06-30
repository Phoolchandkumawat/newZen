
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdvancedTimeWidget from "@/components/AdvancedTimeWidget";
import { Button } from "@/components/ui/button";

const WorldClock = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 py-8"
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="glass">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">World Clock</h1>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container px-4 pb-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="glass glass-hover rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Track Time Across the Globe</h2>
              <p className="text-muted-foreground">
                Stay synchronized with multiple time zones and never miss important deadlines.
              </p>
            </div>
            <AdvancedTimeWidget />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Multiple Time Zones</h3>
              <p className="text-sm text-muted-foreground">
                Add and track time in any city around the world
              </p>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Format Toggle</h3>
              <p className="text-sm text-muted-foreground">
                Switch between 12-hour and 24-hour time formats
              </p>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">
                Automatic synchronization with live updates every second
              </p>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default WorldClock;
