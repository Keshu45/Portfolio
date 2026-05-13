/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { FiArrowUp } from 'react-icons/fi';
import Scene from './components/3d/Scene';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 blur-xl bg-brand-cyan/30 rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showToTop, setShowToTop] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Cursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-green origin-left z-[60]"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="relative min-h-screen"
        >
          {/* Global 3D Background */}
          <div className="fixed inset-0 z-[-2]">
            <Scene />
          </div>
          <div className="fixed inset-0 z-[-1] grid-bg-overlay mix-blend-screen" />

          <Navbar />
          
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
          </main>

          <Footer />

          {/* Back to Top */}
          <AnimatePresence>
            {showToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-bg-dark border border-brand-cyan text-brand-cyan rounded-full shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:shadow-[0_0_30px_rgba(0,255,204,0.6)] hover:bg-brand-cyan/10 transition-all z-40"
              >
                <FiArrowUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}

