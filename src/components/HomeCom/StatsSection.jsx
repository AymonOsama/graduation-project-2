import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    { label: 'Buyers', value: '3 k +' },
    { label: 'Suppliers', value: '11 k +' },
    { label: 'Manufacture', value: '20 k +' },
    { label: 'Startups', value: '500 +' },
  ];

  return (
    <section className="bg-white my-10">
      {/* عنوان القسم - Built on Trust */}
      <div className="py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
          Built on Trust
        </h2>
      </div>

      {/* منطقة الإحصائيات بخلفية رمادية خفيفة كما في الصورة */}
      <div className="bg-red-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4"
            >
              {/* الرقم: كبير جداً وأسود صريح */}
              <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tighter">
                {stat.value}
              </h3>
              
              {/* التسمية: رمادي غامق وخط واضح */}
              <p className="text-lg md:text-xl font-medium text-slate-800">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;