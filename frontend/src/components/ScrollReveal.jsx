import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal Component
 * Wraps elements and reveals them with a smooth animation as they scroll into view.
 */
export const ScrollReveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
  amount = 0.1,
  once = true
}) => {
  // Pre-configured premium animations
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 35 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-down': {
      hidden: { opacity: 0, y: -35 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-left': {
      hidden: { opacity: 0, x: 35 },
      visible: { opacity: 1, x: 0 }
    },
    'fade-right': {
      hidden: { opacity: 0, x: -35 },
      visible: { opacity: 1, x: 0 }
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  };

  // Premium Out-Quart cubic-bezier easing curve for visual excellence
  const premiumEasing = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants[variant] || variants['fade-up']}
      transition={{
        duration,
        delay,
        ease: premiumEasing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer Component
 * Provides standard staggered scroll entry for lists, grids, or grouped elements.
 * Best paired with children wrapped in <ScrollReveal /> or motion variants.
 */
export const StaggerContainer = ({
  children,
  delayChildren = 0,
  staggerChildren = 0.1,
  className = '',
  amount = 0.05,
  once = true
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
