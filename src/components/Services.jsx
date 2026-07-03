import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Sparkles, Wind, Activity, Layers, Baby, Stethoscope, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './Services.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSlider } from '../hooks/useSlider';

const services = [
  {
    icon: <Activity size={32} strokeWidth={1.5} />,
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking titanium tooth replacements engineered for lifetime durability and natural function.'
  },
  {
    icon: <Smile size={32} strokeWidth={1.5} />,
    title: 'Digital Smile Design',
    desc: 'Comprehensive AI & 3D aesthetic planning for a perfectly balanced, custom-tailored radiant smile.'
  },
  {
    icon: <Sparkles size={32} strokeWidth={1.5} />,
    title: 'Laser Teeth Whitening',
    desc: 'Advanced in-office laser whitening treatments delivering up to 8 shades whiter in just one session.'
  },
  {
    icon: <Wind size={32} strokeWidth={1.5} />,
    title: 'Invisible Aligners',
    desc: 'Discreet, comfortable digital orthodontic correction using high-precision clear aligner technology.'
  },
  {
    icon: <Activity size={32} strokeWidth={1.5} />,
    title: 'Microscope Root Canal',
    desc: 'Pain-free endodontic therapy utilizing optical magnification to precisely clean and preserve your natural tooth.'
  },
  {
    icon: <Layers size={32} strokeWidth={1.5} />,
    title: 'Porcelain Veneers',
    desc: 'Ultra-thin custom porcelain laminates designed to correct gaps, chips, and discoloration instantly.'
  },
  {
    icon: <Baby size={32} strokeWidth={1.5} />,
    title: 'Pediatric Dentistry',
    desc: 'Gentle, anxiety-free preventive care and habit counseling tailored specifically for young children.'
  },
  {
    icon: <Stethoscope size={32} strokeWidth={1.5} />,
    title: 'Full Mouth Rehab',
    desc: 'Complete multidisciplinary restoration of oral function, bite physiology, and supreme facial aesthetics.'
  }
];

export default function Services() {
  const sectionRef = useScrollAnimation();
  const {
    currentIndex,
    itemsToShow,
    maxIndex,
    progress,
    isAutoPlay,
    isHovered,
    setIsHovered,
    prevSlide,
    nextSlide,
    goToSlide,
    toggleAutoPlay,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    trackTransform
  } = useSlider({
    totalItems: services.length,
    interval: 2500,
    autoPlay: true,
    gap: 24
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="services-section section-padding" id="services" ref={sectionRef}>
      <div className="container" style={{ '--items-to-show': itemsToShow }}>
        <div className="services-top-layout">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="services-header"
          >
            <span className="section-tag">BESPOKE CLINICAL SUITE</span>
            <h2>World-Class Dental Specializations</h2>
            <div className="mint-divider"></div>
            <p className="services-subtitle">Where Swiss engineering precision meets bespoke dental artistry.</p>
          </motion.div>

          <div className="slider-controls-container">
            <div className="slider-controls">
              <button
                onClick={prevSlide}
                className="slider-arrow-btn"
                aria-label="Previous Specialization"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextSlide}
                className="slider-arrow-btn"
                aria-label="Next Specialization"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          className="slider-viewport"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="slider-track"
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% + 24px) / var(--items-to-show)))`
            }}
          >
            {services.map((svc, idx) => (
              <div 
                key={idx}
                onMouseMove={handleMouseMove}
                className="service-card spotlight-card service-slide"
              >
                <div className="service-icon-wrapper">
                  <div className="service-icon">{svc.icon}</div>
                </div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
                <a href="#contact" className="service-link">
                  <span>Book Consultation</span>
                  <ArrowRight size={16} className="arrow-icon" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-pagination">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToSlide(dotIdx)}
              className={`pagination-dot ${currentIndex === dotIdx ? 'active' : ''}`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
