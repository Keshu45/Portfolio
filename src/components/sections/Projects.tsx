import { motion } from 'motion/react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const colorThemes: Record<string, string> = {
  cyan: "group-hover:border-brand-cyan group-hover:shadow-[0_0_30px_rgba(0,255,204,0.15)]",
  purple: "group-hover:border-brand-purple group-hover:shadow-[0_0_30px_rgba(176,38,255,0.15)]",
  green: "group-hover:border-brand-green group-hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]",
  blue: "group-hover:border-brand-blue group-hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]"
};

const bgPatterns: Record<string, string> = {
  cyan: "bg-brand-cyan/5",
  purple: "bg-brand-purple/5",
  green: "bg-brand-green/5",
  blue: "bg-brand-blue/5"
};

const accents: Record<string, string> = {
  cyan: "text-brand-cyan",
  purple: "text-brand-purple",
  green: "text-brand-green",
  blue: "text-brand-blue"
};

export default function Projects() {
  const { projects } = useData();

  return (
    <section id="projects" className="py-24 relative z-10 px-6">
      <div className="container mx-auto max-w-7xl">
         <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-brand-blue text-glow">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const isWide = idx === 0 || idx === 3;
            const themeClass = colorThemes[project.colorTheme] || colorThemes.cyan;
            const bgClass = bgPatterns[project.colorTheme] || bgPatterns.cyan;
            const accentClass = accents[project.colorTheme] || accents.cyan;

            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`glass-panel flex flex-col justify-between h-full group transition-all duration-500 ease-out border border-white/10 hover:-translate-y-2 ${themeClass} ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h4 className="m-0 text-xl font-display font-bold text-white">{project.title}</h4>
                <span className={`text-sm ${accentClass} font-mono font-bold shrink-0`}>{project.subtitle.split(' ')[0]} {project.subtitle.split(' ')[1] || ''}</span>
              </div>
              
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-bg-dark/60 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className={`absolute inset-0 ${bgClass} mix-blend-overlay z-10`} />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <p className="text-sm opacity-70 mb-6 flex-1">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, isWide ? 4 : 2).map(t => (
                        <span key={t} className="bento-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => { if(project.github === '#') e.preventDefault() }} className="p-1.5 bg-white/5 rounded-md hover:bg-white/20 transition-all active:scale-95">
                            <FiGithub size={16} />
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => { if(project.live === '#') e.preventDefault() }} className="p-1.5 bg-white/5 rounded-md hover:bg-white/20 transition-all active:scale-95">
                            <FiExternalLink size={16} />
                        </a>
                    </div>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
