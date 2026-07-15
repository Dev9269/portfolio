import { motion } from 'framer-motion';
import Goals from '../components/Goals';
import SEO from '../components/SEO';

export default function InterestsPage() {
  return (
    <>
      <SEO title="Interests" description="Explore interests and goals of Jainam Maru — from red teaming to secure software architecture." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="pt-20"
      >
        <Goals />
      </motion.div>
    </>
  );
}
