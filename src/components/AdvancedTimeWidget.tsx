
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TimeFormatToggle from "./TimeFormatToggle";
import TimezoneSelector from "./TimezoneSelector";
import LocalTimeCard from "./LocalTimeCard";
import TimezoneCard from "./TimezoneCard";

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  country: string;
  flag: string;
}

const AVAILABLE_TIMEZONES: TimeZone[] = [
  { id: '1', name: 'New York', timezone: 'America/New_York', country: 'USA', flag: '🇺🇸' },
  { id: '2', name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA', flag: '🇺🇸' },
  { id: '3', name: 'London', timezone: 'Europe/London', country: 'UK', flag: '🇬🇧' },
  { id: '4', name: 'Paris', timezone: 'Europe/Paris', country: 'France', flag: '🇫🇷' },
  { id: '5', name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan', flag: '🇯🇵' },
  { id: '6', name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia', flag: '🇦🇺' },
  { id: '7', name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE', flag: '🇦🇪' },
  { id: '8', name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore', flag: '🇸🇬' },
  { id: '9', name: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India', flag: '🇮🇳' },
  { id: '10', name: 'Berlin', timezone: 'Europe/Berlin', country: 'Germany', flag: '🇩🇪' },
  { id: '11', name: 'Moscow', timezone: 'Europe/Moscow', country: 'Russia', flag: '🇷🇺' },
  { id: '12', name: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil', flag: '🇧🇷' },
  { id: '13', name: 'Cairo', timezone: 'Africa/Cairo', country: 'Egypt', flag: '🇪🇬' },
  { id: '14', name: 'Bangkok', timezone: 'Asia/Bangkok', country: 'Thailand', flag: '🇹🇭' },
  { id: '15', name: 'Toronto', timezone: 'America/Toronto', country: 'Canada', flag: '🇨🇦' },
  { id: '16', name: 'Mexico City', timezone: 'America/Mexico_City', country: 'Mexico', flag: '🇲🇽' },
];

const AdvancedTimeWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [selectedTimezones, setSelectedTimezones] = useState<TimeZone[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');
  const [localTimeZone, setLocalTimeZone] = useState<TimeZone | null>(null);

  useEffect(() => {
    // Auto-detect local timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const detectedLocation = getLocationFromTimezone(detectedTimezone);
    
    setLocalTimeZone({
      id: 'local',
      name: detectedLocation,
      timezone: detectedTimezone,
      country: 'Local',
      flag: '📍'
    });

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getLocationFromTimezone = (timezone: string): string => {
    const parts = timezone.split('/');
    if (parts.length > 1) {
      return parts[parts.length - 1].replace('_', ' ');
    }
    return 'Local Time';
  };

  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: !is24Hour,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date, timezone: string) => {
    return date.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isNightTime = (timezone: string) => {
    const hour = parseInt(currentTime.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit'
    }));
    return hour < 6 || hour > 20;
  };

  const addTimezone = () => {
    if (selectedTimezone) {
      const timezone = AVAILABLE_TIMEZONES.find(tz => tz.id === selectedTimezone);
      if (timezone && !selectedTimezones.find(tz => tz.id === timezone.id)) {
        setSelectedTimezones([...selectedTimezones, timezone]);
        setSelectedTimezone('');
      }
    }
  };

  const removeTimezone = (id: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.id !== id));
  };

  const availableTimezones = AVAILABLE_TIMEZONES.filter(
    tz => !selectedTimezones.find(selected => selected.id === tz.id)
  );

  return (
    <div className="space-y-8">
      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-6 items-center justify-between p-6 glass rounded-xl"
      >
        <TimeFormatToggle is24Hour={is24Hour} onToggle={setIs24Hour} />
        <TimezoneSelector 
          availableTimezones={availableTimezones}
          selectedTimezone={selectedTimezone}
          onTimezoneChange={setSelectedTimezone}
          onAddTimezone={addTimezone}
        />
      </motion.div>

      {/* Local Time Display */}
      {localTimeZone && (
        <LocalTimeCard 
          localTimeZone={localTimeZone}
          currentTime={currentTime}
          is24Hour={is24Hour}
          isNightTime={isNightTime(localTimeZone.timezone)}
          formatTime={formatTime}
          formatDate={formatDate}
        />
      )}

      {/* Additional Timezones */}
      <AnimatePresence>
        {selectedTimezones.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <motion.h3 
              className="text-xl font-semibold flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <Globe className="w-5 h-5 text-primary" />
              World Clocks
            </motion.h3>
            <div className="grid gap-4">
              {selectedTimezones.map((timezone, index) => (
                <TimezoneCard
                  key={timezone.id}
                  timezone={timezone}
                  currentTime={currentTime}
                  isNightTime={isNightTime(timezone.timezone)}
                  formatTime={formatTime}
                  formatDate={formatDate}
                  onRemove={removeTimezone}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {selectedTimezones.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 glass rounded-xl"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          </motion.div>
          <motion.h3 
            className="text-lg font-semibold mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Add World Clocks
          </motion.h3>
          <motion.p 
            className="text-muted-foreground max-w-md mx-auto"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Select timezones from around the world to track multiple locations at once.
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default AdvancedTimeWidget;
