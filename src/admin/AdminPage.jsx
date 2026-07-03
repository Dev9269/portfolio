import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Save, Plus, Trash2, Eye, ArrowLeft, AlertTriangle } from 'lucide-react';
import {
  getProfile, getAbout, getProjects, getSkillGroups, getJourney,
  getCompetitions, getInterests, getGoals, getCertifications,
  saveProfile, saveAbout, saveProjects, saveSkillGroups, saveJourney,
  saveCompetitions, saveInterests, saveGoals, saveCertifications, resetAll,
} from '../data/liveData';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const LOCKOUT_KEY = 'admin-lockout';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getLockoutEnd() {
  const stored = sessionStorage.getItem(LOCKOUT_KEY);
  if (!stored) return null;
  const end = parseInt(stored, 10);
  return Date.now() < end ? end : null;
}

function setLockout() {
  sessionStorage.setItem(LOCKOUT_KEY, String(Date.now() + LOCKOUT_MINUTES * 60 * 1000));
}

function LockoutDisplay() {
  const [remaining, setRemaining] = useState(() => {
    const end = getLockoutEnd();
    return end ? Math.ceil((end - Date.now()) / 60000) : 0;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const end = getLockoutEnd();
      if (!end) {
        clearInterval(timer);
        window.location.reload();
        return;
      }
      setRemaining(Math.ceil((end - Date.now()) / 60000));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5">
      <div className="w-full max-w-sm rounded-[2rem] border border-red-500/20 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <AlertTriangle size={24} />
        </div>
        <h1 className="mb-2 text-xl font-semibold text-white">Access Locked</h1>
        <p className="text-sm text-text-secondary">Too many failed attempts. Try again in <span className="text-red-400">{remaining}</span> minute(s).</p>
      </div>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getLockoutEnd()) {
      setError(`Too many attempts. Try again later.`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const adminHash = import.meta.env.VITE_ADMIN_HASH;
      if (!adminHash) {
        setError('Admin panel not configured.');
        setLoading(false);
        return;
      }

      const inputHash = await hashPassword(pass);

      if (inputHash === adminHash) {
        sessionStorage.setItem('admin-auth', 'true');
        onLogin();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          setLockout();
          setError(`Too many attempts. Locked for ${LOCKOUT_MINUTES} min.`);
        } else {
          setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`);
        }
      }
    } catch {
      setError('Authentication error.');
    }

    setLoading(false);
  };

  if (getLockoutEnd()) return <LockoutDisplay />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <Lock size={24} />
        </div>
        <h1 className="mb-2 text-center text-2xl font-semibold text-white">Admin Access</h1>
        <p className="mb-6 text-center text-sm text-text-secondary">Authenticate to manage portfolio</p>
        <input
          type="password"
          value={pass}
          onChange={(e) => { setPass(e.target.value); setError(''); }}
          placeholder="Password"
          className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-center text-text-primary outline-none transition focus:border-accent"
          autoFocus
        />
        {error && <p className="mt-3 text-center text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-white py-4 font-semibold text-black transition hover:bg-text-primary disabled:opacity-60"
        >
          {loading ? 'Verifying...' : 'Unlock'}
        </button>
      </motion.form>
    </div>
  );
}

function Section({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left text-white transition hover:bg-white/[0.02]"
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className={`text-text-secondary transition ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && <div className="border-t border-white/10 px-6 py-5">{children}</div>}
    </div>
  );
}

function ArrayEditor({ items, renderItem, defaultItem, label }) {
  const [list, setList] = useState(items);

  const add = () => setList([...list, { ...defaultItem }]);
  const remove = (i) => setList(list.filter((_, idx) => idx !== i));
  const update = (i, field, value) => {
    const copy = [...list];
    copy[i] = { ...copy[i], [field]: value };
    setList(copy);
  };

  return (
    <div>
      {list.map((item, i) => (
        <div key={i} className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-text-secondary">{label} {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-red-400 transition hover:text-red-300"><Trash2 size={14} /></button>
          </div>
          {renderItem(item, i, (field, value) => update(i, field, value))}
        </div>
      ))}
      <button type="button" onClick={add} className="mt-2 flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-text-secondary transition hover:border-accent hover:text-white">
        <Plus size={14} /> Add {label}
      </button>
    </div>
  );
}

function Field({ label, value, onChange, multiline, type }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-xs text-text-secondary">{label}</span>
      <Tag
        type={type || 'text'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent"
        rows={multiline ? 3 : undefined}
      />
    </label>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getProfile());
  const [about, setAbout] = useState(getAbout());
  const [projects, setProjects] = useState(getProjects());
  const [skillGroups, setSkillGroupsState] = useState(getSkillGroups());
  const [journey, setJourney] = useState(getJourney());
  const [competitions, setCompetitions] = useState(getCompetitions());
  const [interests, setInterests] = useState(getInterests());
  const [goals, setGoals] = useState(getGoals());
  const [certifications, setCertifications] = useState(getCertifications());
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 2000); };

  const handleSave = () => {
    setSaving(true);
    saveProfile(profile);
    saveAbout(about);
    saveProjects(projects);
    saveSkillGroups(skillGroups);
    saveJourney(journey);
    saveCompetitions(competitions);
    saveInterests(interests);
    saveGoals(goals);
    saveCertifications(certifications);
    setTimeout(() => { setSaving(false); showMsg('All changes saved!'); }, 300);
  };

  const handleReset = () => {
    if (window.confirm('Reset all portfolio data to defaults? This cannot be undone.')) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button type="button" onClick={() => navigate('/')} className="mb-3 flex items-center gap-2 text-sm text-text-secondary transition hover:text-white"><ArrowLeft size={14} /> Back to portfolio</button>
            <h1 className="text-4xl font-semibold tracking-[-0.06em] text-white">Admin Panel</h1>
            <p className="mt-1 text-sm text-text-secondary">Edit your portfolio content. Changes save to browser storage.</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate('/')} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/5"><Eye size={16} /> Preview</button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-text-primary disabled:opacity-60"
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save All'}
            </button>
          </div>
        </div>

        {msg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-300">
            {msg}
          </motion.div>
        )}

        <div className="space-y-4">
          <Section title="Profile">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
              <Field label="Tagline" value={profile.tagline} onChange={(v) => setProfile({ ...profile, tagline: v })} />
              <Field label="Eyebrow" value={profile.eyebrow} onChange={(v) => setProfile({ ...profile, eyebrow: v })} />
              <Field label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} />
              <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
              <Field label="GitHub URL" value={profile.github} onChange={(v) => setProfile({ ...profile, github: v })} />
              <Field label="LinkedIn URL" value={profile.linkedin} onChange={(v) => setProfile({ ...profile, linkedin: v })} />
              <Field label="Instagram URL" value={profile.instagram} onChange={(v) => setProfile({ ...profile, instagram: v })} />
            </div>
            <Field label="Roles (comma-separated)" value={profile.roles.map((r) => r.title).join(', ')} onChange={(v) => setProfile({ ...profile, roles: v.split(',').map((t) => ({ title: t.trim(), icon: 'Shield' })) })} />
            <Field label="Focus areas (comma-separated)" value={profile.focus.join(', ')} onChange={(v) => setProfile({ ...profile, focus: v.split(',').map((t) => t.trim()) })} />
          </Section>

          <Section title="About">
            <Field label="Story" value={about.story} multiline onChange={(v) => setAbout({ ...about, story: v })} />
            <Field label="Detail" value={about.detail} multiline onChange={(v) => setAbout({ ...about, detail: v })} />
            <Field label="Pillars (comma-separated)" value={about.pillars.join(', ')} onChange={(v) => setAbout({ ...about, pillars: v.split(',').map((t) => t.trim()) })} />
          </Section>

          <Section title="Projects">
            <ArrayEditor
              items={projects}
              onSave={setProjects}
              defaultItem={{ title: '', tag: '', description: '', stack: [], impact: '', gradient: 'from-blue-500/20 to-transparent', image: '', liveUrl: '', githubUrl: '', highlights: [] }}
              label="Project"
              renderItem={(item, i, onChange) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Title" value={item.title} onChange={(v) => onChange('title', v)} />
                  <Field label="Tag" value={item.tag} onChange={(v) => onChange('tag', v)} />
                  <div className="sm:col-span-2"><Field label="Description" value={item.description} multiline onChange={(v) => onChange('description', v)} /></div>
                  <Field label="Impact" value={item.impact} onChange={(v) => onChange('impact', v)} />
                  <Field label="Image URL" value={item.image} onChange={(v) => onChange('image', v)} />
                  <Field label="Live URL" value={item.liveUrl} onChange={(v) => onChange('liveUrl', v)} />
                  <Field label="GitHub URL" value={item.githubUrl} onChange={(v) => onChange('githubUrl', v)} />
                  <div className="sm:col-span-2"><Field label="Stack (comma-separated)" value={item.stack.join(', ')} onChange={(v) => onChange('stack', v.split(',').map((t) => t.trim()))} /></div>
                  <div className="sm:col-span-2"><Field label="Highlights (pipe-separated)" value={item.highlights.join(' | ')} onChange={(v) => onChange('highlights', v.split('|').map((t) => t.trim()))} /></div>
                </div>
              )}
            />
          </Section>

          <Section title="Skills">
            <ArrayEditor
              items={skillGroups}
              onSave={setSkillGroupsState}
              defaultItem={{ category: '', skills: [] }}
              label="Skill Group"
              renderItem={(item, i, onChange) => (
                <div>
                  <Field label="Category" value={item.category} onChange={(v) => onChange('category', v)} />
                  <Field label="Skills (format: name:level, comma-separated)" value={item.skills.map((s) => `${s.name}:${s.level}`).join(', ')} onChange={(v) => onChange('skills', v.split(',').filter(Boolean).map((s) => { const [name, level] = s.trim().split(':'); return { name: name?.trim() || '', level: parseInt(level) || 50 }; }))} />
                </div>
              )}
            />
          </Section>

          <Section title="Journey Timeline">
            <ArrayEditor
              items={journey}
              onSave={setJourney}
              defaultItem={{ year: '2026', title: '', description: '' }}
              label="Milestone"
              renderItem={(item, i, onChange) => (
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Year" value={item.year} onChange={(v) => onChange('year', v)} />
                  <div className="sm:col-span-2"><Field label="Title" value={item.title} onChange={(v) => onChange('title', v)} /></div>
                  <div className="sm:col-span-3"><Field label="Description" value={item.description} multiline onChange={(v) => onChange('description', v)} /></div>
                </div>
              )}
            />
          </Section>

          <Section title="Competitions / CTFs">
            <ArrayEditor
              items={competitions}
              onSave={setCompetitions}
              defaultItem={{ name: '', team: '', rank: '', outOf: '', score: null, badge: 'Participant', description: '', gradient: 'from-blue-500/20 to-transparent' }}
              label="Competition"
              renderItem={(item, i, onChange) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name" value={item.name} onChange={(v) => onChange('name', v)} />
                  <Field label="Badge" value={item.badge} onChange={(v) => onChange('badge', v)} />
                  <Field label="Team" value={item.team} onChange={(v) => onChange('team', v)} />
                  <Field label="Rank" value={item.rank} onChange={(v) => onChange('rank', v)} />
                  <Field label="Out Of" value={item.outOf} onChange={(v) => onChange('outOf', v)} />
                  <Field label="Score" value={item.score ?? ''} type="number" onChange={(v) => onChange('score', v ? parseInt(v) : null)} />
                  <div className="sm:col-span-2"><Field label="Description" value={item.description} multiline onChange={(v) => onChange('description', v)} /></div>
                </div>
              )}
            />
          </Section>

          <Section title="Interests">
            <Field
              label="Interests (comma-separated)"
              value={interests.join(', ')}
              multiline
              onChange={(v) => setInterests(v.split(',').map((t) => t.trim()))}
            />
          </Section>

          <Section title="Goals & Vision">
            <Field label="Vision" value={goals.vision} multiline onChange={(v) => setGoals({ ...goals, vision: v })} />
            <Field label="Short-term goals (pipe-separated)" value={goals.shortTerm.join(' | ')} multiline onChange={(v) => setGoals({ ...goals, shortTerm: v.split('|').map((t) => t.trim()) })} />
            <Field label="Long-term goals (pipe-separated)" value={goals.longTerm.join(' | ')} multiline onChange={(v) => setGoals({ ...goals, longTerm: v.split('|').map((t) => t.trim()) })} />
          </Section>

          <Section title="Certifications">
            <ArrayEditor
              items={certifications}
              onSave={setCertifications}
              defaultItem={{ title: '', issuer: '', description: '' }}
              label="Certification"
              renderItem={(item, i, onChange) => (
                <div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title" value={item.title} onChange={(v) => onChange('title', v)} />
                    <Field label="Issuer" value={item.issuer} onChange={(v) => onChange('issuer', v)} />
                  </div>
                  <Field label="Description" value={item.description} multiline onChange={(v) => onChange('description', v)} />
                </div>
              )}
            />
          </Section>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button type="button" onClick={handleReset} className="rounded-full border border-red-500/30 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
            Reset All Data
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-text-primary"
          >
            <Save size={18} /> Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('admin-auth') === 'true'
  );

  const handleLogin = () => {
    sessionStorage.setItem('admin-auth', 'true');
    setAuthenticated(true);
  };

  if (getLockoutEnd()) return <LockoutDisplay />;

  if (!authenticated) return <LoginForm onLogin={handleLogin} />;
  return <AdminDashboard />;
}
