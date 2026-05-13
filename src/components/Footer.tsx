import { useData } from '../context/DataContext';

export default function Footer() {
  const { personal } = useData();
  const firstName = personal.name.split(' ')[0];

  return (
    <footer className="border-t border-white/10 bg-bg-dark/80 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <a href="#home" className="text-2xl font-display font-bold tracking-tighter text-white flex items-center gap-2 mb-2">
            <span className="text-brand-cyan">&lt;</span>
            <span className="text-glow">{firstName}</span>
            <span className="text-brand-cyan">/&gt;</span>
          </a>
          <p className="text-slate-400 text-sm max-w-sm text-center md:text-left">
            "Programs must be written for people to read, and only incidentally for machines to execute."
          </p>
        </div>

        <div className="text-center md:text-right">
          <p className="text-slate-400 text-sm mb-2">
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-end gap-6 text-sm font-medium">
            <a href="#home" className="text-slate-500 hover:text-brand-cyan transition-colors">Home</a>
            <a href="#about" className="text-slate-500 hover:text-brand-purple transition-colors">About</a>
            <a href="#projects" className="text-slate-500 hover:text-brand-green transition-colors">Projects</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
