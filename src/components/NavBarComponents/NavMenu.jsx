import React from 'react';
import ReactDOM from 'react-dom'; // 💡 استيراد الـ Portal
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const NavMenu = ({ onClose }) => {
    // المكون الفعلي للمنيو
    const menuContent = (
        <>
            {/* الخلفية المظلمة - الـ Overlay */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]" // 💡 رفع الـ z-index وضبط الشفافية
            />
            
            {/* القائمة الجانبية */}
            <motion.div 
                initial={{ x: '-100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[9999] shadow-2xl p-6 sm:p-8" // 💡 رفع الـ z-index ليكون أعلى من أي عنصر آخر
            >
                <div className="flex justify-between items-center mb-10">
                    <span className="font-bold text-xl text-slate-900">Menu</span>
                    <button className="cursor-pointer p-1 text-slate-900 hover:text-red-600 transition-colors" onClick={onClose}>
                        <X size={28} />
                    </button>
                </div>
                
                <div className="flex flex-col gap-5 text-lg font-medium">
                    <NavLink to="/home" className={({isActive}) => isActive ? "text-red-600" : "text-slate-800 hover:text-red-600 transition-colors"} onClick={onClose}>Home</NavLink>
                    <NavLink to="/services" className={({isActive}) => isActive ? "text-red-600" : "text-slate-800 hover:text-red-600 transition-colors"} onClick={onClose}>Services</NavLink>
                    <NavLink to="/about-us" className={({isActive}) => isActive ? "text-red-600" : "text-slate-800 hover:text-red-600 transition-colors"} onClick={onClose}>About Us</NavLink>
                    <NavLink to="/contact" className={({isActive}) => isActive ? "text-red-600" : "text-slate-800 hover:text-red-600 transition-colors"} onClick={onClose}>Contact Us</NavLink>
                </div>
            </motion.div>
        </>
    );

    // 💡 حقن المنيو مباشرة في الـ body لخروجها من سياق الـ nav والبلور
    return ReactDOM.createPortal(menuContent, document.body);
};

export default NavMenu;