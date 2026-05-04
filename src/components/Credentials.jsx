import React, { useEffect, useRef, useState } from 'react';
import './Credentials.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const milestones = [
  {
    year: '2008',
    title: 'BDS Degree',
    desc: 'Graduated with distinction from Government Dental College.',
    icon: '🎓',
  },
  {
    year: '2011',
    title: 'MDS Prosthodontics',
    desc: 'Specialized in advanced smile restoration & crown work.',
    icon: '🦷',
  },
  {
    year: '2014',
    title: 'ITI Certification',
    desc: 'International Team for Implantology, Switzerland.',
    icon: '🌍',
  },
  {
    year: '2019',
    title: 'Digital Dentistry Fellowship',
    desc: 'Advanced aesthetics and CAD/CAM digital workflow.',
    icon: '💡',
  },
];

const awards = [
  {
    icon: '🏆',
    title: 'Best Implantologist',
    body: 'Maharashtra Dental Council recognized Dr. Janata for extraordinary success in implant procedures.',
    org: 'Maharashtra Dental Council',
    year: '2022',
    color: '#f0c060',
  },
  {
    icon: '⭐',
    title: 'Excellence in Dentistry',
    body: 'Awarded for pioneering minimally-invasive techniques and patient satisfaction scores.',
    org: 'Indian Dental Association',
    year: '2020',
    color: '#a8dfd0',
  },
  {
    icon: '🎖️',
    title: 'Top Clinical Educator',
    body: 'Recognized for training 200+ dental graduates in implantology and prosthetics.',
    org: 'National Dental Congress',
    year: '2019',
    color: '#c9b8f0',
  },
  {
    icon: '💎',
    title: 'Patient Choice Award',
    body: 'Voted #1 trusted dentist in Kolhapur by over 5,000 verified patient reviews.',
    org: 'HealthVault Platform',
    year: '2023',
    color: '#f0a0c0',
  },
  {
    icon: '🔬',
    title: 'Research Innovation',
    body: 'Published 8 peer-reviewed papers on digital smile design and implant biomechanics.',
    org: 'Journal of Prosthodontics',
    year: '2021',
    color: '#80c8f0',
  },
  {
    icon: '🌟',
    title: 'Lifetime Achievement',
    body: 'Honoured for 15+ years of free dental camps serving rural Maharashtra communities.',
    org: 'IDA Kolhapur Chapter',
    year: '2023',
    color: '#f0d080',
  },
];

const memberships = [
  { abbr: 'IDA', full: 'Indian Dental Association' },
  { abbr: 'ADA', full: 'American Dental Association' },
  { abbr: 'ITI', full: 'Int\'l Team for Implantology' },
  { abbr: 'ICOI', full: 'Int\'l Congress of Oral Implantologists' },
  { abbr: 'ISOI', full: 'Indian Society of Oral Implantologists' },
];

/* ── Counter hook ── */
function useCounter(target, duration = 1800, trigger) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);
  return value;
}

export default function Credentials() {
  const sectionRef = useScrollAnimation();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Trigger counters when stats row enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const years    = useCounter(15, 1600, statsVisible);
  const patients = useCounter(8000, 1800, statsVisible);
  const implants = useCounter(3200, 1700, statsVisible);
  const awards_n = useCounter(18, 1400, statsVisible);

  return (
    <section className="cred-section section-padding" id="credentials" ref={sectionRef}>

      {/* ── Ambient particle orbs ── */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="container">

        {/* ══ HEADER ══ */}
        <div className="cred-header fade-up">
          <span className="cred-eyebrow">Recognition &amp; Credentials</span>
          <h2>Awards &amp; Achievements</h2>
          <div className="cred-divider" />
          <p className="cred-subtitle">
            Two decades of clinical excellence, research, and compassionate care —
            recognised by national and international institutions.
          </p>
        </div>

        {/* ══ LIVE STATS ROW ══ */}
        <div className="stats-strip fade-up" ref={statsRef}>
          {[
            { val: years,    suffix: '+', label: 'Years Experience' },
            { val: patients, suffix: '+', label: 'Happy Patients'   },
            { val: implants, suffix: '+', label: 'Implants Placed'  },
            { val: awards_n, suffix: '',  label: 'Awards Won'       },
          ].map((s, i) => (
            <div className="stat-pill" key={i}>
              <span className="stat-number">{s.val}{s.suffix}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ══ FEATURED AWARD HERO ══ */}
        <div className="featured-award fade-up">
          <div className="featured-glow" aria-hidden="true" />
          <div className="featured-badge">⭐ Featured Award</div>
          <div className="featured-trophy">🏆</div>
          <h3 className="featured-title">Lifetime Achievement Award</h3>
          <p className="featured-body">
            Presented by the Indian Dental Association for unparalleled contributions to
            dental science, community service, and shaping the next generation of clinicians
            across Maharashtra over 15+ years.
          </p>
          <div className="featured-meta">
            <span className="featured-org">Indian Dental Association</span>
            <span className="featured-year">2023</span>
          </div>
          <div className="featured-ribbon" aria-hidden="true">AWARD OF EXCELLENCE</div>
        </div>

        {/* ══ AWARDS GRID ══ */}
        <div className="awards-grid fade-up">
          {awards.map((a, i) => (
            <div className="award-card" key={i} style={{ '--accent': a.color }}>
              <div className="award-card-glow" aria-hidden="true" />
              <div className="award-icon-wrap">
                <span className="award-emoji">{a.icon}</span>
              </div>
              <div className="award-card-body">
                <div className="award-year-tag">{a.year}</div>
                <h4 className="award-name">{a.title}</h4>
                <p className="award-desc">{a.body}</p>
                <div className="award-org">
                  <span className="award-org-dot" />
                  {a.org}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ TIMELINE ══ */}
        <div className="timeline-section fade-up">
          <h3 className="timeline-heading">Academic Journey</h3>
          <div className="timeline">
            <div className="tl-spine" aria-hidden="true" />
            <div className="tl-items">
              {milestones.map((m, i) => (
                <div className={`tl-item ${i % 2 === 0 ? 'tl-top' : 'tl-bottom'}`} key={i}>
                  <div className="tl-dot">
                    <span className="tl-dot-inner" />
                  </div>
                  <div className="tl-card">
                    <span className="tl-icon">{m.icon}</span>
                    <div className="tl-year">{m.year}</div>
                    <h4 className="tl-title">{m.title}</h4>
                    <p className="tl-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MEMBERSHIPS ══ */}
        <div className="memberships fade-up">
          <p className="memberships-label">Professional Memberships</p>
          <div className="membership-row">
            {memberships.map((m, i) => (
              <div className="member-pill" key={i}>
                <span className="member-abbr">{m.abbr}</span>
                <span className="member-full">{m.full}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
