import { motion } from 'motion/react';
import { FiAward, FiExternalLink } from 'react-icons/fi';
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

export default function Certificates() {
  const { certificates } = useData();

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
                 <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-all active:scale-95 font-medium text-white">
                   Preview <FiExternalLink size={14} />
                 </a>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
