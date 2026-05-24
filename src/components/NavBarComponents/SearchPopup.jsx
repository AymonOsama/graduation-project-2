import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// 🚀 استيراد الـ Hook الجديدة
import { useProductSearch } from '../../hooks/useProductSearch'; 

const SearchPopup = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // ⚡ السطر السحري: الـ Hook بتجيب الداتا وتفلترها بناءً على الـ State الحالية
    const filteredProducts = useProductSearch(searchQuery);

    const topSearches = [
        "Package", "Textile", "Lighting", "Industrial suppliers", 
        "Manufacture", "Ready to produce", "Raw Materials"
    ];

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        onClose();
    };

    return createPortal(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9999] flex items-end sm:items-center justify-center sm:p-4 overflow-hidden"
        >
            <motion.div 
                onClick={(e) => e.stopPropagation()}
                initial={{ y: window.innerWidth < 640 ? "100%" : 30, opacity: window.innerWidth < 640 ? 1 : 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: window.innerWidth < 640 ? "100%" : 30, opacity: window.innerWidth < 640 ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white w-full max-w-5xl h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[32px] sm:rounded-[28px] p-6 sm:p-8 shadow-2xl relative flex flex-col"
            >
                
                {/* الهيدر */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-shrink-0">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Search Catalog</h2>
                        <p className="text-xs text-gray-400 hidden sm:block mt-0.5">Find products, brands, and industrial suppliers</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-slate-900 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* بار البحث */}
                <div className="mt-4 relative flex-shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What are you looking for?" 
                        className="w-full bg-gray-50 rounded-xl py-3.5 sm:py-4 pl-12 pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#B6332E]/20 focus:bg-white border border-transparent focus:border-gray-200 transition-all text-left font-medium text-slate-800" 
                        autoFocus 
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* كونتنت العرض */}
                <div className="overflow-y-auto flex-1 mt-6 pr-1 custom-scrollbar pb-2">
                    <AnimatePresence mode="wait">
                        {searchQuery.trim() === '' ? (
                            <motion.div 
                                key="top-searches"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-2"
                            >
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-left px-1">Top Searches</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-2.5 px-1">
                                    {topSearches.map((tag, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => setSearchQuery(tag)} 
                                            className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-[#B6332E] transition-all cursor-pointer" 
                                            type="button"
                                        >
                                            {tag}
                                            <ArrowRight size={12} className="opacity-50" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="search-results"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }} 
                            >
                                <div className="flex items-center justify-between mb-4 px-1">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Search Results ({filteredProducts.length})
                                    </h3>
                                </div>
                                
                                {filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                        {filteredProducts.map((product) => (
                                            <div 
                                                key={product.id} 
                                                onClick={() => handleProductClick(product.id)} 
                                                className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer transition-all text-left group"
                                            >
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.title} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                                    />
                                                </div>
                                                <div className="overflow-hidden flex-1">
                                                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate group-hover:text-[#B6332E] transition-colors">{product.title}</h4>
                                                    <p className="text-[11px] sm:text-xs text-gray-400 font-medium truncate mt-0.5">
                                                        {product.description || (product.brand ? `by ${product.brand}` : "No description available")}
                                                    </p>
                                                    {product.price && (
                                                        <span className="text-xs font-extrabold text-[#B6332E] block pt-1">{product.price} EGP</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-14 text-center text-gray-400 flex flex-col items-center justify-center gap-3 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                        <ShoppingBag size={36} className="text-gray-300" />
                                        <p className="text-xs sm:text-sm font-medium px-4">No products found matching "{searchQuery}"</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

export default SearchPopup;