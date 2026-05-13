import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';

export default function About() {
  const { personal } = useData();
  
  return (
    <section id="about" className="py-24 relative z-10 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="text-brand-cyan text-glow">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 glass-panel text-center neon-cyan flex flex-col"
          >
            <span className="badge">Available for Internships</span>
            <div className="avatar-ring mt-4">
              <div className="w-[112px] h-[112px] rounded-full bg-[#111] flex items-center justify-center text-[40px] font-bold text-slate-300">
                {personal.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <h1 className="text-[32px] font-[800] tracking-[-1px] m-0 leading-none mb-2 font-display text-white">{personal.name}</h1>
            <p className="text-[14px] opacity-60 font-mono text-brand-cyan mb-8">{personal.roles[0]} & AI Enthusiast</p>
            
            <div className="flex justify-between mt-auto px-4">
              {personal.about.stats.slice(0,3).map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-[24px] font-[700] text-brand-cyan">{stat.value}</div>
                  <div className="text-[10px] opacity-50 uppercase">{stat.label.split(' ')[0]}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="md:col-span-7 flex flex-col gap-6"
          >
            <div className="glass-panel flex-1 flex flex-col">
              <h3 className="text-[14px] uppercase tracking-[1px] mb-[12px] text-brand-purple font-bold">About Me</h3>
              <div className="space-y-4 text-[14px] leading-[1.6] opacity-80 mb-6">
                {personal.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-auto pt-[16px] border-t border-white/10">
                <div className="text-[11px] opacity-50 mb-[12px] tracking-wider uppercase">Education</div>
                
                <div className="space-y-4">
                  {personal.about.education.map((edu, i) => (
                    <div key={i}>
                      <div className={`text-[14px] font-[600] text-brand-${edu.theme}`}>{edu.degree}</div>
                      <div className="text-[12px] opacity-70">{edu.institution}</div>
                      <div className="text-[11px] opacity-50 font-mono mt-1 flex items-center gap-2">
                         {edu.isCurrent && (
                           <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan relative">
                              <span className="absolute inset-0 bg-brand-cyan rounded-full animate-ping"></span>
                           </span>
                         )}
                         {edu.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel py-4 flex justify-around items-center">
               <a href={personal.contact.github} target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:scale-110 transition-transform font-mono font-bold">GITHUB</a>
               <a href={personal.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:scale-110 transition-transform font-mono font-bold">LINKEDIN</a>
               <a href={`mailto:${personal.contact.email}`} className="text-brand-green hover:scale-110 transition-transform font-mono font-bold">EMAIL</a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
