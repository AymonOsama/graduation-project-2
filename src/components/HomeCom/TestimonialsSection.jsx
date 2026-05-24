import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    { name: "Sami", role: "Supplier", image: "/avatars/sami.png", text: "I found reliable suppliers much faster than before. The process was smooth and saved me a lot of time.", rating: 4 },
    { name: "Nour", role: "Buyer", image: "/avatars/nour.jpg", text: "IndusConnect helped me reach new clients effortlessly. Management and communication became much easier.", rating: 5 },
    { name: "Omar", role: "General", image: "/avatars/omar.png", text: "A practical platform that makes business connections simple and lives up to what it promises.", rating: 4 }
];

const TestimonialsSection = () => {
    // كود مخصص للون الأحمر الخاص بـ IndusConnect المطابق للصور
    const brandRed = "#B6332E"; 

    return (
        <section className="py-24 px-6 md:px-8 bg-white my-10 font-sans">
            <div className="max-w-7xl mx-auto text-center space-y-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Satisfied Clients Speak
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-white p-6 md:p-8 rounded-[2.5rem] flex flex-col text-left relative"
                            style={{ border: `3px solid ${brandRed}` }} // الـ Border الأحمر الخارجي للكارت بالكامل
                        >
                            {/* الجزء العلوي: هيدر الكارت (الصورة + الاسم والنجوم + الـ Role) */}
                            <div className="flex items-center justify-between w-full mb-6 p-2">
                                <div className="flex items-center gap-4">
                                    {/* صورة العميل الدائرية */}
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-16 h-16 rounded-full object-cover border border-slate-100 shadow-sm"
                                    />
                                    {/* الاسم والنجوم تحته مباشرة */}
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl md:text-2xl font-medium text-slate-800 tracking-tight">
                                            {item.name}
                                        </h3>
                                        <div className="flex text-yellow-400 text-lg md:text-xl">
                                            {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                                        </div>
                                    </div>
                                </div>

                                {/* الـ Role في أقصى اليمين من الأعلى */}
                                <span className="text-xs md:text-sm font-bold text-slate-700 self-start mt-2">
                                    {item.role}
                                </span>
                            </div>

                            {/* الجزء السفلي: نص المراجعة الممتد بكامل العرض */}
                            <div className="w-full">
                                <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed tracking-wide">
                                    {item.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* زر عرض المزيد */}
                <button 
                    className="text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide shadow-md hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
                    style={{ backgroundColor: brandRed }}
                >
                    More Reviews →
                </button>
            </div>
        </section>
    );
};

export default TestimonialsSection;