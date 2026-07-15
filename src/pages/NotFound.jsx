import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-5 py-28">
      <div className="mx-auto max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-8xl font-semibold tracking-[-0.08em] text-white">404</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">Page not found</h1>
          <p className="mt-3 text-text-secondary">
            This page doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-text-primary"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
