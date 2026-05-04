import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          Dr. Rushikesh Sangle
        </div>
        <p className="footer-tagline">
          Crafting Confident Smiles. Built on Science.<br/>
          Premium Dental Care · Dombivli, Maharashtra
        </p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Dr. Rushikesh Sangle Dental Clinic. All rights reserved. <span className="ssl-badge">SSL Secure</span>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #0A1C2E;
          color: #aebacd;
          padding: 50px 5% 40px;
          text-align: center;
        }
        .footer-inner {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: center;
        }
        .footer-logo {
          font-family: var(--font-heading);
          font-size: 24px;
          color: var(--pure-white);
          font-weight: 700;
        }
        .footer-tagline {
          font-size: 14px;
          max-width: 400px;
          line-height: 1.6;
        }
        .footer-links {
          display: flex;
          gap: 25px;
          font-size: 13px;
        }
        .footer-links a {
          color: var(--gold-detail);
        }
        .footer-bottom {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          width: 100%;
          font-size: 13px;
          line-height: 1.6;
        }
        .ssl-badge {
          color: #25D366;
        }
        
        @media (max-width: 768px) {
          .site-footer {
            padding: 40px 5% 100px; /* extra bottom for sticky CTA */
          }
          .footer-logo {
            font-size: 20px;
          }
          .footer-tagline {
            font-size: 13px;
          }
          .footer-bottom {
            font-size: 12px;
          }
        }
      `}</style>
    </footer>
  );
}
