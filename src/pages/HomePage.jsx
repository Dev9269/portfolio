import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Hero />
      </motion.div>
    </>
  );
}
