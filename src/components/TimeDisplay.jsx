
import { motion } from "framer-motion";

const TimeDisplay = ({ time, className = "" }) => {
  return (
    <div className={`font-mono font-bold ${className}`}>
      {time}
    </div>
  );
};

export default TimeDisplay;
