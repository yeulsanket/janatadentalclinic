import React from 'react';
import './Services.css';
import { Smile, Sparkles, Wind, Activity, Layers, Baby, Stethoscope, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: <Activity size={32} strokeWidth={1.5} />,
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking tooth replacements engineered for lifetime durability.'
  },
  {
    icon: <Smile size={32} strokeWidth={1.5} />,
    title: 'Smile Design',
    desc: 'Comprehensive aesthetic planning for a perfectly balanced, radiant smile.'
  },
  {
    icon: <Sparkles size={32} strokeWidth={1.5} />,
    title: 'Teeth Whitening',
    desc: 'Advanced professional whitening treatments for instant, brilliant results.'
  },
  {
    icon: <Wind size={32} strokeWidth={1.5} />,
    title: 'Invisible Aligners',
    desc: 'Discreet, comfortable orthodontic correction using clear aligner technology.'
  },
  {
    icon: <Activity size={32} strokeWidth={1.5} />,
    title: 'Root Canal',
    desc: 'Pain-free endodontic therapy to save and restore damaged teeth.'
  },
  {
    icon: <Layers size={32} strokeWidth={1.5} />,
    title: 'Veneers',
    desc: 'Ultra-thin porcelain laminates to correct imperfections instantly.'
  },
  {
    icon: <Baby size={32} strokeWidth={1.5} />,
    title: 'Pediatric Dentistry',
    desc: 'Gentle, preventive care tailored specifically for children.'
  },
  {
    icon: <Stethoscope size={32} strokeWidth={1.5} />,
    title: 'Full Mouth Rehab',
    desc: 'Complete restoration of oral function, health, and aesthetics.'
  }
];

export default function Services() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="services-section section-padding" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services-header fade-up">
          <h2>Clinical Excellence & Specialties</h2>
          <div className="mint-divider" style={{ margin: '20px auto' }}></div>
          <p className="services-subtitle">Advanced treatments tailored to your unique oral health needs.</p>
        </div>
        
        <div className="services-grid">
          {services.map((svc, idx) => (
            <div 
              key={idx} 
              className="service-card fade-up"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="service-icon">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <a href="#contact" className="service-link">
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
