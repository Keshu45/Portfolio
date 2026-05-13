import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

function Typewriter({ texts }: { texts: string[] }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className="text-brand-purple text-glow">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-1 h-6 md:h-10 ml-1 bg-brand-purple align-middle"
      />
    </span>
  );
}

export default function Hero() {
  const { personal } = useData();

  return (
    <section id="home" className="min-h-[70vh] md:min-h-[80vh] flex items-center justify-center pt-8 md:pt-12 px-6 relative">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="order-2 lg:order-1 text-center lg:text-left z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-6"
          >
            Welcome to my digital space
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue drop-shadow-lg">{personal.name}</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 h-12 md:h-16">
            A <Typewriter texts={personal.roles} />
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {personal.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a 
              href="#projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-cyan text-bg-dark font-bold hover:bg-brand-cyan/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,204,0.4)] hover:shadow-[0_0_30px_rgba(0,255,204,0.6)] active:scale-95 group"
            >
              View Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={personal.resumeLink} target="_blank" rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border border-white/20 hover:border-brand-purple text-white hover:text-brand-purple transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group"
            >
              Download Resume
              <FiDownload />
            </a>
          </div>
        </motion.div>

        {/* Profile Image/Graphic Area */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2, type: "spring" }}
           className="order-1 lg:order-2 flex justify-center z-10"
        >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Glowing effects behind the image */}
                <div className="absolute inset-0 bg-brand-blue/30 blur-3xl rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-green rounded-full blur-lg opacity-50 animate-spin-slow" style={{ animationDuration: '10s' }} />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-bg-dark p-2 bg-bg-dark z-10">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center text-slate-500 relative">
                        <img 
                            src={personal.profileImage} 
                            alt={personal.name} 
                            className="w-full h-full object-cover object-[center_20%] z-10" 
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>

                {/* Floating decor */}
                <motion.div 
                    animate={{ y: [0, -20, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 w-24 h-24 glass-panel flex items-center justify-center text-brand-cyan text-4xl shadow-[0_0_15px_rgba(0,255,204,0.3)] z-20"
                >
                    <span className="font-mono">&lt;/&gt;</span>
                </motion.div>
                <motion.div 
                    animate={{ y: [0, 20, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-5 -left-10 w-20 h-20 glass-panel flex items-center justify-center text-brand-purple text-4xl shadow-[0_0_15px_rgba(176,38,255,0.3)] z-20"
                >
                    <span className="font-mono">{'{}'}</span>
                </motion.div>
            </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
