import React from 'react';
import { Cat, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-dusty-rose">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-4"
      >
        <Cat size={48} strokeWidth={1.5} />
      </motion.div>
      <p className="font-serif text-lg text-charcoal/60 animate-pulse">Waking up the cats...</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-terracotta">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <Cat size={56} strokeWidth={1.5} />
      </motion.div>
      <p className="font-serif text-xl text-charcoal/70">Nothing here yet... 🐱</p>
      <p className="text-sm text-charcoal/50 mt-2 max-w-sm text-center">Check back later when I've found some nice reels to share with you.</p>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-red-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="mb-4"
      >
        <AlertCircle size={48} strokeWidth={1.5} />
      </motion.div>
      <p className="font-serif text-xl text-charcoal/80 mb-2">Oops! The cats spilled the milk.</p>
      <p className="text-sm text-charcoal/60">Something went wrong. Try refreshing the page.</p>
    </div>
  );
}
