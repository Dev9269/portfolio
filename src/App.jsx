import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import JourneyPage from './pages/JourneyPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import InterestsPage from './pages/InterestsPage';
import CertificationsPage from './pages/CertificationsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './admin/AdminPage';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function DevToolsBlocker() {
  useEffect(() => {
    const blockKey = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };
    const blockRightClick = (e) => e.preventDefault();

    document.addEventListener('keydown', blockKey);
    document.addEventListener('contextmenu', blockRightClick);
    return () => {
      document.removeEventListener('keydown', blockKey);
      document.removeEventListener('contextmenu', blockRightClick);
    };
  }, []);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark text-text-primary overflow-x-hidden selection:bg-accent/30 selection:text-white">
      <ScrollToTop />
      <DevToolsBlocker />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/interests" element={<InterestsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
