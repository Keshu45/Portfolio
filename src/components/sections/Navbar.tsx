import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 w-full z-40 transition-all duration-300 ease-in-out',
        scrolled ? 'py-4 glass-panel rounded-none border-t-0 border-x-0 border-b-white/10 shadow-lg shadow-black/50' : 'py-6 bg-bg-dark/80 backdrop-blur-md border-b border-transparent'
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#home" className="text-2xl font-display font-bold tracking-tighter text-white flex items-center gap-2">
          <span className="text-brand-cyan">&lt;</span>
          <span className="text-glow">Keshav</span>
          <span className="text-brand-cyan">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-transparent border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 transition-all shadow-[0_0_10px_rgba(0,255,204,0.3)] hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] active:scale-95"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full glass-panel border-x-0 rounded-none border-b-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-brand-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-3 text-sm font-semibold rounded-xl bg-brand-cyan/10 border border-brand-cyan text-brand-cyan"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
