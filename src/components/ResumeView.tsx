import { FileText, Download, ExternalLink, Briefcase, GraduationCap, Award, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { experiences, educationList, projects } from '../data';

export default function ResumeView() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0">
      <div className="text-center mb-10">
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto">
          Interactive digital ledger summarizing corporate internships, brand building, and embedded firmware experiments.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="font-serif text-[28px] md:text-[36px] font-semibold text-on-surface">Professional Resume</span>
        </div>
        <div className="section-divider mt-4" />
      </div>

      {/* Primary Actions Card */}
      <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full blur-2xl pointer-events-none" />
        <div>
          <h2 className="font-serif text-[22px] font-bold text-on-surface leading-tight flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Verified Resume Document
          </h2>
          <p className="font-sans text-[14px] text-on-surface-variant mt-1.5 max-w-lg leading-relaxed">
            Download or view the official, comprehensive PDF detailing academic transcripts, credentials, and full technology indexes.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto shrink-0 select-none">
          <a
            href="https://aryakuna14.github.io/Resume.pdf#page=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-wider border border-outline-variant/25 rounded-xl px-5 py-3.5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-on-surface font-semibold"
          >
            <ExternalLink className="h-4 w-4 text-primary" /> Preview Live
          </a>
          <a
            href="https://aryakuna14.github.io/Resume.pdf#page=1"
            target="_blank"
            rel="noopener noreferrer"
            download="Arya_Sharan_Resume.pdf"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-wider bg-primary border border-primary text-[#0a0d10] rounded-xl px-6 py-3.5 hover:bg-primary/90 transition-all duration-300 font-bold shadow-lg"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>
      </div>

      {/* Interactive CV Showcase Sheet */}
      <div className="glass-card rounded-3xl p-6 md:p-10 text-left border border-outline-variant/15 font-sans relative">
        <div className="absolute top-[180px] right-0 w-64 h-64 bg-primary/3 rounded-bl-full blur-[100px] pointer-events-none" />
        
        {/* CV Header */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-outline-variant/20 pb-8 gap-6">
          <div>
            <h1 className="font-serif text-[36px] md:text-[44px] text-primary italic font-normal tracking-tight leading-none">
              Arya Sharan
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant mt-2.5 font-medium">
              Student
            </p>
            <p className="font-sans text-[14px] text-on-surface-variant mt-3 max-w-xl leading-relaxed">
              4th-Semester Electrical and Electronics Engineering (EEE) student passionate about Semiconductors, VLSI, Machine Learning and Embedded Systems.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 font-mono text-xs text-on-surface-variant/90 border-l border-outline-variant/20 pl-0 md:pl-6">
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" /> aryasharan47@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary" /> +91 91106 48489
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Bangalore, India
            </span>
            <a href="https://github.com/Aryakuna14" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Globe className="h-3.5 w-3.5 text-primary" /> github.com/Aryakuna14
            </a>
          </div>
        </div>

        {/* CV Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
          
          {/* Left Column (8 cols): Experiences & Education */}
          <div className="md:col-span-8 flex flex-col gap-10">
            
            {/* Experience Section */}
            <div>
              <h2 className="font-serif text-[19px] md:text-[21px] text-primary font-semibold flex items-center gap-2.5 border-b border-outline-variant/20 pb-2 mb-6">
                <Briefcase className="h-5 w-5" /> Professional History
              </h2>

              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-6 border-l-2 border-primary/15">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5" />
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <div>
                        <h3 className="font-serif text-[18px] text-on-surface font-semibold leading-tight">
                          {exp.role}
                        </h3>
                        <p className="font-sans text-[14px] text-primary/95 mt-1">
                          {exp.company} • <span className="text-on-surface-variant/80 text-[13px]">{exp.location}</span>
                        </p>
                      </div>
                      <span className="font-mono text-[11px] text-on-surface-variant bg-surface-container/50 px-2 py-0.5 rounded border border-outline-variant/12 mb-2 md:mb-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="list-disc list-outside pl-4 mt-3 space-y-1.5 text-[13px] text-on-surface-variant leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="font-serif text-[19px] md:text-[21px] text-primary font-semibold flex items-center gap-2.5 border-b border-outline-variant/20 pb-2 mb-6">
                <GraduationCap className="h-5 w-5" /> Education Foundation
              </h2>

              <div className="space-y-6">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="border-b border-outline-variant/10 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-serif text-[16px] text-on-surface font-semibold leading-tight">
                        {edu.institution}
                      </h3>
                      {edu.grade && (
                        <span className="font-mono text-[11px] text-primary font-semibold block sm:inline">
                          {edu.grade}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-on-surface-variant font-medium mt-1">
                      {edu.degree} • <span className="italic">{edu.period}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {edu.focus.map((item, fIdx) => (
                        <span key={fIdx} className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">
                          {item}
                        </span>
                      ))}
                    </div>
                    <ul className="list-disc list-outside pl-4 mt-2.5 space-y-1 text-[12px] text-on-surface-variant/90 leading-relaxed">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Core Skills & Operations Achievements */}
          <div className="md:col-span-4 flex flex-col gap-10">
            
            {/* Hard Core Technical Skills */}
            <div className="bg-surface-container/50 border border-outline-variant/12 rounded-2xl p-5">
              <h2 className="font-serif text-[16px] text-primary font-bold uppercase tracking-wider border-b border-outline-variant/10 pb-2 mb-4">
                Technical Index
              </h2>
              
              <div className="space-y-3.5">
                <div>
                  <span className="font-mono text-[10px] text-on-surface-variant block uppercase mb-1">Hardware & Core Engineering</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Arduino</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">EV Technology</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Solar PV</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">PCB Design</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Raspberry Pi</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">ESP-32</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">STM-32</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Sensors</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-on-surface-variant block uppercase mb-1">Programming & Software</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">C / C++</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Python</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Data Structures</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">MATLAB</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">ML / SVM / CNN</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">OpenCV</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">LSTM</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">MediaPipe</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-on-surface-variant block uppercase mb-1">Business & Interpersonal</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Hosting & Anchoring</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Networking</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Digital Marketing</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">E-commerce & SEO</span>
                    <span className="text-[10px] font-mono bg-surface-container/40 border border-outline-variant/12 px-2 py-0.5 rounded-md text-on-surface-variant/80">Sponsorship Negotiation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership & Co-Curricular Section */}
            <div>
              <h2 className="font-serif text-[19px] md:text-[21px] text-primary font-semibold flex items-center gap-2 border-b border-outline-variant/20 pb-2 mb-4">
                <Award className="h-4.5 w-4.5" /> Key Initiatives & Logistics
              </h2>

              <ul className="space-y-4 font-sans text-[13px] text-on-surface-variant leading-relaxed">
                {projects.filter(p => p.category === 'non-technical').map((proj, idx) => (
                  <li key={proj.id || idx} className="relative pl-4 border-l-2 border-primary/15">
                    <span className="font-serif font-semibold text-on-surface block leading-tight">{proj.title}</span>
                    <span className="text-[12px] text-on-surface-variant leading-normal block mt-1">{proj.description}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
