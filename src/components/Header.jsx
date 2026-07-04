import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`header ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="container header-container">
          <a href="#hero" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', color: scrolled ? '#a62657' : '#ffffff', transition: 'color 300ms ease' }}>
              <Sparkles size={24} />
            </span>
            <span className="brand-logo-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.4px', color: scrolled ? '#881d48' : '#ffffff', transition: 'color 300ms ease' }}>JANATA DENTAL</strong>
              <small style={{ fontSize: '10px', fontWeight: 700, color: scrolled ? '#a62657' : '#fcc2d7', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color 300ms ease' }}>Dr. Rushikesh Sangle</small>
            </span>
          </a>
          
          <nav className="desktop-nav">
            <a href="#about">About</a>
            <a href="#services">Treatments</a>
            <a href="#testimonials">Reviews</a>
            <a href="#contact" className={`btn nav-cta ${scrolled ? 'scrolled-cta' : 'top-cta'}`}>
              Book Consult
            </a>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile nav overlay */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile slide-in panel */}
      <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Treatments</a>
        <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
        <a href="#contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)} style={{ marginTop: '12px' }}>
          Book Consultation
        </a>
      </div>

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
