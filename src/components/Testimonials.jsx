import React from 'react';
import './Testimonials.css';
import { Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  { name: 'Sarah M.', rating: 5, quote: "The most comfortable dental experience I've ever had. The attention to detail is truly exceptional.", treatment: 'Smile Design' },
  { name: 'Raj K.', rating: 5, quote: "Dr. Janata's expertise gave me back my confidence. The implant procedure was seamless.", treatment: 'Dental Implants' },
  { name: 'Elena V.', rating: 5, quote: "A state-of-the-art clinic with a team that actually cares. Highly recommend the aligner treatment.", treatment: 'Invisible Aligners' }
];

export default function Testimonials() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="testimonials-section section-padding" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="hero-testimonial fade-up">
          <div className="hero-testimonial-content">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="var(--gold-detail)" color="var(--gold-detail)" />)}
            </div>
            <h3 className="hero-quote">"After years of avoiding the dentist, I finally found a practice where I feel completely at ease. The results speak for themselves."</h3>
            <div className="patient-info">
              <div className="patient-avatar">M</div>
              <div>
                <strong>Michael T.</strong>
                <p>Full Mouth Rehab</p>
              </div>
            </div>
          </div>
          <div className="hero-testimonial-image">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Happy Patient" />
          </div>
        </div>

        <div className="testimonials-grid fade-up" style={{ transitionDelay: '200ms' }}>
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="stars" style={{ marginBottom: '15px' }}>
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="var(--gold-detail)" color="var(--gold-detail)" />)}
              </div>
              <p className="quote">"{t.quote}"</p>
              <div className="testimonial-footer">
                <span className="patient-name">{t.name}</span>
                <span className="treatment-tag">{t.treatment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
