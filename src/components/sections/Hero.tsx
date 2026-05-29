import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiDownload, FiArrowRight, FiExternalLink, FiX } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const getThumbnailUrl = (link: string) => {
  if (link.includes('drive.google.com')) {
    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w2000`;
    }
  }
  return link;
};

const getDownloadUrl = (link: string) => {
  if (link.includes('drive.google.com')) {
    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      // Direct download link for Google Drive
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return link;
};

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
  const [showResume, setShowResume] = useState(false);

  const handleResumePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowResume(true);
  };

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
              href={personal.resumeLink}
              onClick={handleResumePreview}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border border-white/20 hover:border-brand-purple text-white hover:text-brand-purple transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95 group cursor-pointer"
            >
              View Resume
              <FiExternalLink />
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
                {/* Subtle outer glow */}
                <div className="absolute inset-0 bg-brand-pink/20 blur-[50px] rounded-full mix-blend-screen" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 p-[2px] bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-pink z-10 shadow-[0_0_50px_rgba(217,70,239,0.15)] group hover:scale-[1.02] transition-transform duration-700 hover:shadow-[0_0_80px_rgba(217,70,239,0.3)]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-bg-dark flex items-center justify-center text-slate-500 relative">
                        <img 
                            src={personal.profileImage} 
                            alt={personal.name} 
                            className="w-full h-full object-cover object-[center_20%] z-10 opacity-90 transition-transform duration-700 group-hover:scale-110" 
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/40 to-transparent opacity-60 z-20 mix-blend-overlay"></div>
                    </div>
                </div>

                {/* Floating decor */}
                <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 w-20 h-20 glass-panel flex items-center justify-center text-brand-cyan text-2xl shadow-lg z-20 rounded-2xl border-brand-cyan/30"
                >
                    <span className="font-mono">&lt;/&gt;</span>
                </motion.div>
                <motion.div 
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-6 w-16 h-16 glass-panel flex items-center justify-center text-brand-pink text-xl shadow-lg z-20 rounded-[20px] border-brand-pink/30"
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

      {/* Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-bg-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: 'calc(100vh - 40px)' }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-bg-dark/50">
                <h3 className="text-lg font-bold text-white truncate pr-4">Resume</h3>
                <button 
                  onClick={() => setShowResume(false)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-bg-dark/20">
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/5 bg-white">
                  <img 
                    src={getThumbnailUrl(personal.resumeLink)} 
                    alt="Resume" 
                    className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end p-4 border-t border-white/10 bg-bg-dark/50">
                <a 
                  href={getDownloadUrl(personal.resumeLink)} 
                  target="_blank" 
                  rel="noreferrer"
                  download="Resume.pdf"
                  className="px-6 py-2 bg-brand-cyan text-bg-dark font-bold rounded-full hover:bg-brand-cyan/90 transition-all flex items-center gap-2"
                >
                  <FiDownload /> Download Original
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
