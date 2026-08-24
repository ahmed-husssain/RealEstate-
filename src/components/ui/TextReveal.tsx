'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
}

export function TextReveal({
  text,
  className,
  wordClassName,
  tag = 'h1',
  delay = 0,
}: TextRevealProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: import('framer-motion').Variants = {
    hidden: {
      y: '115%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const Tag = tag;

  return (
    <Tag className={cn('overflow-hidden', className)}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.25em]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 -mb-1">
            <motion.span
              className={cn('inline-block', wordClassName)}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
