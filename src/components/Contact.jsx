import React, { useRef, useState } from 'react';
import './Contact.css';
import { Phone, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

// ============================================================
// EmailJS Configuration — REPLACE these with your own keys!
// Steps to get your keys:
//   1. Go to https://www.emailjs.com and create a FREE account
//   2. Add an Email Service (Gmail recommended) → copy SERVICE_ID
//   3. Create an Email Template → copy TEMPLATE_ID
//   4. Go to Account → copy your PUBLIC_KEY
// ============================================================
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const sectionRef = useScrollAnimation();
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      formRef.current.reset();
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="contact-section section-padding" id="contact" ref={sectionRef}>
      <div className="container contact-container">
        <div className="contact-info fade-up">
          <h2>Ready for a healthier smile?</h2>
          <p className="contact-subtitle">Schedule your consultation today. We prioritize your comfort and well-being at every step.</p>
          
          <div className="contact-ctas">
            <a href="https://wa.me/919834188787" className="btn btn-whatsapp" target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
            <a href="tel:+919834188787" className="btn btn-ghost light">
              <Phone size={20} /> +91 98341 88787
            </a>
          </div>

          <div className="clinic-hours">
            <h4>Clinic Hours</h4>
            <div className="hours-grid">
              <div>Monday - Sunday</div>
              <div>10:00 AM – 10:00 PM</div>
              <div>Open</div>
              <div>All 7 Days</div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper fade-up" style={{ transitionDelay: '200ms' }}>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="user_name" placeholder="Your full name" required />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="user_phone" placeholder="+91 98765 43210" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="user_email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date</label>
                <input type="date" id="date" name="preferred_date" />
              </div>
              <div className="form-group">
                <label htmlFor="treatment">Treatment of Interest</label>
                <select id="treatment" name="treatment">
                  <option value="">Select a treatment...</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Smile Design">Smile Design</option>
                  <option value="Invisible Aligners">Invisible Aligners</option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Root Canal">Root Canal</option>
                  <option value="Veneers">Veneers</option>
                  <option value="Other / General Checkup">Other / General Checkup</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea id="message" name="message" rows="4" placeholder="How can we help you?"></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Request Appointment'}
            </button>

            {status === 'success' && (
              <div className="form-status success">
                <CheckCircle size={18} /> Appointment request sent! We'll confirm within 2 hours.
              </div>
            )}
            {status === 'error' && (
              <div className="form-status error">
                <AlertCircle size={18} /> Something went wrong. Please call us directly.
              </div>
            )}

            <p className="form-assurance">No spam. We'll confirm your slot within 2 hours.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
