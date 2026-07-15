import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

export default function ContactPage() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Jainam Maru for cybersecurity consulting, development projects, or collaboration opportunities." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="pt-20"
      >
        <Contact />
      </motion.div>
    </>
  );
}
