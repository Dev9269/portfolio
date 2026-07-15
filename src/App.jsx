import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import BackToTop from './components/BackToTop';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const InterestsPage = lazy(() => import('./pages/InterestsPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./admin/AdminPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}

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
      <a href="#main-content" className="fixed left-2 top-2 z-[60] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg transition focus:translate-y-0">
        Skip to content
      </a>
      <ScrollToTop />
      <DevToolsBlocker />
      <Navbar />
      <BackToTop />
      <main id="main-content">
      <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
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
              <Route path="/superadminxyz" element={<AdminPage />} />
              <Route path="/admin" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
