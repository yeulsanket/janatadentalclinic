import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Award } from 'lucide-react';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING DIGITAL CLINIC SUITE...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for authentic loading feel
        const inc = Math.floor(Math.random() * 6) + 2;
        const next = Math.min(prev + inc, 100);

        if (next < 30) {
          setStatusText('CALIBRATING 3D DIAGNOSTIC IMAGING...');
        } else if (next < 65) {
          setStatusText('PREPARING PROSTHODONTIC & SMILE LAB...');
        } else if (next < 95) {
          setStatusText('SYNCHRONIZING PATIENT CARE PROTOCOLS...');
        } else {
          setStatusText('WELCOME TO EXCELLENCE.');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="preloader-overlay"
        >
          <div className="preloader-bg-glow" />

          {/* Top Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="preloader-top"
          >
            <div className="preloader-dot" />
            <span>Janata Dental Suite v4.0 · Maharashtra</span>
          </motion.div>

          {/* Center Content */}
          <div className="preloader-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="preloader-emblem"
            >
              <Sparkles size={40} />
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="preloader-title"
            >
              Dr. Rushikesh Sangle
            </motion.h1>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="preloader-subtitle"
            >
              World-Class Prosthodontics & Smile Design
            </motion.div>

            <div className="preloader-counter">
              {progress}<span>%</span>
            </div>

            <div className="preloader-status">
              {statusText}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="preloader-bottom"
          >
            <div className="preloader-bar-track">
              <div 
                className="preloader-bar-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="preloader-footer-text">
              <span>EST. DOMBIVLI KALYAN</span>
              <span>BESPOKE DENTAL EXCELLENCE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
