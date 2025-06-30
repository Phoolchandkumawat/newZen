
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  country: string;
  flag: string;
}

interface TimezoneSelectorProps {
  availableTimezones: TimeZone[];
  selectedTimezone: string;
  onTimezoneChange: (timezoneId: string) => void;
  onAddTimezone: () => void;
}

const TimezoneSelector = ({ 
  availableTimezones, 
  selectedTimezone, 
  onTimezoneChange, 
  onAddTimezone 
}: TimezoneSelectorProps) => {
  return (
    <div className="flex gap-3 items-center">
      <Select value={selectedTimezone} onValueChange={onTimezoneChange}>
        <SelectTrigger className="w-56 glass border-muted hover:bg-white/10 transition-colors">
          <SelectValue placeholder="Add a timezone..." />
        </SelectTrigger>
        <SelectContent className="bg-background border-muted">
          {availableTimezones.map((timezone) => (
            <SelectItem key={timezone.id} value={timezone.id} className="hover:bg-muted/20">
              <div className="flex items-center gap-2">
                <span className="text-lg">{timezone.flag}</span>
                <span>{timezone.name}</span>
                <span className="text-xs text-muted-foreground">({timezone.country})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onAddTimezone} 
          disabled={!selectedTimezone}
          size="icon"
          className="glass hover:bg-primary/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default TimezoneSelector;
