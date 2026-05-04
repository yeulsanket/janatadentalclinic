import React from 'react';
import './Credentials.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const milestones = [
  { year: '2008', title: 'BDS Degree', desc: 'Graduated with honors from Top Dental College.' },
  { year: '2011', title: 'MDS Prosthodontics', desc: 'Specialized in advanced smile restoration.' },
  { year: '2014', title: 'ITI Certification', desc: 'International Team for Implantology, Switzerland.' },
  { year: '2019', title: 'Fellowship', desc: 'Advanced aesthetics and digital dentistry.' }
];

export default function Credentials() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="credentials-section section-padding" id="credentials" ref={sectionRef}>
      <div className="container">
        <div className="credentials-header fade-up">
          <h2>Academic & Professional Journey</h2>
          <div className="mint-divider" style={{ margin: '20px auto' }}></div>
        </div>

        <div className="timeline fade-up">
          <div className="timeline-line"></div>
          <div className="timeline-items">
            {milestones.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="memberships fade-up">
          <p>Professional Memberships</p>
          <div className="membership-badges">
            <span className="badge">IDA</span>
            <span className="badge">ADA</span>
            <span className="badge">ITI</span>
            <span className="badge">ICOI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
