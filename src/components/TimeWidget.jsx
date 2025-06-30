
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const TimeWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeZones = [
    { name: 'Local', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-primary mb-1">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(currentTime)}
        </div>
      </div>

      <div className="space-y-2">
        {timeZones.map((zone) => (
          <div key={zone.name} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{zone.name}</span>
            <span className="font-mono">
              {currentTime.toLocaleTimeString('en-US', {
                timeZone: zone.timezone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeWidget;
