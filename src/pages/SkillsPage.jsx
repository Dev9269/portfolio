import { motion } from 'framer-motion';
import Skills from '../components/Skills';
import SEO from '../components/SEO';

export default function SkillsPage() {
  return (
    <>
      <SEO title="Skills" description="Technical skills and cybersecurity expertise of Jainam Maru — from penetration testing to full-stack development." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="pt-20"
      >
        <Skills />
      </motion.div>
    </>
  );
}
