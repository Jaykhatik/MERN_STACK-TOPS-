import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title floating">Experience Movies Like Never Before</h1>
        <p className="hero-subtitle">
          Book tickets instantly for the latest blockbusters and exclusive events.
        </p>
        <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
          Book Now
        </button>
      </motion.div>
    </section>
  );
};
