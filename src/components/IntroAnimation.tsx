import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative"
      >
        <Heart className="w-24 h-24 text-pink-500 fill-pink-500" />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-pink-500 rounded-full blur-2xl -z-10"
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-8 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-white uppercase">
          Membuka Kenangan...
        </h2>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className="w-2 h-2 bg-blue-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
