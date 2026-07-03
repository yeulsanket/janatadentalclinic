import React from 'react';
import './Clinic.css';
import { Camera, Scan, Monitor, Search, FileText, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import imgNo3 from '../assets/imeageno3.webp';
import imgNo2 from '../assets/imeageno2.webp';
import imgNo1 from '../assets/imeageno1.jpg';

const techFeatures = [
  { icon: <Camera size={24} />, name: 'Digital X-Ray', desc: 'Minimal radiation, instant high-res imaging.' },
  { icon: <Scan size={24} />, name: '3D CBCT Scan', desc: 'Precision planning for implants and surgeries.' },
  { icon: <Monitor size={24} />, name: 'CAD/CAM Cerec', desc: 'Same-day crowns and digital impressions.' },
  { icon: <Search size={24} />, name: 'Intraoral Camera', desc: 'See what we see for complete transparency.' },
  { icon: <FileText size={24} />, name: 'Paperless Records', desc: 'Secure, eco-friendly digital patient files.' },
];

export default function Clinic() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="clinic-section section-padding" id="clinic" ref={sectionRef}>
      <div className="container clinic-container">
        <div className="clinic-gallery fade-up">
          <div className="gallery-main">
            <img src={imgNo3} alt="Clinic Reception & Facility" />
          </div>
          <div className="gallery-sub">
            <img src={imgNo2} alt="Treatment Room" />
            <img src={imgNo1} alt="Advanced Equipment" />
          </div>
        </div>

        <div className="clinic-info fade-up" style={{ transitionDelay: '200ms' }}>
          <h2>State of the Art Technology</h2>
          <div className="mint-divider"></div>
          <p className="clinic-desc">We invest in the latest dental technology to ensure your treatments are faster, safer, and more precise.</p>
          
          <div className="tech-list">
            {techFeatures.map((tech, idx) => (
              <div className="tech-item" key={idx}>
                <div className="tech-icon">{tech.icon}</div>
                <div className="tech-details">
                  <h4>{tech.name}</h4>
                  <p>{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="clinic-location">
            <div className="clinic-address-box">
              <p className="clinic-address-label">📍 Address</p>
              <p className="clinic-address-text">Chandresh Villa, C-2, Lodha Casa Rio Gold Rd,<br/>opposite Sai Baba Mandir, near Xperia Mall,<br/>Dombivli, Kalyan, Maharashtra 421204</p>
            </div>
            <div className="map-embed">
              <iframe
                title="Janata Dental Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9386!2d73.0751248!3d19.1628251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf14a5317971%3A0xd63784a17a441c68!2sJANATA%20DENTAL%20CLINIC!5e0!3m2!1sen!2sin!4v1714805000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="accessibility-note"><CheckCircle2 size={16} /> Near Xperia Mall · Free parking available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
