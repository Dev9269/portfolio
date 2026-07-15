import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSkillGroups, getCyberExpertise } from '../data/liveData';

function SkillBar({ name, level, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-white">{name}</span>
        <span className="text-xs text-text-secondary">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-secondary"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const skillGroups = getSkillGroups();
  const cyberExpertise = getCyberExpertise();
  const [active, setActive] = useState(skillGroups[0]?.category);
  const activeGroup = skillGroups.find((g) => g.category === active) || skillGroups[0];

  return (
    <>
      {/* Technical Skills */}
      <section id="skills" className="border-y border-white/10 bg-[#080808] px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="mb-16 max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Technology arsenal</p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Technical Skills.</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Skill categories">
              {skillGroups.map((group) => (
                <button
                  key={group.category}
                  type="button"
                  role="tab"
                  aria-selected={active === group.category}
                  onClick={() => setActive(group.category)}
                  onKeyDown={(e) => {
                    const idx = skillGroups.findIndex((g) => g.category === group.category);
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                      e.preventDefault();
                      const next = (idx + 1) % skillGroups.length;
                      setActive(skillGroups[next].category);
                    }
                    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                      e.preventDefault();
                      const prev = (idx - 1 + skillGroups.length) % skillGroups.length;
                      setActive(skillGroups[prev].category);
                    }
                  }}
                  className={`rounded-2xl border px-5 py-4 text-left transition ${
                    active === group.category
                      ? 'border-accent bg-accent/10 text-white'
                      : 'border-white/10 bg-white/[0.035] text-text-secondary hover:border-white/25 hover:text-white'
                  }`}
                >
                  <p className="text-sm font-medium">{group.category}</p>
                  <p className="mt-1 text-xs text-text-secondary">{group.skills.length} technologies</p>
                </button>
              ))}
            </div>

            <motion.div
              key={activeGroup.category}
              role="tabpanel"
              aria-label={activeGroup.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-10"
            >
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">{activeGroup.category}</h3>
              <div className="mt-8 space-y-5">
                {activeGroup.skills.map((skill, index) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cybersecurity Expertise */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="mb-16 max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Specialized domains</p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Cybersecurity Expertise.</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cyberExpertise.map((item, i) => (
              <motion.div
                key={item.area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.5)' }}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <span className="text-lg font-bold">{item.area[0]}</span>
                </div>
                <h3 className="font-medium text-white">{item.area}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
