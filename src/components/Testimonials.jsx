import React from 'react';
import './Testimonials.css';
import { Star, StarHalf, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSlider } from '../hooks/useSlider';
import reviewImg from '../assets/REVIEW.webp';

const testimonials = [
  { name: 'Sneha Kulkarni', rating: 5.0, stars: 5, hasHalf: false, quote: "The most comfortable dental experience I've ever had. Dr. Rushikesh and the staff pay incredible attention to detail.", treatment: 'Smile Design' },
  { name: 'Rahul Pawar', rating: 4.5, stars: 4, hasHalf: true, quote: "Dr. Sangle's expertise gave me back my confidence. The dental implant procedure was completely painless and seamless.", treatment: 'Dental Implants' },
  { name: 'Sayali Gokhale', rating: 4.8, stars: 4, hasHalf: true, quote: "A state-of-the-art clinic in Maharashtra with a team that genuinely cares. Highly recommend their invisible aligner treatment.", treatment: 'Invisible Aligners' },
  { name: 'Amitabh Joshi', rating: 5.0, stars: 5, hasHalf: false, quote: "Swiss engineering meets true Indian hospitality. My veneers look 100% natural and elevated my smile tenfold.", treatment: 'Porcelain Veneers' },
  { name: 'Priya Deshpande', rating: 4.9, stars: 4, hasHalf: true, quote: "Laser teeth whitening brightened my smile by 8 shades in just 45 minutes without any sensitivity whatsoever.", treatment: 'Laser Whitening' },
  { name: 'Vikramaditya Shinde', rating: 5.0, stars: 5, hasHalf: false, quote: "Optical microscope root canal saved my tooth completely pain-free. Truly world-class dental specialization.", treatment: 'Microscope Root Canal' }
];

const renderStarRating = (rating, fullCount, hasHalf, size = 18) => (
  <div className="star-rating-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
    <div className="stars" style={{ display: 'flex', gap: '3px', filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))', margin: 0 }}>
      {[...Array(fullCount)].map((_, i) => (
        <Star key={i} size={size} fill="#f59e0b" color="#f59e0b" />
      ))}
      {hasHalf && <StarHalf size={size} fill="#f59e0b" color="#f59e0b" />}
    </div>
    <span style={{ 
      fontSize: size > 20 ? '14px' : '12px', 
      fontWeight: '700', 
      color: '#1e3a29',
      background: 'rgba(245, 158, 11, 0.18)',
      border: '1px solid rgba(245, 158, 11, 0.4)',
      padding: '2px 8px',
      borderRadius: '12px',
      display: 'inline-flex',
      alignItems: 'center'
    }}>
      {rating.toFixed(1)}
    </span>
  </div>
);

export default function Testimonials() {
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
    totalItems: testimonials.length,
    interval: 3000,
    autoPlay: true,
    gap: 24
  });

  return (
    <section className="testimonials-section section-padding" id="testimonials" ref={sectionRef}>
      <div className="container" style={{ '--items-to-show': itemsToShow }}>
        <div className="hero-testimonial fade-up">
          <div className="hero-testimonial-content">
            {renderStarRating(4.9, 4, true, 24)}
            <h3 className="hero-quote">"After years of avoiding the dentist, I finally found Dr. Sangle's practice where I feel completely at ease. The results speak for themselves."</h3>
            <div className="patient-info">
              <div className="patient-avatar">S</div>
              <div>
                <strong>Sagar Deshmukh</strong>
                <p>Full Mouth Rehab</p>
              </div>
            </div>
          </div>
          <div className="hero-testimonial-image">
            <img src={reviewImg} alt="Patient Review" />
          </div>
        </div>

        <div className="testimonials-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '48px 0 24px' }}>
          <div>
            <span className="section-tag">VERIFIED PATIENT REVIEWS</span>
            <h3 style={{ fontSize: '28px', color: 'var(--pg-dark)', marginTop: '8px' }}>Executive Patient Experiences</h3>
          </div>
          <div className="slider-controls">
            <button onClick={prevSlide} className="slider-arrow-btn" aria-label="Previous Review">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="slider-arrow-btn" aria-label="Next Review">
              <ChevronRight size={20} />
            </button>
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
          <div className="slider-track" style={{ transform: trackTransform }}>
            {testimonials.map((t, idx) => (
              <div className="testimonial-card service-slide" key={idx}>
                {renderStarRating(t.rating, t.stars, t.hasHalf, 18)}
                <p className="quote">"{t.quote}"</p>
                <div className="testimonial-footer">
                  <span className="patient-name">{t.name}</span>
                  <span className="treatment-tag">{t.treatment}</span>
                </div>
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
              aria-label={`Go to review slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
