import React from 'react';
import { motion } from 'framer-motion';

// 📷 هنا تقدر تعمل import لأي صورة من عندك وتغير المسار ده
import storyPhoto from '../../assets/Gemini_Generated_Image_k55jik55jik55jik.png'; 

const StorySection = () => {
  return (
    // تم إزالة my-10 وتقليل الـ Padding السفلي إلى pb-0 ليلتصق بالسكشن التالي تماماً
    <section className="bg-white pt-24 pb-0 px-6 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center justify-items-start my-10">
      
      {/* --- النصف الأيسر: حاوية الصورة (شمال) --- */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-[440px] aspect-[1.05/1] md:ml-0 md:col-span-5"
      >
        {/* الصورة بالحواف الدائرية الخاصة والمطابقة تماماً للصورة المعروضة */}
        <div className="w-full h-full bg-[#E5E5E5] rounded-[50px_50px_50px_0px] overflow-hidden drop-shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative">
          {storyPhoto ? (
            <img 
              src={storyPhoto} 
              alt="Our Story - IndusConnect Team" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
              Place your image here
            </div>
          )}
        </div>

        {/* 🔘 مؤشر السلايدر (الـ Dots Capsule) متمركز تحت الصورة */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.06)] z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E2229]"></span>
        </div>
      </motion.div>

      {/* --- النصف الأيمن: النصوص (يمين) بالتدرج البصري الصحيح --- */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="space-y-6 md:col-span-7 w-full"
      >
        {/* العنوان الرئيسي الصريح والتقيل */}
        <h4 className="text-[#1E2229] font-bold text-[28px] md:text-[32px] tracking-tight">
          Our Story
        </h4>
        
        {/* الديسكربشن المريح في الوزن واللون */}
        <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-medium text-[#4A5568] leading-[1.5] tracking-tight w-full">
          IndusConnect is a B2B platform connecting startups, manufacturers, suppliers, and traders in one trusted network.
        </h2>
      </motion.div>

    </section>
  );
};

export default StorySection;