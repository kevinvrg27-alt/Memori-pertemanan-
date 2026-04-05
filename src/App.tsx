import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StarryBackground } from './components/StarryBackground';
import { ImageSlider } from './components/ImageSlider';
import { IntroAnimation } from './components/IntroAnimation';
import { Sparkles, Heart, Camera, Calendar } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <StarryBackground />
      
      {/* Hero Section */}
      <header className="relative pt-24 pb-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: showIntro ? 4 : 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium tracking-wide text-gray-300 uppercase">Koleksi Kenangan Abadi</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            Memori Pertemanan
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Setiap foto menyimpan cerita, setiap tawa menyimpan makna. 
            Terima kasih telah menjadi bagian dari perjalanan hidupku yang luar biasa.
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: showIntro ? 4.4 : 0.4, duration: 1 }}
        >
          <ImageSlider />
        </motion.div>

        {/* Stats/Info Section */}
        <section className="max-w-6xl mx-auto px-4 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Heart, label: "Momen Berharga", value: "Tak Terhingga", color: "text-pink-400" },
            { icon: Camera, label: "Foto Tersimpan", value: "5 Kenangan", color: "text-blue-400" },
            { icon: Calendar, label: "Waktu Bersama", value: "Selamanya", color: "text-purple-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (showIntro ? 4.6 : 0.6) + (i * 0.1) }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group"
            >
              <item.icon className={`w-8 h-8 mb-4 ${item.color} group-hover:scale-110 transition-transform`} />
              <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{item.label}</h3>
              <p className="text-2xl font-bold text-white">{item.value}</p>
            </motion.div>
          ))}
        </section>

        {/* Footer Message */}
        <footer className="mt-32 text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8" />
            <p className="text-gray-400 italic mb-4">
              "Persahabatan bukanlah tentang siapa yang paling lama kamu kenal, 
              tapi tentang siapa yang datang dan tidak pernah meninggalkanmu."
            </p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">
              Dibuat dengan cinta untuk sahabat terbaik
            </p>
          </motion.div>
        </footer>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
