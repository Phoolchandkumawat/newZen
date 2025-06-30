
import { Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const TimeFormatToggle = ({ is24Hour, onToggle }) => {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Clock className="w-5 h-5 text-primary" />
      </motion.div>
      <span className="text-sm font-medium">Time Format</span>
      <div className="flex items-center gap-3">
        <span className={`text-sm transition-colors ${!is24Hour ? 'text-primary' : 'text-muted-foreground'}`}>12H</span>
        <Switch 
          checked={is24Hour} 
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-primary"
        />
        <span className={`text-sm transition-colors ${is24Hour ? 'text-primary' : 'text-muted-foreground'}`}>24H</span>
      </div>
    </div>
  );
};

export default TimeFormatToggle;
