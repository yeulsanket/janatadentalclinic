import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import xrayImg from '../assets/1000373765.jpg';

const cases = [
  {
    id: 1,
    category: 'Veneers',
    tag: 'Porcelain Veneers + Whitening',
    duration: 'Completed in 3 sessions',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590625624736-fc057c742c38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    category: 'Aligners',
    tag: 'Invisible Digital Aligners',
    duration: 'Completed in 8 months',
    before: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590625574345-0d2dbbb4ce65?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    category: 'Implants',
    tag: 'Single Titanium Implant',
    duration: 'Completed in 2 sessions',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    category: 'Whitening',
    tag: 'Professional Laser Whitening',
    duration: 'Completed in 1 session',
    before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590625624736-fc057c742c38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    category: 'Diagnostics',
    tag: '3D Digital OPG X-Ray',
    duration: 'Instant High-Definition Result',
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
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="case-card gallery-card"
    >
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
        <span className="badge-before">Before</span>
        <span className="badge-after">After</span>
      </div>
      <div className="case-info">
        <span className="case-category">{item.category}</span>
        <h4>{item.tag}</h4>
        <p>{item.duration}</p>
      </div>
    </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gallery-header"
        >
          <span className="section-tag" style={{ color: 'var(--pg-light)', borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.1)' }}>Before & After</span>
          <h2>Clinical Transformations</h2>
          <div className="mint-divider" style={{ margin: '20px auto', backgroundColor: 'var(--pg-bright)' }}></div>
          <p className="gallery-subtitle">Drag the slider left and right to compare real patient smiles.</p>
        </motion.div>

        <div className="filter-bar">
          {filters.map(f => (
            <button 
              key={f} 
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {filter === f && (
                <motion.span
                  layoutId="activeFilterBg"
                  className="active-filter-bg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 2 }}>{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="gallery-grid">
          <AnimatePresence>
            {filteredCases.map(item => (
              <BeforeAfterSlider key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
