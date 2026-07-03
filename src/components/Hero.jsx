import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import './Hero.css';
import doctorImg from '../assets/doctor.jpg';

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08 + 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

export default function Hero() {
  const wordsLine1 = ["Bespoke", "Smile", "Architecture."];
  const wordsLine2 = ["Engineered", "with", "Precision."];

  return (
    <section className="hero-section" id="hero">
      {/* Background animated SVG */}
      <div className="hero-bg-pattern">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="animated-tooth">
          <path d="M10 21H8c-2.2 0-4-1.8-4-4V8.5C4 5.5 6.5 3 9.5 3c1.3 0 2.5.5 3.5 1.4C14 3.5 15.2 3 16.5 3 19.5 3 22 5.5 22 8.5V17c0 2.2-1.8 4-4 4h-2c-.6 0-1.2-.2-1.7-.5l-.8-.6c-.9-.7-2.1-.7-3 0l-.8.6c-.5.3-1.1.5-1.7.5Z"/>
          <path d="M10 21v-4.5c0-1.1.9-2 2-2s2 .9 2 2V21"/>
        </svg>
      </div>
      
      <div className="container hero-container">
        {/* Left Column - 3D Tilt Image */}
        <div className="hero-image-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02 }}
            className="hero-image-wrapper"
          >
            <img 
              src={doctorImg} 
              alt="Dr. Rushikesh Sangle" 
              className="hero-portrait"
            />
          </motion.div>

          {/* Floating glass badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="floating-hero-badge left-badge"
          >
            <Award size={18} className="text-gold" style={{ color: '#f0c040' }} />
            <span>Excellence in Prosthodontics</span>
          </motion.div>
        </div>
        
        {/* Right Column - Content */}
        <div className="hero-content-col">
          {/* Live Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="live-status-pill"
          >
            <span className="pulse-dot"></span>
            <span>Premier Dental Suite · Dombivli Kalyan</span>
          </motion.div>

          {/* Staggered Title */}
          <h1 className="hero-title">
            <span style={{ display: 'inline' }}>
              {wordsLine1.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{ display: 'inline-block', marginRight: '0.28em' }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br />
            <span style={{ display: 'inline' }}>
              {wordsLine2.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i + wordsLine1.length}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{ display: 'inline-block', marginRight: '0.28em', color: 'var(--pg-light)' }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="hero-credentials"
          >
            B.D.S. · Chief Prosthodontic & Implant Specialist
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hero-trust-row"
          >
            <span className="hero-trust-badge">
              <ShieldCheck size={16} /> 100% Pain-Free Digital Care
            </span>
            <span className="hero-trust-badge">
              <Sparkles size={16} /> Swiss-Grade Implantology
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="hero-ctas"
          >
            <a href="#contact" className="btn btn-primary hero-btn">
              Book a Consultation <ArrowUpRight size={18} />
            </a>
            <a href="#services" className="btn btn-ghost hero-btn">
              Explore Treatments
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
