import { motion } from 'framer-motion';
import Journey from '../components/Journey';

export default function JourneyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="pt-20"
    >
      <Journey />
    </motion.div>
  );
}
