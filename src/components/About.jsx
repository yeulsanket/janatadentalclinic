import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import './About.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import consultationImg from '../assets/1000373747.jpg';
import clinicInteriorImg from '../assets/1000373732.jpg';

export default function About() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="about-section section-padding" id="about" ref={sectionRef}>
      <div className="container about-container">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="about-image-col"
        >
          <div className="about-image-wrapper">
            <img 
              src={consultationImg} 
              alt="Dr. Rushikesh in clinic consultation" 
            />
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="floating-credential-card"
            >
              <div className="credential-icon">
                <Award size={26} />
              </div>
              <div>
                <strong>Dr. Rushikesh Sangle</strong>
                <p>Chief Dental Specialist</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="about-content-col"
        >
          <span className="section-tag">THE BRAND PHILOSOPHY</span>
          <h2>Uncompromising Mastery & Bespoke Care</h2>
          <div className="mint-divider"></div>
          
          <p>
            My approach to dentistry is built on a simple premise: every patient deserves world-class clinical excellence delivered with genuine compassion. I have dedicated myself to mastering the art and science of prosthodontics and smile design.
          </p>
          <p>
            We believe in treating the person, not just the tooth. By combining state-of-the-art diagnostic technology with an evidence-based clinical approach, we ensure treatments that are minimally invasive, completely painless, and enduring.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="facility-highlight"
        >
          <div className="facility-content">
             <div className="facility-text">
               <span className="section-tag">Hygiene & Safety</span>
               <h3>Our State-of-the-Art Facility</h3>
               <p>We take pride in maintaining a clinic that exceeds international standards of sterilization and digital technology. Equipped with 3D intraoral scanners, digital radiography, and ergonomic treatment units, our space is engineered for supreme patient comfort.</p>
             </div>
             <motion.div
               whileHover={{ scale: 1.02 }}
               className="facility-image"
             >
               <img src={clinicInteriorImg} alt="Janata Dental Clinic Interior" className="rounded-lg shadow-xl" />
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
