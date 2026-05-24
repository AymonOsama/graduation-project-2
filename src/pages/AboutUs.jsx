import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { IoArrowForward, IoCheckmarkCircleOutline, IoStatsChartOutline, IoSearchOutline } from "react-icons/io5";

// استبدال الصور بصور مجهولة رمادية تتناسب مع التصميم الصناعي للموقع
const photo1 = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"; // بناية صناعية
const photo2 = "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"; // اجتماع عمل
const photo3 = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"; // تكنولوجيا

const Divider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex justify-center">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="h-[1px] w-full bg-slate-200 origin-center"
      />
    </div>
  );
};

const AboutUs = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div 
      className="bg-white text-slate-900 min-h-screen font-sans overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {/* HEADER SECTION - Minimalist Style */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 text-center bg-[#F8F8F8]"
      >
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 sm:px-4 border border-slate-300 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 bg-white"
          >
            Our Identity
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tighter"
          >
            Connecting the <span className="text-[#C53030]">Industrial</span> <br className="hidden sm:block" /> World Together.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium px-2"
          >
            IndusConnect is a B2B ecosystem designed to bridge the gap between manufacturers, suppliers, and startups.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer mt-8 sm:mt-10 md:mt-12 bg-black text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full flex items-center gap-2 sm:gap-3 mx-auto font-bold shadow-xl hover:bg-slate-800 transition-all text-base sm:text-lg group"
          >
            Work With Us
            <IoArrowForward className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>
      </motion.section>

      {/* SECTION 1 - MISSION (Image Left, Text Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-2 sm:-inset-4 bg-slate-100 rounded-[2rem] sm:rounded-[3rem] -z-10 group-hover:bg-slate-200 transition-colors" />
            <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] aspect-[4/5] shadow-2xl">
              <motion.img
                src={photo1}
                alt="Mission"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                whileHover={{ scale: 1.05 }}
                draggable={false}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 md:space-y-8 text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Our Mission</h2>
            <div className="w-20 h-1.5 bg-[#C53030] rounded-full mx-auto md:mx-0" />
            <p className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
              We empower businesses by providing a transparent platform for industrial discovery. Our goal is to streamline the procurement process, ensuring every manufacturer finds the perfect partner.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 2 - VALUES (Text Left, Image Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-10 md:space-y-12 order-2 md:order-1 text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Core Principles</h2>
            <div className="space-y-6 sm:space-y-8">
              {[
                { icon: <IoCheckmarkCircleOutline />, title: "Industrial Integrity", desc: "Verifying every supplier to ensure the highest standards." },
                { icon: <IoStatsChartOutline />, title: "Strategic Growth", desc: "Scalable solutions for both startups and giant factories." },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
                  <div className="text-3xl text-[#C53030]">{item.icon}</div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-base sm:text-lg font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] aspect-square shadow-2xl">
              <motion.img
                src={photo2}
                alt="Values"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                whileHover={{ scale: 1.05 }}
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - METHODOLOGY (Dark Banner) */}
      <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center space-y-10 sm:space-y-12 md:space-y-16">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">The IndusConnect Way</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium px-4">Our systematic approach to industrial networking.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {[
              { icon: <IoSearchOutline />, title: "Discovery", desc: "Advanced filtering for specific industrial needs." },
              { icon: <IoCheckmarkCircleOutline />, title: "Verification", desc: "Rigid vetting of manufacturing capabilities." },
              { icon: <IoStatsChartOutline />, title: "Connection", desc: "Direct, secure lines between business partners." },
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-6 sm:p-8 border border-white/10 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-sm"
              >
                <div className="text-3xl sm:text-4xl text-[#C53030] mb-4 sm:mb-6 flex justify-center">{step.icon}</div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{step.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;