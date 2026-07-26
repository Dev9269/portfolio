import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { articles } from '../data/blogData';

export default function Blog() {
  return (
    <section id="blog" className="px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Thoughts & research</p>
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Stories from the build log.</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Security research, OS development, CTF strategies, and everything in between.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-accent/30"
            >
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${article.gradient}`}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold leading-snug tracking-[-0.03em] text-white transition group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readTime}</span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm text-accent opacity-0 transition group-hover:opacity-100">
                  Read more <ArrowRight size={14} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
