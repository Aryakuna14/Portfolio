import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Terminal, Linkedin, Github, Instagram } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [outbox, setOutbox] = useState<ContactMessage[]>([]);

  // Load sent messages on component mount from LocalStorage
  useEffect(() => {
    try {
      const persisted = localStorage.getItem('arya_portfolio_messages');
      if (persisted) {
        setOutbox(JSON.parse(persisted));
      }
    } catch (e) {
      console.error('Error loading outbox logs', e);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate standard webhook handshake delay
    setTimeout(() => {
      const newMessage: ContactMessage = {
        name,
        email,
        message,
        timestamp: new Date().toLocaleTimeString()
      };

      const updatedOutbox = [newMessage, ...outbox];
      setOutbox(updatedOutbox);
      
      try {
        localStorage.setItem('arya_portfolio_messages', JSON.stringify(updatedOutbox));
      } catch (err) {
        console.error(err);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Clean inputs
      setName('');
      setEmail('');
      setMessage('');

      // Auto dismiss success toast
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const clearOutbox = () => {
    setOutbox([]);
    localStorage.removeItem('arya_portfolio_messages');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#f8fafc] font-semibold border border-white/15 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md shadow-md inline-block">
          Get in Touch
        </span>
        <h1 className="font-serif text-[42px] md:text-[54px] text-on-surface font-semibold mt-4 tracking-tight">
          Let's Build or Let's Party
        </h1>
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto mt-2">
          Collaborate on semiconductor circuits, micro-electronics firmware, or custom retail campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Real-world contacts & links (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
            
            <h2 className="font-serif text-[22px] md:text-[25px] font-bold text-on-surface border-b border-outline-variant/15 pb-3">
              Direct Channels
            </h2>

            <div className="flex flex-col gap-5">
              <a
                href="mailto:aryasharan47@gmail.com"
                className="flex gap-4 items-center group cursor-pointer"
              >
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-outline-variant block">Electronic Mail</span>
                  <span className="font-sans text-[15px] text-on-surface-variant group-hover:text-primary font-medium duration-350 transition-colors">
                    aryasharan47@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+919110648489"
                className="flex gap-4 items-center group cursor-pointer"
              >
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-outline-variant block">Mobile Number</span>
                  <span className="font-sans text-[15px] text-on-surface-variant group-hover:text-primary font-medium duration-350 transition-colors">
                    +91 91106 48489
                  </span>
                </div>
              </a>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-outline-variant block">Physical Location</span>
                  <span className="font-sans text-[15px] text-on-surface-variant font-medium">
                    DSCE campus, Bangalore, KA, India.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Grid block */}
            <div className="border-t border-outline-variant/15 pt-6 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-outline-variant/80 uppercase">Network Outlets</span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/arya-sharan-516319200/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0c0e10] rounded-xl border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/Aryakuna14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0c0e10] rounded-xl border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="GitHub Code Repository"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/axya1_7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0c0e10] rounded-xl border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Instagram Stream"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message form & submitted list outbox (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 md:p-8 text-left relative overflow-hidden flex flex-col gap-5">
            <h2 className="font-serif text-[22px] md:text-[25px] font-bold text-on-surface border-b border-outline-variant/15 pb-3">
              Send Web-Message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase">Full Identifier</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-[#0c0e10]/80 border border-outline-variant/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-outline-variant/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-on-surface-variant uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-[#0c0e10]/80 border border-outline-variant/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-outline-variant/50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase">Message Context</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey Arya! Let's talk about semiconductors, your Lowwkey streetwear brand, or emceeing opportunities..."
                  className="bg-[#0c0e10]/80 border border-outline-variant/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-outline-variant/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 bg-primary hover:bg-primary-container text-black hover:text-white font-mono text-xs uppercase tracking-widest font-semibold p-4 rounded-xl cursor-pointer duration-300 transition-all flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    Compile & Transmit
                  </>
                )}
                <div className="absolute bottom-0 left-0 w-full h-[2px] cyber-streak opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>

            {/* Success announcement popup info */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-950/40 border border-green-800 text-green-400 p-4 rounded-xl flex items-center gap-3 text-xs leading-relaxed"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                  <div>
                    <span className="font-bold uppercase block">Handshake Established!</span>
                    Your message has been compiled and cached in your local outbox pipeline below.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent client outbox feed logs */}
          {outbox.length > 0 && (
            <div className="glass-card rounded-2xl p-6 text-left relative overflow-hidden flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                  <Terminal className="h-3.5 w-3.5" /> Outbox Feed Queue
                </span>
                <button
                  onClick={clearOutbox}
                  className="font-mono text-[9px] text-outline-variant hover:text-red-400 cursor-pointer"
                >
                  Clear Queue
                </button>
              </div>

              <div className="space-y-3.5 max-h-56 overflow-y-auto">
                {outbox.map((msg, idx) => (
                  <div key={idx} className="bg-[#0c0e10]/85 rounded-xl p-3.5 border border-outline-variant/20 flex flex-col gap-1.5">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-primary font-bold">{msg.name}</span>
                      <span className="text-outline-variant/80">{msg.timestamp}</span>
                    </div>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
