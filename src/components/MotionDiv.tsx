'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
}

export function MotionDiv({ children, className }: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -10,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
}
