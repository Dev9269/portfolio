import { motion } from 'framer-motion';
import { getJourney, getCompetitions } from '../data/liveData';

export default function Journey() {
  const journey = getJourney();
  const competitions = getCompetitions();
  return (
    <>
      {/* Timeline Section */}
      <section className="border-b border-white/10 px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="mb-16 max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Timeline of growth</p>
            <h2 className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Journey.</h2>
          </motion.div>

          <div className="relative grid gap-0 lg:grid-cols-2 lg:gap-16">
            <div className="relative space-y-6 border-l border-white/10 pl-8">
              {journey.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.06 }}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                >
                  <span className="absolute -left-[33px] top-6 h-3 w-3 rounded-full bg-accent shadow-[0_0_22px_rgba(59,130,246,0.9)]" />
                  <span className="absolute -left-[29px] top-6.5 h-1.5 w-1.5 rounded-full bg-dark" />
                  <p className="text-xs font-semibold tracking-[0.2em] text-accent">{item.year}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 lg:mt-0">
              <p className="mb-6 text-sm uppercase tracking-[0.36em] text-accent">Growth arc</p>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <p className="text-6xl font-semibold text-white tracking-[-0.06em]">2022</p>
                <div className="mt-6 h-2 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-secondary"
                  />
                </div>
                <p className="mt-6 text-6xl font-semibold text-white tracking-[-0.06em]">2026</p>
                <p className="mt-8 text-text-secondary leading-relaxed">
                  From first lines of Python to building an educational operating system and AI-powered security tools — every year has been a deliberate step toward mastering cybersecurity and building technology that matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathons & CTFs Section */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="mb-16 max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Competition record</p>
            <h2 className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Hackathons & CTFs.</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {competitions.map((comp, i) => (
              <motion.article
                key={comp.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-accent/40 sm:p-8"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${comp.gradient} opacity-30`} />
                <div className="relative z-10">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                    comp.badge === 'Top 25%' ? 'bg-emerald-500/20 text-emerald-300' :
                    comp.badge === 'Participant' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {comp.badge}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{comp.name}</h3>
                  {comp.team && (
                    <p className="mt-2 text-sm text-text-secondary">Team: {comp.team}</p>
                  )}
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-accent">{comp.rank}</span>
                    {comp.outOf && <span className="text-sm text-text-secondary">/ {comp.outOf}</span>}
                  </div>
                  {comp.score && (
                    <p className="mt-2 text-lg font-medium text-white">Score: <span className="text-accent">{comp.score}</span></p>
                  )}
                  <p className="mt-4 text-sm leading-6 text-text-secondary">{comp.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
