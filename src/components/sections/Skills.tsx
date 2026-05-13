import { motion } from 'motion/react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaGithub, FaDatabase 
} from 'react-icons/fa';
import { SiExpress, SiMongodb, SiMysql, SiTailwindcss } from 'react-icons/si';
import { useData } from '../../context/DataContext';

const iconMap: Record<string, any> = {
  "HTML": FaHtml5,
  "CSS": FaCss3Alt,
  "JavaScript": FaJs,
  "React.js": FaReact,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": FaNodeJs,
  "Express.js": SiExpress,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "Git": FaGithub,
  "GitHub": FaGithub,
  "Problem Solving": FaDatabase,
  "Teamwork": FaDatabase
};

const colorMap = {
  cyan: "group-hover:text-brand-cyan group-hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] border-brand-cyan/20 group-hover:border-brand-cyan",
  purple: "group-hover:text-brand-purple group-hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] border-brand-purple/20 group-hover:border-brand-purple",
  green: "group-hover:text-brand-green group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] border-brand-green/20 group-hover:border-brand-green",
  blue: "group-hover:text-brand-blue group-hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] border-brand-blue/20 group-hover:border-brand-blue",
};

const textMap = {
  cyan: "text-brand-cyan",
  purple: "text-brand-purple",
  green: "text-brand-green",
  blue: "text-brand-blue",
}

export default function Skills() {
  const { skills } = useData();

  return (
    <section id="skills" className="py-24 relative z-10 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-brand-purple text-glow">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((category, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-panel p-6 flex flex-col justify-between neon-${category.color !== 'blue' ? category.color : 'cyan'} ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <h3 className={`text-xl font-display font-bold mb-6 ${textMap[category.color as keyof typeof textMap]}`}>
                {category.title}
              </h3>
              
              <div className={`grid grid-cols-2 ${isWide ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-1 lg:grid-cols-2'} gap-3 mt-auto`}>
                {category.items.map((skillName) => {
                  const Icon = iconMap[skillName] || FaDatabase; // fallback icon
                  return (
                    <div 
                      key={skillName}
                      className={`group relative flex items-center gap-2 px-3 py-2 bg-white/5 border rounded-xl transition-all duration-300 cursor-default ${colorMap[category.color as keyof typeof colorMap]}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brand-${category.color}`} />
                      <Icon className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[11px] md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                        {skillName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )})}
        </div>
        
        {/* Soft Skills Note */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.6 }}
           className="mt-12 text-center text-slate-400 max-w-2xl mx-auto"
        >
            <p>Beyond code, I excel in <span className="text-white font-medium">Problem Solving</span>, maintain clear <span className="text-white font-medium">Communication</span>, thrive in <span className="text-white font-medium">Teamwork</span>, and embrace <span className="text-white font-medium">Continuous Learning</span> to stay ahead in tech.</p>
        </motion.div>
      </div>
    </section>
  );
}
