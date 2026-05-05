import React, { useState, useRef } from 'react';
import './Gallery.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import xrayImg from '../assets/1000373765.jpg';

const cases = [
  {
    id: 1,
    category: 'Veneers',
    tag: 'Veneers + Whitening',
    duration: 'Completed in 3 sessions',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590625624736-fc057c742c38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    category: 'Aligners',
    tag: 'Invisible Aligners',
    duration: 'Completed in 8 months',
    before: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590625574345-0d2dbbb4ce65?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    category: 'Implants',
    tag: 'Single Implant',
    duration: 'Completed in 2 sessions',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    category: 'Whitening',
    tag: 'Professional Whitening',
    duration: 'Completed in 1 session',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590625624736-fc057c742c38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    category: 'Diagnostics',
    tag: 'Digital OPG X-Ray',
    duration: 'Instant Diagnostic Result',
    before: xrayImg,
    after: xrayImg
  }
];

const BeforeAfterSlider = ({ item }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = event.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  };

  return (
    <div className="case-card fade-up">
      <div 
        className="slider-container" 
        ref={containerRef}
        onMouseMove={handleMove}
        onTouchMove={handleTouchMove}
      >
        <img src={item.after} alt="After" className="slider-img after-img" />
        <div className="slider-clip" style={{ width: `${sliderPos}%` }}>
          <img src={item.before} alt="Before" className="slider-img before-img" />
        </div>
        <div className="slider-divider" style={{ left: `${sliderPos}%` }}>
          <div className="slider-handle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="case-info">
        <h4>{item.tag}</h4>
        <p>{item.duration}</p>
      </div>
    </div>
  );
};

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const sectionRef = useScrollAnimation();

  const filters = ['All', 'Implants', 'Veneers', 'Aligners', 'Whitening', 'Diagnostics'];
  const filteredCases = filter === 'All' ? cases : cases.filter(c => c.category === filter);

  return (
    <section className="gallery-section section-padding" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header fade-up">
          <h2>Transformations</h2>
          <div className="mint-divider" style={{ margin: '20px auto', backgroundColor: 'var(--gold-detail)' }}></div>
          <p className="gallery-subtitle">Real results from our clinical practice.</p>
        </div>

        <div className="filter-bar fade-up">
          {filters.map(f => (
            <button 
              key={f} 
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredCases.map(item => (
            <BeforeAfterSlider key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
