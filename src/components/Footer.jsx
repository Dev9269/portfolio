import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProfile } from '../data/liveData';

export default function Footer() {
  const profile = getProfile();
  return (
    <footer className="border-t border-white/10 bg-dark">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-2 text-lg font-semibold tracking-[0.22em] text-white">JHM</h4>
            <p className="text-sm text-text-secondary">
              A luxury tech product experience for {profile.name}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Explore</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <Link to="/about" className="block transition-colors hover:text-white">About</Link>
              <Link to="/projects" className="block transition-colors hover:text-white">Projects</Link>
              <Link to="/skills" className="block transition-colors hover:text-white">Skills</Link>
              <Link to="/contact" className="block transition-colors hover:text-white">Contact</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Connect</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                GitHub
              </a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                Instagram
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-text-secondary">
          <p>© 2026 {profile.name}. Built for secure, intelligent systems.</p>
        </div>
      </div>
    </footer>
  );
}
