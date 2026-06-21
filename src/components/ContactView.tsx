import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github, Instagram, Download } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    try {
      // Send email using Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: name,
          email: email,
          message: message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);

        // Clean inputs
        setName('');
        setEmail('');
        setMessage('');

        // Auto dismiss success toast
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        console.error("Web3Forms Error:", result);
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
      
      {/* Title */}
      <div className="text-center mb-12">
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto">
          Collaborate on semiconductor circuits, micro-electronics firmware, or custom retail campaigns.
        </p>
        <h1 className="font-serif text-[38px] md:text-[50px] text-on-surface font-semibold tracking-tight mt-4">
          Let's Build or<br/><span className="italic text-primary">Let's Party.</span>
        </h1>
        <div className="section-divider mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Real-world contacts & links (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Profile Picture Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 mb-4 rounded-full p-1 border-2 border-primary/30 overflow-hidden hover:border-primary/60 transition-colors duration-300">
              <img 
                src="/profile.jpg" 
                alt="Arya Sharan" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="font-serif text-[22px] text-on-surface font-semibold">Arya Sharan</h3>
            <p className="font-mono text-[10px] text-primary uppercase tracking-widest mt-1">Based in Bangalore, India</p>
          </div>

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
                <div className="p-3 bg-primary/8 text-primary rounded-xl group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/50 block">Electronic Mail</span>
                  <span className="font-sans text-[15px] text-on-surface-variant group-hover:text-primary font-medium duration-350 transition-colors">
                    aryasharan47@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+919110648489"
                className="flex gap-4 items-center group cursor-pointer"
              >
                <div className="p-3 bg-primary/8 text-primary rounded-xl group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/50 block">Mobile Number</span>
                  <span className="font-sans text-[15px] text-on-surface-variant group-hover:text-primary font-medium duration-350 transition-colors">
                    +91 91106 48489
                  </span>
                </div>
              </a>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-primary/8 text-primary rounded-xl shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/50 block">Physical Location</span>
                  <span className="font-sans text-[15px] text-on-surface-variant font-medium">
                    DSCE campus, Bangalore, KA, India.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Grid block */}
            <div className="border-t border-outline-variant/15 pt-6 flex flex-col gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/50">Network Transmissions</span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/arya-sharan-516319200/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-container/60 rounded-xl border border-outline-variant/15 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/Aryakuna14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-container/60 rounded-xl border border-outline-variant/15 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="GitHub Code Repository"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/axya1_7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-container/60 rounded-xl border border-outline-variant/15 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Instagram Stream"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Download Resume Button */}
          <a
            href="https://aryakuna14.github.io/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center justify-center gap-2.5 font-sans text-[12px] uppercase tracking-[0.15em] font-medium bg-surface-container border border-outline-variant/25 text-on-surface px-6 py-3.5 rounded-xl hover:border-primary/40 transition-all duration-300"
          >
            <Download className="h-4 w-4 text-primary" />
            Download Resume
          </a>
        </div>

        {/* Right Side: Message form (7 cols) */}
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
                    className="bg-surface-container/40 border border-outline-variant/20 rounded-xl p-3.5 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-outline-variant/50 transition-colors duration-300"
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
                    className="bg-surface-container/40 border border-outline-variant/20 rounded-xl p-3.5 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-outline-variant/50 transition-colors duration-300"
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
                  className="bg-surface-container/40 border border-outline-variant/20 rounded-xl p-3.5 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-outline-variant/50 resize-none transition-colors duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 bg-primary hover:bg-primary/90 text-[#0a0d10] font-sans text-[12px] uppercase tracking-widest font-semibold p-4 rounded-xl cursor-pointer duration-300 transition-all flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50"
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
                    <span className="font-bold uppercase block">Transmission Successful!</span>
                    Your message has been delivered directly to Arya's inbox. He'll get back to you soon.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
