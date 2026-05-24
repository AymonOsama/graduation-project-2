import React from 'react';
import { motion } from 'framer-motion';
// استخدمت أيقونات Solid عشان تطابق سُمك الصورة
import { IoHeart, IoSpeedometer, IoBulb, IoPeople } from "react-icons/io5";

const features = [
  { 
    icon: <IoHeart />, 
    title: "Verified businesses and transparent transactions" 
  },
  { 
    icon: <IoSpeedometer />, 
    title: "Find the right partner in minutes, not weeks" 
  },
  { 
    icon: <IoBulb />, 
    title: "Smart connections tailored to your business needs" 
  },
  { 
    icon: <IoPeople />, 
    title: "Build partnerships that scale with you" 
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-white my-10">
      <div className="max-w-7xl mx-auto">
        {/* العنوان الرئيسي بنفس ستايل الصورة */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
            What we Have
          </h2>
        </div>

        {/* شبكة المميزات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6 group"
            >
              {/* 🔴 تم تغيير الكلاس هنا إلى text-[#B6332E] ليصبح اللون أحمر براند متميز */}
              <div className="text-5xl text-[#B6332E] transition-transform duration-300 group-hover:scale-110">
                {f.icon}
              </div>
              
              {/* النص: رمادي غامق، خط متوسط، ومسافة أسطر مريحة */}
              <p className="text-[15px] md:text-base font-bold text-[#333] max-w-[240px] leading-snug">
                {f.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;