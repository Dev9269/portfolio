import { profile, about, stats, journey, competitions, projects, skillGroups, cyberExpertise, interests, goals, certifications, contact } from './portfolio';

const STORAGE_KEY = 'portfolio-data';

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    return {};
  }
  return {};
}

function saveOverrides(partial) {
  const current = loadOverrides();
  const merged = { ...current, ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function getProfile() {
  return { ...profile, ...loadOverrides().profile };
}

export function getAbout() {
  return { ...about, ...loadOverrides().about };
}

export function getStats() {
  return loadOverrides().stats || stats;
}

export function getJourney() {
  return loadOverrides().journey || journey;
}

export function getCompetitions() {
  return loadOverrides().competitions || competitions;
}

export function getProjects() {
  return loadOverrides().projects || projects;
}

export function getSkillGroups() {
  return loadOverrides().skillGroups || skillGroups;
}

export function getCyberExpertise() {
  return loadOverrides().cyberExpertise || cyberExpertise;
}

export function getInterests() {
  return loadOverrides().interests || interests;
}

export function getGoals() {
  return { ...goals, ...loadOverrides().goals };
}

export function getCertifications() {
  return loadOverrides().certifications || certifications;
}

export function getContact() {
  return { ...contact, ...loadOverrides().contact };
}

export function saveProfile(data) {
  saveOverrides({ profile: { ...profile, ...loadOverrides().profile, ...data } });
}

export function saveAbout(data) {
  saveOverrides({ about: { ...about, ...loadOverrides().about, ...data } });
}

export function saveStats(data) {
  saveOverrides({ stats: data });
}

export function saveJourney(data) {
  saveOverrides({ journey: data });
}

export function saveCompetitions(data) {
  saveOverrides({ competitions: data });
}

export function saveProjects(data) {
  saveOverrides({ projects: data });
}

export function saveSkillGroups(data) {
  saveOverrides({ skillGroups: data });
}

export function saveCyberExpertise(data) {
  saveOverrides({ cyberExpertise: data });
}

export function saveInterests(data) {
  saveOverrides({ interests: data });
}

export function saveGoals(data) {
  saveOverrides({ goals: { ...goals, ...loadOverrides().goals, ...data } });
}

export function saveCertifications(data) {
  saveOverrides({ certifications: data });
}

export function saveContact(data) {
  saveOverrides({ contact: { ...contact, ...loadOverrides().contact, ...data } });
}

export function resetAll() {
  localStorage.removeItem(STORAGE_KEY);
}
