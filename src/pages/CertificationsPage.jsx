import { motion } from 'framer-motion';
import Certifications from '../components/Certifications';
import SEO from '../components/SEO';

export default function CertificationsPage() {
  return (
    <>
      <SEO title="Certifications" description="Professional certifications held by Jainam Maru in cybersecurity and software development." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="pt-20"
      >
        <Certifications />
      </motion.div>
    </>
  );
}
