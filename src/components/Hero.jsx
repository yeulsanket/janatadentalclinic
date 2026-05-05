import React from 'react';
import './Hero.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import doctorImg from '../assets/doctor.jpg';

export default function Hero() {
  const contentRef = useScrollAnimation();

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-pattern">
        {/* Subtle SVG Tooth Pattern */}
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="animated-tooth">
          <path d="M10 21H8c-2.2 0-4-1.8-4-4V8.5C4 5.5 6.5 3 9.5 3c1.3 0 2.5.5 3.5 1.4C14 3.5 15.2 3 16.5 3 19.5 3 22 5.5 22 8.5V17c0 2.2-1.8 4-4 4h-2c-.6 0-1.2-.2-1.7-.5l-.8-.6c-.9-.7-2.1-.7-3 0l-.8.6c-.5.3-1.1.5-1.7.5Z"/>
          <path d="M10 21v-4.5c0-1.1.9-2 2-2s2 .9 2 2V21"/>
        </svg>
      </div>
      
      <div className="container hero-container">
        <div className="hero-image-col">
          <div className="hero-image-wrapper fade-up visible">
            <img 
              src={doctorImg} 
              alt="Dr. Rushikesh Sangle" 
              className="hero-portrait"
            />
          </div>
        </div>
        
        <div className="hero-content-col fade-up" ref={contentRef}>
          <h1>Crafting Confident Smiles.<br/>Built on Science.</h1>
          <p className="hero-credentials">B.D.S. · Implantologist</p>
          
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">Book a Consultation</a>
            <a href="#services" className="btn btn-ghost">View Treatments</a>
          </div>
        </div>
      </div>
    </section>
  );
}
