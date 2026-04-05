import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Download, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Moment {
  id: number;
  title: string;
  url: string;
  description: string;
}

const MOMENTS: Moment[] = [
  {
    id: 1,
    title: "Momen 1",
    url: "https://i.ibb.co.com/xS2g5KwH/Gemini-Generated-Image-632a02632a02632a.png",
    description: "Awal dari segalanya, tawa yang tak pernah pudar."
  },
  {
    id: 2,
    title: "Momen 2",
    url: "https://i.ibb.co.com/7JkYJJtP/Gemini-Generated-Image-r12yz0r12yz0r12y.png",
    description: "Kebersamaan di bawah langit yang sama, selamanya."
  },
  {
    id: 3,
    title: "Momen 3",
    url: "https://i.ibb.co.com/ZpPZP5Cx/Gemini-Generated-Image-vrddavvrddavvrdd.png",
    description: "Setiap detik berharga saat kita bersama."
  },
  {
    id: 4,
    title: "Momen 4",
    url: "https://i.ibb.co.com/cXKK4z2c/Gemini-Generated-Image-a2yxufa2yxufa2yx.png",
    description: "Cerita yang akan kita ceritakan di masa depan."
  },
  {
    id: 5,
    title: "Momen 5",
    url: "https://i.ibb.co.com/sdYJwccX/Gemini-Generated-Image-us3bjtus3bjtus3b.png",
    description: "Ikatan yang tak terputus oleh waktu dan jarak."
  }
];

export const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + MOMENTS.length) % MOMENTS.length);
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="absolute inset-0"
          >
            <img
              src={MOMENTS[currentIndex].url}
              alt={MOMENTS[currentIndex].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2 text-pink-400">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium tracking-wider uppercase">Memori Kita</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{MOMENTS[currentIndex].title}</h2>
                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                  {MOMENTS[currentIndex].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all z-10 border border-white/10"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all z-10 border border-white/10"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Download Button */}
        <button
          onClick={() => handleDownload(MOMENTS[currentIndex].url, `${MOMENTS[currentIndex].title}.png`)}
          className="absolute top-6 right-6 p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all z-10 border border-white/10 group"
          title="Download Image"
        >
          <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-4 mt-8">
        {MOMENTS.map((moment, index) => (
          <button
            key={moment.id}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentIndex === index 
                ? "bg-white w-8" 
                : "bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};
