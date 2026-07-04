import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* Top wave divider */}
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container footer-inner">

        {/* Logo + tagline */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-dot" aria-hidden="true">🦷</span>
            Dr. Rushikesh Sangle
          </div>
          <p className="footer-tagline">
            Crafting Confident Smiles. Built on Science.<br />
            Premium Dental Care · Dombivli, Maharashtra
          </p>
        </div>

        {/* Quick links */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#credentials">Awards</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Divider */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Bottom row */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dr. Rushikesh Sangle Dental Clinic. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

      </div>

      <style>{`
        /* ═══ FOOTER – White + Luxury Rose Pink Theme ═══ */

        .site-footer {
          background: linear-gradient(160deg, #701a3c 0%, #881d48 50%, #601230 100%);
          color: rgba(255,255,255,0.75);
          padding: 0 0 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow orb */
        .site-footer::before {
          content: '';
          position: absolute;
          top: -80px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(240,101,149,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Wave SVG at top */
        .footer-wave {
          color: #fff0f6; /* matches off-white above footer */
          line-height: 0;
          position: relative;
          z-index: 1;
        }
        .footer-wave svg {
          width: 100%; height: 60px; display: block;
        }

        .footer-inner {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: center;
          padding-top: 40px;
          position: relative;
          z-index: 1;
        }

        /* Brand */
        .footer-brand { display: flex; flex-direction: column; gap: 10px; align-items: center; }

        .footer-logo {
          font-family: var(--font-heading, 'Playfair Display', serif);
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: -0.01em;
        }
        .footer-logo-dot { font-size: 22px; }

        .footer-tagline {
          font-size: 14px;
          max-width: 400px;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
        }

        /* Nav links */
        .footer-nav {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-nav a {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          padding: 6px 16px;
          border-radius: 40px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
          text-decoration: none;
        }
        .footer-nav a:hover {
          background: rgba(240,101,149,0.18);
          border-color: rgba(240,101,149,0.45);
          color: #ffffff;
        }

        /* Badges */
        .footer-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 40px;
          padding: 6px 16px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          letter-spacing: 0.02em;
          transition: background 220ms ease, border-color 220ms ease;
        }
        .footer-badge:hover {
          background: rgba(240,101,149,0.15);
          border-color: rgba(240,101,149,0.4);
        }

        /* Divider */
        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent, rgba(240,101,149,0.4) 30%,
            rgba(240,101,149,0.6) 50%,
            rgba(240,101,149,0.4) 70%, transparent
          );
          box-shadow: 0 0 10px rgba(240,101,149,0.2);
        }

        /* Bottom row */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          flex-wrap: wrap;
          gap: 12px;
          padding: 0 5%;
        }
        .footer-legal {
          display: flex;
          gap: 20px;
        }
        .footer-legal a {
          color: rgba(240,101,149,0.9);
          font-weight: 500;
          text-decoration: none;
          transition: color 200ms ease;
          font-size: 13px;
        }
        .footer-legal a:hover { color: #ffffff; }

        /* Mobile */
        @media (max-width: 768px) {
          .site-footer { padding-bottom: 110px; } /* space for sticky CTA */
          .footer-logo { font-size: 22px; }
          .footer-tagline { font-size: 13px; }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            font-size: 12px;
            padding: 0 4%;
          }
          .footer-legal { gap: 16px; }
        }

        @media (max-width: 480px) {
          .footer-logo { font-size: 20px; }
          .footer-nav a { font-size: 12px; padding: 5px 12px; }
          .footer-badge { font-size: 11px; padding: 5px 12px; }
        }
      `}</style>
    </footer>
  );
}
