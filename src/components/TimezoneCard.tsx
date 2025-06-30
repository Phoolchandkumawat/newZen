
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TimeDisplay from "./TimeDisplay";

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  country: string;
  flag: string;
}

interface TimezoneCardProps {
  timezone: TimeZone;
  currentTime: Date;
  isNightTime: boolean;
  formatTime: (date: Date, timezone: string) => string;
  formatDate: (date: Date, timezone: string) => string;
  onRemove: (id: string) => void;
  index: number;
}

const TimezoneCard = ({ 
  timezone, 
  currentTime, 
  isNightTime,
  formatTime,
  formatDate,
  onRemove,
  index 
}: TimezoneCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.8 }}
      transition={{ 
        delay: index * 0.1,
        exit: { duration: 0.2 }
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="flex items-center justify-between p-4 glass glass-hover rounded-lg group relative overflow-hidden"
      style={{
        background: isNightTime 
          ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.2), rgba(0, 0, 0, 0.1))' 
          : 'linear-gradient(135deg, rgba(255, 193, 7, 0.05), rgba(255, 255, 255, 0.02))'
      }}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-semibold text-lg flex items-center gap-2">
              <motion.span 
                className="text-xl"
                whileHover={{ scale: 1.2 }}
              >
                {timezone.flag}
              </motion.span>
              {timezone.name}
              {isNightTime && (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm"
                >
                  🌙
                </motion.span>
              )}
              {!isNightTime && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="text-sm"
                >
                  ☀️
                </motion.span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {timezone.country}
            </div>
          </div>
          <div className="text-right space-y-1">
            <TimeDisplay 
              time={formatTime(currentTime, timezone.timezone)}
              className="text-2xl text-primary"
            />
            <div className="text-sm text-muted-foreground">
              {formatDate(currentTime, timezone.timezone)}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(timezone.id)}
          className="ml-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TimezoneCard;
