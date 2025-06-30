
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import TimeDisplay from "./TimeDisplay";

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  country: string;
  flag: string;
}

interface LocalTimeCardProps {
  localTimeZone: TimeZone;
  currentTime: Date;
  is24Hour: boolean;
  isNightTime: boolean;
  formatTime: (date: Date, timezone: string) => string;
  formatDate: (date: Date, timezone: string) => string;
}

const LocalTimeCard = ({ 
  localTimeZone, 
  currentTime, 
  is24Hour, 
  isNightTime,
  formatTime,
  formatDate 
}: LocalTimeCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8 glass glass-hover rounded-xl relative overflow-hidden"
      style={{
        background: isNightTime 
          ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.3), rgba(0, 0, 0, 0.2))' 
          : 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 255, 255, 0.05))'
      }}
    >
      <motion.div 
        className="absolute top-4 left-4 flex items-center gap-2 text-primary"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <MapPin className="w-4 h-4" />
        <span className="text-sm font-medium">Your Location</span>
      </motion.div>
      
      <div className="space-y-3">
        <TimeDisplay 
          time={formatTime(currentTime, localTimeZone.timezone)}
          className="text-5xl md:text-6xl text-gradient"
        />
        <motion.div 
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {formatDate(currentTime, localTimeZone.timezone)}
        </motion.div>
        <motion.div 
          className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">{localTimeZone.flag}</span>
            <span className="font-medium">{localTimeZone.name}</span>
          </span>
          {isNightTime && (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg"
            >
              🌙
            </motion.span>
          )}
          {!isNightTime && (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-lg"
            >
              ☀️
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocalTimeCard;
