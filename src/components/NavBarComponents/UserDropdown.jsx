import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrentUser } from '../../hooks/useCurrentUser'; // 🚀 استيراد الـ Hook الجديد (تأكد من المسار)

// إعدادات القائمة: سريعة ولحظية بدون أي تأخير للنصوص
const dropdownVariants = {
    hidden: { 
        opacity: 0, 
        y: 8, 
        scale: 0.98 
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
            duration: 0.15, // سرعة فائقة جداً للفتح
            ease: "easeOut"
        }
    },
    exit: { 
        opacity: 0, 
        y: 6, 
        scale: 0.98,
        transition: { duration: 0.1, ease: "easeIn" }
    }
};

// أنميشن مخصص للسهم فقط (يتحرك للخارج عند الـ Hover)
const arrowVariants = {
    rest: { x: 0 },
    hover: { 
        x: 3, 
        transition: { type: "spring", stiffness: 400, damping: 15 } 
    }
};

// 🚀 شيلنا الـ user من الـ props لأننا بنجيبه ديناميكياً جوه الكومبوننت دلوقتي
const UserDropdown = ({ onClose, onLogout }) => {
    
    // 🚀 استدعاء الـ Hook لجلب بيانات اليوزر الحالي وحالة التحميل
    const { currentUser, fetchingUser } = useCurrentUser();

    const handleLogoutClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        onLogout(); 
    };

    // لو لسه بيحمل البيانات مش هنعرض حاجة أو سيب الـ Fallback شغال لحين الإنتهاء
    if (fetchingUser) return null;

    const firstLetter = (currentUser?.fullName || currentUser?.username || 'U').charAt(0).toUpperCase();

    return (
        <>
            {/* الخلفية الوهمية لإغلاق القائمة بسلاسة */}
            <div className="fixed inset-0 z-10" onClick={onClose}></div>
            
            <motion.div 
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-md border border-gray-100/80 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] z-20 py-2.5 overflow-hidden origin-top-right"
            >
                {/* رأس القائمة: بيانات المستخدم - تظهر فوراً */}
                <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3.5 bg-gray-50/40">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold text-base shadow-sm ring-4 ring-gray-100 select-none">
                        {firstLetter}
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Welcome back</span>
                        <span className="text-[15px] font-bold text-gray-900 truncate mt-0.5">
                            {currentUser?.fullName || currentUser?.username || 'User'}
                        </span>
                    </div>
                </div>

                {/* روابط الخيارات */}
                <div className="p-2 space-y-1">
                    <div>
                        <Link 
                            to="/profile" 
                            onClick={onClose}
                            className="flex items-center gap-3.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group font-medium"
                        >
                            <span className="p-1.5 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                <User size={18} />
                            </span>
                            My Profile
                        </Link>
                    </div>
                    
                    <div className="border-t border-gray-50 my-1.5" />

                    <div>
                        <motion.button 
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            onClick={handleLogoutClick}
                            type="button"
                            className="w-full flex items-center gap-3.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50/60 rounded-xl transition-all duration-200 group font-semibold text-left cursor-pointer"
                        >
                            <span className="p-1.5 rounded-lg bg-red-50 text-red-500 group-hover:bg-red-100 group-hover:text-red-600 transition-colors flex items-center justify-center">
                                {/* SVG مخصص للـ LogOut للتحكم في السهم بشكل منفصل */}
                                <svg 
                                    className="w-[18px] h-[18px]" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    {/* إطار الباب الثابت */}
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    {/* السهم المتحرك فقط */}
                                    <motion.g variants={arrowVariants}>
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </motion.g>
                                </svg>
                            </span>
                            Sign Out
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default UserDropdown;