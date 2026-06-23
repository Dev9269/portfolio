import { useState } from 'react';
import { motion } from 'framer-motion';
import { getGoals, getInterests } from '../data/liveData';

export default function Goals() {
  const goals = getGoals();
  const interests = getInterests();
  const [selectedInterest, setSelectedInterest] = useState(null);

  return (
    <>
      {/* Interests Section */}
      <section className="border-y border-white/10 bg-[#080808] px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="mb-16 max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Research domains</p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Interests & Research.</h2>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {interests.map((interest, i) => (
              <motion.button
                key={interest}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedInterest(selectedInterest === interest ? null : interest)}
                className={`rounded-full border px-5 py-2.5 text-sm transition ${
                  selectedInterest === interest
                    ? 'border-accent bg-accent/15 text-white shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                    : 'border-white/10 bg-white/[0.035] text-text-secondary hover:border-white/25 hover:text-white'
                }`}
              >
                {interest}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Goals & Vision Section */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="mb-16 max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Where I'm headed</p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Goals & Vision.</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-10"
            >
              <p className="text-sm uppercase tracking-[0.36em] text-accent">Vision statement</p>
              <p className="mt-6 text-xl leading-9 text-text-secondary">
                {goals.vision}
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="rounded-[1.6rem] border border-blue-500/20 bg-blue-500/5 p-6"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Near-term</p>
                <div className="mt-5 space-y-3">
                  {goals.shortTerm.map((goal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">{i + 1}</span>
                      <span className="text-sm text-text-secondary">{goal}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.1 }}
                className="rounded-[1.6rem] border border-purple-500/20 bg-purple-500/5 p-6"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-purple-400">Long-term</p>
                <div className="mt-5 space-y-3">
                  {goals.longTerm.map((goal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs text-purple-400">{i + 1}</span>
                      <span className="text-sm text-text-secondary">{goal}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
