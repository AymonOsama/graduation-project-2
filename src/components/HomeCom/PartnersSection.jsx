import React from 'react';
import { IoBusinessOutline } from "react-icons/io5";

const PartnersSection = () => {
    return (
        <section className="py-20 px-8 border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto text-center space-y-12">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Collaboration and Partners
                </h2>
                
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30">
                    {/* يمكنك استبدال هذه الأيقونات بلوجوهات الشركات لاحقاً */}
                    {[1, 2, 3, 4].map((i) => (
                        <div 
                            key={i} 
                            className="flex flex-col items-center gap-2 filter grayscale hover:grayscale-0 transition-all cursor-pointer group"
                        >
                            <IoBusinessOutline className="text-5xl text-slate-900 group-hover:text-black" />
                            <span className="font-bold text-[10px] uppercase tracking-widest text-slate-500">
                                Partner {i}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;