import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Heart, User, ShoppingBag, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext'; 
import { useFavorite } from '../hooks/useFavorite'; // 🚀 استيراد هوك المفضلة

// استيراد المكونات الفرعية
import SearchPopup from '../components/NavBarComponents/SearchPopup';
import NavMenu from './NavBarComponents/NavMenu';
import UserDropdown from '../components/NavBarComponents/UserDropdown';

const NavBar = () => {
    const navigate = useNavigate();
    const { user, logoutGlobal } = useAuth(); 
    
    // 🚀 سحبنا هنا الـ cartCount ومصفوفة cartItems لتأمين الحساب في كل السيناريوهات
    const { cartCount, cartItems = [] } = useCart(); 
    const { favoriteIds = [] } = useFavorite(); // 🚀 سحب الـ IDs للمفضلة مع قِيمة افتراضية مصفوفة فاضية تفادياً لأي إيرور

    // تحديد العدد الفعلي للسلة ديناميكياً
    const currentCartCount = cartCount !== undefined ? cartCount : cartItems.length;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logoutGlobal(); 
        setIsUserDropdownOpen(false);
        navigate('/login');
    };

    return (
        <nav 
            className={`w-full fixed top-0 left-0 z-50 font-sans transition-all duration-300 ease-in-out ${
                isScrolled 
                    ? 'bg-white border-b border-gray-100 shadow-sm' 
                    : 'bg-transparent border-b border-transparent backdrop-blur-md'
            }`}
        >
            {/* 🛠️ تحسين الـ Padding للكونتينر على الموبايل ليصبح px-4 لتوفير مساحة عرض مريحة */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14">
                
                {/* 🛠️ تعديل ديناميكي للارتفاع: يبدأ من h-16 للموبايل وحتى h-28 للشاشات الكبيرة لتفادي الضخامة */}
                <div className="flex items-center justify-between h-16 sm:h-22 md:h-24 lg:h-28 transition-all duration-300">
                    
                    {/* --- اليسار: زر المنيو واللوجو --- */}
                    <div className="flex items-center gap-2 sm:gap-6 md:gap-8">
                        <button 
                            className={`p-2 cursor-pointer rounded-xl transition-all text-slate-900 ${
                                isScrolled ? 'hover:bg-gray-100/70' : 'hover:bg-slate-900/5'
                            }`} 
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                        </button>

                        <Link to="/home" className="flex items-center">
                            <img 
                                src="/logo.svg" 
                                alt="IndusConnect" 
                                className="w-24 h-10 sm:w-32 sm:h-14 md:w-40 md:h-20 object-contain transition-all duration-300" 
                            />
                        </Link>
                    </div>

                    {/* --- اليمين: الأيقونات والتحكم --- */}
                    <div className="flex items-center gap-1.5 sm:gap-5 md:gap-8">
                        
                        {/* زر البحث */}
                        <button 
                            className={`cursor-pointer p-2 rounded-xl transition-all text-slate-900 ${
                                isScrolled ? 'hover:bg-gray-100/70' : 'hover:bg-slate-900/5'
                            }`} 
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </button>

                        {/* زر المفضلة المطور */}
                        <button 
                            className={`relative cursor-pointer p-2 rounded-xl transition-all text-slate-900 ${
                                isScrolled ? 'hover:bg-gray-100/70' : 'hover:bg-slate-900/5'
                            }`}
                            onClick={() => navigate('/favorites')}
                        >
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                            
                            {/* 🚀 النقطة الحمراء الحية بتأثير نبض (Ping Animation) المؤمّنة بالـ Optional Chaining */}
                            {favoriteIds?.length > 0 && (
                                <span className="absolute top-2 right-2 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            )}
                        </button>

                        {/* أيقونة المستخدم والقائمة المنسدلة */}
                        <div className="relative">
                            <button 
                                className={`flex items-center gap-0.5 transition-all p-2 rounded-xl cursor-pointer group text-slate-900 ${
                                    isScrolled ? 'hover:bg-gray-100/70' : 'hover:bg-slate-900/5'
                                }`}
                                onClick={() => user ? setIsUserDropdownOpen(!isUserDropdownOpen) : navigate('/login')}
                            >
                                <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                {user && (
                                    <ChevronDown 
                                        size={12} 
                                        className="transition-transform duration-300 ease-in-out text-slate-400 group-hover:text-slate-900 hidden sm:block" 
                                    />
                                )}
                            </button>

                            <AnimatePresence>
                                {isUserDropdownOpen && user && (
                                    <UserDropdown 
                                        user={user} 
                                        onClose={() => setIsUserDropdownOpen(false)} 
                                        onLogout={handleLogout} 
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 🚀 زر السلة المطور والمؤمّن بالكامل ضد اختفاء الأرقام */}
                        <Link 
                            to="/cart"
                            className={`relative cursor-pointer p-2 rounded-xl transition-all text-slate-900 ${
                                isScrolled ? 'hover:bg-gray-100/70' : 'hover:bg-slate-900/5'
                            }`}
                        >
                            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                            
                            {/* يعرض الرقم لو السلة فيها منتجات أكبر من صفر */}
                            {currentCartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-700 text-[9px] sm:text-[10px] font-black text-white border border-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] select-none transition-all duration-300 animate-in fade-in zoom-in-75">
                                    {currentCartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                </div>
            </div>

            {/* --- المكونات المنبثقة (Popups & Sidebars) --- */}
            <AnimatePresence>
                {isSearchOpen && <SearchPopup onClose={() => setIsSearchOpen(false)} />}
                {isMenuOpen && <NavMenu onClose={() => setIsMenuOpen(false)} />}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;