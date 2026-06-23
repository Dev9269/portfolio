import { motion } from 'framer-motion';
import Skills from '../components/Skills';

export default function SkillsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="pt-20"
    >
      <Skills />
    </motion.div>
  );
}
