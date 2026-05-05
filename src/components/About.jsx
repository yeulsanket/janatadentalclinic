import React, { useState, useEffect } from 'react';
import './About.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import consultationImg from '../assets/1000373747.jpg';
import clinicInteriorImg from '../assets/1000373732.jpg';

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useScrollAnimation();

  useEffect(() => {
    if (ref.current && ref.current.classList.contains('visible')) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [end, duration, ref]);

  return <span ref={ref} className="counter-number fade-up">{count}{suffix}</span>;
};

export default function About() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="about-section section-padding" id="about" ref={sectionRef}>
      <div className="container about-container">
        <div className="about-image-col fade-up">
          <div className="about-image-wrapper">
            <img 
              src={consultationImg} 
              alt="Dr. Rushikesh in clinic" 
            />
            <div className="floating-credential-card">
              <div className="credential-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 21H8c-2.2 0-4-1.8-4-4V8.5C4 5.5 6.5 3 9.5 3c1.3 0 2.5.5 3.5 1.4C14 3.5 15.2 3 16.5 3 19.5 3 22 5.5 22 8.5V17c0 2.2-1.8 4-4 4h-2c-.6 0-1.2-.2-1.7-.5l-.8-.6c-.9-.7-2.1-.7-3 0l-.8.6c-.5.3-1.1.5-1.7.5Z"/>
                  <path d="M10 21v-4.5c0-1.1.9-2 2-2s2 .9 2 2V21"/>
                </svg>
              </div>
              <div>
                <strong>Dr. Rushikesh Sangle</strong>
                <p>14+ Years Excellence</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-content-col fade-up" style={{transitionDelay: '200ms'}}>
          <h2>A Philosophy of Care & Precision</h2>
          <div className="mint-divider"></div>
          
          <p>
            My approach to dentistry is built on a simple premise: every patient deserves world-class clinical excellence delivered with genuine compassion. For over 14 years, I have dedicated myself to mastering the art and science of prosthodontics and smile design.
          </p>
          <p>
            We believe in treating the person, not just the tooth. By combining state-of-the-art technology with an evidence-based clinical approach, we ensure treatments that are both minimally invasive and enduring.
          </p>
          <p>
            Whether it's a complex full-mouth rehabilitation or a simple cosmetic enhancement, my goal is to give you a smile that radiates confidence and health.
          </p>
          
          <div className="stats-row">
            <div className="stat-item">
              <Counter end={2400} suffix="+" />
              <span className="stat-label">Happy Patients</span>
            </div>
            <div className="stat-item">
              <Counter end={98} suffix="%" />
              <span className="stat-label">Satisfaction</span>
            </div>
            <div className="stat-item">
              <Counter end={14} />
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-item">
              <Counter end={3} />
              <span className="stat-label">Awards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* New Facility Highlight Section */}
        <div className="facility-highlight fade-up">
          <div className="facility-content">
             <div className="facility-text">
               <h3>Our State-of-the-Art Facility</h3>
               <p>We take pride in maintaining a clinic that meets the highest international standards of hygiene and technology. Our treatment rooms are designed for both patient comfort and clinical precision.</p>
             </div>
             <div className="facility-image">
               <img src={clinicInteriorImg} alt="Janata Dental Clinic Interior" className="rounded-lg shadow-xl" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
