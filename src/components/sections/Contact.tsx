import { useState } from 'react';
import { motion } from 'motion/react';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiMapPin, FiSend } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

export default function Contact() {
  const { personal } = useData();
  const { contact } = personal;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Open default email client
      window.location.href = `mailto:${contact.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AContact Email: ${formData.email}`;
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 px-6">
      <div className="container mx-auto max-w-6xl">
         <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="text-brand-purple text-glow">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info Cards */}
          <div className="flex flex-col gap-6">
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-300 mb-4"
            >
              {contact.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 glass-panel hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(0,255,204,0.15)] active:scale-95 transition-all group overflow-hidden">
                <div className="p-3 sm:p-4 bg-brand-cyan/10 rounded-full text-brand-cyan group-hover:scale-110 transition-transform shrink-0">
                  <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-slate-400 font-mono">Email</div>
                  <div className="text-sm sm:text-lg text-white font-medium break-all">{contact.email}</div>
                </div>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <a href={`tel:${contact.mobile}`} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 glass-panel hover:border-brand-green/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] active:scale-95 transition-all group overflow-hidden">
                <div className="p-3 sm:p-4 bg-brand-green/10 rounded-full text-brand-green group-hover:scale-110 transition-transform shrink-0">
                  <FiPhone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-slate-400 font-mono">Mobile</div>
                  <div className="text-sm sm:text-lg text-white font-medium break-all">{contact.mobile}</div>
                </div>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex gap-4">
               <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center p-6 glass-panel hover:border-[#0077b5]/50 hover:shadow-[0_0_20px_rgba(0,119,181,0.2)] active:scale-95 transition-all group">
                  <FiLinkedin size={28} className="text-slate-400 group-hover:text-[#0077b5] mb-2 transition-colors" />
                  <span className="text-sm text-white font-medium">LinkedIn</span>
               </a>
               <a href={contact.github} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center p-6 glass-panel hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all group">
                  <FiGithub size={28} className="text-slate-400 group-hover:text-white mb-2 transition-colors" />
                  <span className="text-sm text-white font-medium">GitHub</span>
               </a>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-4 p-6 glass-panel">
                <div className="p-4 bg-brand-purple/10 rounded-full text-brand-purple">
                  <FiMapPin size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-slate-400 font-mono">Location</div>
                  <div className="text-lg text-white font-medium break-all">{contact.location}</div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="glass-panel p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <h3 className="text-2xl font-display font-bold text-white mb-6">Send Me a Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm ml-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm ml-1">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                <textarea 
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-bg-dark/50 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none`}
                  placeholder={`Hello ${personal.name.split(' ')[0]}, I would like to discuss...`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm ml-1">{errors.message}</p>}
              </div>
              
              {isSubmitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-brand-green/20 border border-brand-green/50 text-brand-green rounded-xl text-center font-medium">
                  Thank you! Your message has been sent.
                </motion.div>
              )}

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-brand-cyan text-bg-dark font-bold hover:bg-brand-cyan/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:shadow-[0_0_30px_rgba(0,255,204,0.5)] active:scale-95 active:shadow-none"
              >
                Send Message <FiSend />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
            }
