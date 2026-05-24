import React, { useState } from 'react';
import { useFavorite } from '../hooks/useFavorite'; 
import ProductCard from '../components/ProductCard'; 
import { HiHeart, HiTrash, HiXMark } from "react-icons/hi2"; 
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useGlobalProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion'; // 🚀 استيراد موشن
import toast from 'react-hot-toast'; // 🚀 استيراد توست للرسائل التفاعلية

const FavoriteProducts = () => {
  const { favoriteProducts } = useFavorite();
  const { toggleFavorite } = useGlobalProducts(); 
  const navigate = useNavigate();
  
  // ستايت للتحكم في ظهور الـ Popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دالة مسح الكل الحقيقية
  const handleConfirmClearAll = () => {
    favoriteProducts.forEach(product => {
      toggleFavorite(product.id);
    });
    setIsModalOpen(false); // اقفل المودال بعد المسح
    toast.success('All items removed from wishlist');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 min-h-screen bg-slate-50/30 font-sans overflow-x-hidden">
      
      {/* هيدر الصفحة - Responsive مية في المية */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12 border-b border-slate-100 pb-6 text-left">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-red-50 rounded-2xl text-[#B6332E] shadow-sm shadow-red-100/50">
            <HiHeart size={26} className="fill-[#B6332E]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">My Wishlist</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Keep track of the products you love</p>
          </div>
        </div>

        {/* زرار مسح الكل الذكي */}
        {favoriteProducts.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)} // افتح الـ Popup المودرن
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-white bg-white hover:bg-[#B6332E] rounded-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#B6332E] shadow-sm active:scale-95 w-full sm:w-fit"
          >
            <HiTrash size={15} />
            Clear Wishlist
          </button>
        )}
      </div>

      {/* الجريد الاحترافي المحسن - تدرج الـ Responsive المثالي */}
      {favoriteProducts.length > 0 ? (
        <motion.div 
          layout // حركة ذكية للكروت لما عنصر يتمسح
          className="grid grid-cols-1 grid-flow-row xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {favoriteProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-full flex justify-center"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* الـ Empty State الموشن */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 sm:py-24 text-center flex flex-col items-center justify-center gap-5 bg-white rounded-[2.5rem] border border-slate-100 max-w-xl mx-auto mt-6 px-6 shadow-sm"
        >
          <div className="p-4 sm:p-5 bg-slate-50 rounded-full text-slate-400 border border-slate-100">
            <HiOutlineShoppingBag size={38} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Your wishlist is pristine</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
              Tap the heart icon on any product while browsing to curate your personal collection here!
            </p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="mt-2 px-8 py-3.5 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all active:scale-95 duration-200 cursor-pointer shadow-md shadow-slate-900/10"
          >
            Discover Products
          </button>
        </motion.div>
      )}

      {/* 🚀 الـ Popup الـ Premium (Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* الخلفية المضببة (Backdrop) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} // اقفل لو داس بره
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* جسم الـ Popup نفسه */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white w-full max-w-md rounded-[2rem] p-6 sm:p-8 text-center shadow-2xl z-10 border border-slate-100 font-sans"
            >
              {/* زرار الإغلاق السريع (X) */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <HiXMark size={18} />
              </button>

              {/* أيقونة التحذير الدائرية */}
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-50 text-[#B6332E] mb-5 shadow-sm shadow-red-100">
                <HiTrash size={24} />
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">Clear Wishlist?</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Are you sure you want to remove all items from your wishlist? This action cannot be undone.
              </p>

              {/* الأزرار التفاعلية */}
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmClearAll}
                  className="w-full px-5 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#B6332E] hover:bg-[#9c2b27] rounded-xl transition-colors cursor-pointer active:scale-95 shadow-sm shadow-red-200"
                >
                  Yes, Clear All
                </button>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FavoriteProducts;