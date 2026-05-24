import React from 'react';
import { motion } from 'framer-motion';
import photo from '../../assets/Gemini_Generated_Image_k55jik55jik55jik-removebg-preview.png';

const HeroSection = () => {
  return (
    <section className="bg-[#ECDBC9] min-h-[550px] md:min-h-[620px] flex items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-24 pb-12 md:py-20 overflow-hidden relative">
      
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* --- النصف الأيسر: النصوص والأزرار --- */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 xl:col-span-8 space-y-6 md:space-y-8 z-10"
        >
          <h1 className="text-[36px] sm:text-[46px] md:text-[56px] font-bold text-[#1E2229] leading-[1.15] tracking-tight max-w-4xl">
            All Suppliers, Traders & Manufacturers <br className="hidden sm:block" /> 
            in One Place.
          </h1>

          <p className="text-[#646464] text-[16px] md:text-[19px] max-w-2xl leading-relaxed font-normal">
            Find the right supplier, get the best price, and manage <br className="hidden sm:block" /> 
            your orders.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: "#A12B27" }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#B6332E] text-white px-10 py-3.5 rounded-full font-semibold text-base shadow-[0_10px_25px_rgba(182,51,46,0.25)] transition-all cursor-pointer"
            >
              Shop Now
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: "rgba(182,51,46,0.04)" }}
              whileTap={{ scale: 0.97 }}
              className="border-[1.5px] border-[#92423F] text-[#1E2229] px-10 py-3.5 rounded-full font-semibold text-base transition-all bg-transparent cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
            >
              Read more
            </motion.button>
          </div>
        </motion.div>

        {/* --- النصف الأيمن: الجرافيك والصورة الدائرية --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 xl:col-span-4 relative flex justify-center items-center w-full"
        >
          <div className="relative w-full max-w-[460px] aspect-square flex justify-center items-center">
            
            {/* الدائرة الأولى - تدور بزاوية */}
            <motion.svg 
              className="absolute inset-0 w-full h-full text-[#B6332E]/60 select-none pointer-events-none scale-[1.35] md:scale-[1.55] translate-x-4 md:translate-x-8"
              viewBox="0 0 200 200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.8"
              animate={{
                rotate: [0, 360],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                rotate: {
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity
                },
                opacity: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity
                }
              }}
            >
              <ellipse cx="95" cy="100" rx="85" ry="75" transform="rotate(-15 95 100)" />
            </motion.svg>

            {/* الدائرة الثانية - تدور بعكس الاتجاه */}
            <motion.svg 
              className="absolute inset-0 w-full h-full text-[#B6332E]/40 select-none pointer-events-none scale-[1.35] md:scale-[1.55] translate-x-4 md:translate-x-8"
              viewBox="0 0 200 200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.8"
              animate={{
                rotate: [0, -360],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                rotate: {
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity
                },
                opacity: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.5
                }
              }}
            >
              <ellipse cx="105" cy="95" rx="78" ry="88" transform="rotate(20 105 95)" />
            </motion.svg>

            {/* القوس الإضافي - حركة نبضية */}
            <motion.svg 
              className="absolute inset-0 w-full h-full text-[#B6332E]/50 select-none pointer-events-none scale-[1.35] md:scale-[1.55] translate-x-4 md:translate-x-8"
              viewBox="0 0 200 200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.8"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                filter: [
                  "drop-shadow(0 0 0px rgba(182, 51, 46, 0))",
                  "drop-shadow(0 0 12px rgba(182, 51, 46, 0.6))",
                  "drop-shadow(0 0 0px rgba(182, 51, 46, 0))"
                ]
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity
              }}
            >
              <path d="M 12,90 A 80,85 0 0,1 185,115" strokeDasharray="3 1" />
            </motion.svg>

            {/* الصورة مع حركة floating */}
            <motion.img 
              src={photo} 
              alt="Suppliers and Orders Packages" 
              className="w-[85%] md:w-full h-auto object-contain z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
              animate={{
                scale: [1, 1.02, 1],
                y: [0, -8, 0]
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;