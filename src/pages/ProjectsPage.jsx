import { motion } from 'framer-motion';
import Projects from '../components/Projects';
import SEO from '../components/SEO';

export default function ProjectsPage() {
  return (
    <>
      <SEO title="Projects" description="Cybersecurity and full-stack development projects by Jainam Maru — built with purpose, designed for impact." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="pt-20"
      >
        <Projects />
      </motion.div>
    </>
  );
}
