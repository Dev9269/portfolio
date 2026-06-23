import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Journey', path: '/journey' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Interests', path: '/interests' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-dark/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="text-sm font-semibold tracking-[0.28em] text-white">
            JHM
          </Link>
        </motion.div>

        <div className="hidden gap-1 text-sm text-text-secondary md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-3 py-1.5 transition ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          to="/contact"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-accent hover:bg-white/5"
        >
          Start a conversation
        </Link>
      </div>
    </nav>
  );
}
