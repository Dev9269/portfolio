import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, GitBranch, Check } from 'lucide-react';
import { getProjects } from '../data/liveData';

export default function Projects() {
  const projects = getProjects();
  return (
    <section id="projects" className="px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Featured systems</p>
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Projects as product showcases.</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Every project is a product. Built with purpose, designed for impact.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-[2.25rem] border border-dashed border-white/10 bg-white/[0.015]">
            <div className="text-center">
              <p className="text-4xl">📦</p>
              <p className="mt-4 text-lg text-text-secondary">No projects to display yet.</p>
              <p className="mt-1 text-sm text-text-secondary">Projects will appear here once added.</p>
            </div>
          </div>
        ) : (
        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ delay: i * 0.06 }}
              className="group grid overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl md:grid-cols-2 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <div className={`relative min-h-[340px] overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-6 rounded-[1.7rem] border border-white/10 bg-black/35 p-5 shadow-2xl transition duration-500 group-hover:scale-[1.02]">
                  <div className="mb-4 flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-yellow-300/80" /><span className="h-3 w-3 rounded-full bg-emerald-400/80" /></div>
                  <div className="grid h-[calc(100%-1.5rem)] grid-rows-[1fr_auto] rounded-2xl border border-white/10 bg-[#070707]">
                    <div className="overflow-hidden rounded-t-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 text-sm text-text-secondary">
                      <span>{project.impact}</span>
                      <span className="inline-block rounded-full bg-accent/15 px-3 py-0.5 text-xs text-accent">{project.tag}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-sm uppercase tracking-[0.28em] text-accent">0{i + 1} / Showcase</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{project.title}</h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                  {project.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-text-secondary">
                      <Check size={14} className="shrink-0 text-emerald-400" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-text-secondary">{item}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  {project.liveUrl.startsWith('http') ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-text-primary">Live Link <ExternalLink size={16} /></a>
                  ) : (
                    <Link to={project.liveUrl} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-text-primary">Live Link <ExternalLink size={16} /></Link>
                  )}
                  {project.githubUrl.startsWith('http') ? (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-white/5">GitHub <GitBranch size={16} /></a>
                  ) : (
                    <Link to={project.githubUrl} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-white/5">GitHub <GitBranch size={16} /></Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
