import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { getAbout, getStats } from '../data/liveData';

function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className="text-4xl font-semibold text-white sm:text-5xl">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function About() {
  const about = getAbout();
  const stats = getStats();
  return (
    <section id="about" className="relative border-y border-white/10 bg-[#080808] px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">About the builder</p>
          <h2 className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">
            Who I Am
          </h2>
          <p className="mt-8 text-xl leading-9 text-text-secondary">
            {about.story}
          </p>
          <p className="mt-5 text-xl leading-9 text-text-secondary">
            {about.detail}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#080808] p-6 text-center sm:p-8">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
