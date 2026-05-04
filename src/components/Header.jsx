import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <div className="logo">Janata Dental Clinic</div>
          
          <nav className="desktop-nav">
            <a href="#about">About</a>
            <a href="#services">Treatments</a>
            <a href="#gallery">Before & After</a>
            <a href="#testimonials">Reviews</a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '8px 20px' }}>Book Consult</a>
          </nav>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile slide-in panel */}
        <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Treatments</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Before & After</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
        </div>
      </header>

      {/* Mobile Sticky CTA */}
      <div className="mobile-sticky-cta">
        <a href="tel:+1234567890" className="sticky-btn ghost">
          <Phone size={18} /> Call
        </a>
        <a href="#contact" className="sticky-btn primary">
          <Calendar size={18} /> Book Now
        </a>
      </div>
    </>
  );
}
