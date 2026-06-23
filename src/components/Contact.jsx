import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, GitBranch, Mail, Network, Send } from 'lucide-react';
import { getContact } from '../data/liveData';

export default function Contact() {
  const contact = getContact();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log(form);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="border-t border-white/10 bg-[#080808] px-5 py-28 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.36em] text-accent">Contact</p>
          <h2 className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">Let's Build Something Meaningful.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            {contact.intro}
          </p>
          <div className="mt-10 grid gap-3 text-text-secondary">
            <a href={`mailto:${contact.email}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-accent hover:text-white"><Mail size={18} /> {contact.email}</a>
            <a href={contact.github} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-accent hover:text-white"><GitBranch size={18} /> GitHub</a>
            <a href={contact.linkedin} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-accent hover:text-white"><Network size={18} /> LinkedIn</a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-accent hover:text-white"><Camera size={18} /> Instagram</a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-white">Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-text-primary outline-none transition focus:border-accent"
              placeholder="Your name"
            />
            </label>

            <label className="block text-sm font-medium text-white">Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-text-primary outline-none transition focus:border-accent"
              placeholder="your@email.com"
            />
            </label>
          </div>

          <label className="mt-5 block text-sm font-medium text-white">Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-text-primary outline-none transition focus:border-accent"
              placeholder="Tell me what you want to build..."
            />
          </label>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition hover:bg-text-primary"
          >
            Send Message <Send size={18} />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
