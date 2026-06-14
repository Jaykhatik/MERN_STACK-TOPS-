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
        <h1 className="hero-title floating">Create Beautiful Posters</h1>
        <p className="hero-subtitle">
          Design anything in minutes. Premium templates, powerful tools, and stunning results.
        </p>
        <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
          Start Designing
        </button>
      </motion.div>
    </section>
  );
};
