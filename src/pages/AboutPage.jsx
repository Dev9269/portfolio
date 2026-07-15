import { motion } from 'framer-motion';
import About from '../components/About';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO title="About" description="Learn about Jainam Maru — cybersecurity engineer and full-stack developer building secure systems." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="pt-20"
      >
        <About />
      </motion.div>
    </>
  );
}
