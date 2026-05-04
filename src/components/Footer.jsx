import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A1C2E', color: '#aebacd', padding: '40px 5%', textAlign: 'center' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--pure-white)', fontWeight: '700' }}>
          Dr. Rushikesh Sangle
        </div>
        <p style={{ fontSize: '14px', maxWidth: '400px' }}>
          Crafting Confident Smiles. Built on Science.<br/>
          Premium Dental Care.
        </p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
          <a href="#" style={{ color: 'var(--gold-detail)' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--gold-detail)' }}>Terms of Service</a>
        </div>
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%', fontSize: '13px' }}>
          &copy; {new Date().getFullYear()} Dr. Rushikesh Sangle Dental Clinic. All rights reserved. <span style={{ color: '#25D366' }}>SSL Secure</span>
        </div>
      </div>
    </footer>
  );
}
