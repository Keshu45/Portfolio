import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiAward, FiExternalLink, FiX } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const themeMap = [
  "neon-cyan text-brand-cyan bg-brand-cyan/10 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]",
  "neon-purple text-brand-purple bg-brand-purple/10 hover:shadow-[0_0_30px_rgba(160,32,240,0.15)]",
  "neon-green text-brand-green bg-brand-green/10 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]"
];

const colorMap = [
  "text-brand-cyan",
  "text-brand-purple",
  "text-brand-green"
];

const getThumbnailUrl = (link: string) => {
  if (link.includes('drive.google.com')) {
    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w2000`;
    }
  }
  return link;
};

export default function Certificates() {
  const { certificates } = useData();
  const [selectedCert, setSelectedCert] = useState<{title: string, link: string} | null>(null);

  const handlePreview = (e: React.MouseEvent, cert: any) => {
    e.preventDefault();
    setSelectedCert(cert);
  };

  return (
    <section id="certificates" className="py-24 relative z-10 px-6">
      <div className="container mx-auto max-w-7xl">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Awards & <span className="text-brand-purple text-glow">Certificates</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
             <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`glass-card p-8 text-center group transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${themeMap[idx % 3]}`}
             >
               <div>
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <FiAward size={28} className={colorMap[idx % 3]} />
                 </div>
                 
                 <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                 {cert.issuer && <p className="text-sm opacity-70 mb-6">{cert.issuer}</p>}
               </div>
               
               <div className="flex items-center justify-between text-sm mt-auto pt-6 border-t border-white/10">
                 <span className={`font-mono font-bold ${colorMap[idx % 3]}`}>{cert.date}</span>
                 <a 
                   href={cert.link} 
                   onClick={(e) => handlePreview(e, cert)}
                   className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-all active:scale-95 font-medium text-white cursor-pointer"
                 >
                   Preview <FiExternalLink size={14} />
                 </a>
               </div>
             </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
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
                <h3 className="text-lg font-bold text-white truncate pr-4">{selectedCert.title}</h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-bg-dark/20">
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/5 bg-white">
                  <img 
                    src={getThumbnailUrl(selectedCert.link)} 
                    alt={selectedCert.title} 
                    className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
