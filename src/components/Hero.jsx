import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { getProfile } from '../data/liveData';

function GlobeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};

    import('three').then((THREE) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

      const group = new THREE.Group();
      scene.add(group);

      const points = [];
      const geometry = new THREE.BufferGeometry();
      const count = 140;

      for (let i = 0; i < count; i += 1) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const radius = 2.45 + Math.sin(i) * 0.08;
        points.push(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        );
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      group.add(new THREE.Points(
        geometry,
        new THREE.PointsMaterial({ color: 0x7ca8ff, size: 0.045, transparent: true, opacity: 0.85 }),
      ));

      const linePositions = [];
      for (let i = 0; i < points.length; i += 9) {
        linePositions.push(points[i], points[i + 1], points[i + 2], points[(i + 9) % points.length], points[(i + 10) % points.length], points[(i + 11) % points.length]);
      }
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      group.add(new THREE.LineSegments(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.18 }),
      ));

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.72, 0.006, 16, 160),
        new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.35 }),
      );
      ring.rotation.x = 1.2;
      group.add(ring);

      const resize = () => {
        const size = canvas.parentElement?.clientWidth || 520;
        renderer.setSize(size, size, false);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);

      let frame;
      const animate = () => {
        group.rotation.y += 0.0025;
        group.rotation.x = Math.sin(Date.now() * 0.00035) * 0.12;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        geometry.dispose();
        lineGeometry.dispose();
        renderer.dispose();
      };
    });

    return () => cleanup();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" aria-hidden="true" />;
}

export default function Hero() {
  const profile = getProfile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [8, -8]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-10, 10]), { stiffness: 140, damping: 18 });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-24 sm:pb-20 sm:pt-28" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(99,102,241,0.16),transparent_30%),linear-gradient(180deg,#050505,#0b0b0b_55%,#050505)]" />
      <div className="absolute left-1/2 top-20 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-text-secondary backdrop-blur-xl">
            {profile.eyebrow}
          </motion.div>

          <h1 id="hero-title" className="max-w-4xl text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-xl sm:leading-8 lg:text-2xl">
            {profile.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} className="mt-8 grid max-w-xl grid-cols-2 gap-3 text-sm text-text-secondary sm:grid-cols-4">
            {profile.roles.map((role) => (
              <span key={role.title} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur">
                {role.title}
              </span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <motion.div whileHover={{ y: -2 }} className="w-full sm:w-auto">
              <Link
                to="/projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.18)] transition hover:bg-text-primary sm:w-auto"
              >
                View Projects <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.a
              href={import.meta.env.BASE_URL + 'resume.html'}
              whileHover={{ y: -2 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-accent hover:bg-white/5 sm:w-auto"
            >
              Download Resume <Download size={16} />
            </motion.a>
            <motion.div whileHover={{ y: -2 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-accent hover:bg-white/5 sm:w-auto"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="relative mx-auto w-full max-w-[560px]" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 1 }}>
          <div className="aspect-square">
            <GlobeCanvas />
          </div>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              mouseX.set(event.clientX - rect.left - rect.width / 2);
              mouseY.set(event.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            className="relative mt-6 w-full rounded-[2rem] border border-white/15 bg-white/[0.075] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:absolute md:bottom-4 md:right-0 md:mt-0 md:w-[360px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-sm text-emerald-300"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" /> {profile.status}</div>
              <div className="flex items-center gap-2 text-sm text-text-secondary"><MapPin size={15} /> {profile.location}</div>
            </div>
            <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-white/10">
              <img
                src={import.meta.env.BASE_URL + 'profile.png'}
                alt={profile.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm uppercase tracking-[0.3em] text-text-secondary">Current Focus</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.focus.map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">{item}</span>)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
