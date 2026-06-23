import { motion } from 'framer-motion';
import { getCertifications } from '../data/liveData';

export default function Certifications() {
  const certifications = getCertifications();
  return (
    <section className="border-t border-white/10 bg-[#080808] px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Learning credentials</p>
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Certifications & Learning.</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, boxShadow: '0 30px 80px rgba(59,130,246,0.15)' }}
              className="group rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-accent/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-accent">
                <span className="text-lg font-bold">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{cert.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-accent/80">{cert.issuer}</p>
              <p className="mt-4 text-sm leading-6 text-text-secondary">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
