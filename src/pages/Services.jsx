// src/pages/Services.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useGlobalProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import HeroSection from '../components/HomeCom/HeroSection';
import { HiFunnel, HiXMark, HiChevronDown } from "react-icons/hi2"; 

const Services = () => {
  const { filteredProducts, loading, error, sortBy, setSortBy } = useGlobalProducts();
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // 💡 States للتحكم في فتح وغلق القوائم المنسدلة المخصصة (Custom Dropdowns)
  const [isDesktopSortOpen, setIsDesktopSortOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  // Refs عشان نقفل القائمة تلقائياً لو اليوزر ضغط في أي مكان بره الزرار
  const desktopSortRef = useRef(null);
  const mobileSortRef = useRef(null);

  // خريطة النصوص لعرض الاسم النظيف بناءً على قيمة الـ state
  const sortLabels = {
    recommended: "Recommended",
    lowToHigh: "Price: Low to High",
    highToLow: "Price: High to Low"
  };

  // إغلاق القوائم عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopSortRef.current && !desktopSortRef.current.contains(event.target)) {
        setIsDesktopSortOpen(false);
      }
      if (mobileSortRef.current && !mobileSortRef.current.contains(event.target)) {
        setIsMobileSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  }, [filteredProducts]);

  const currentGridProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length, sortBy]);

  if (loading) return <div className="text-center py-32 font-bold text-slate-600 animate-pulse">جاري تحميل المنتجات...</div>;
  if (error) return <div className="text-center py-32 text-red-500 font-bold">{error}</div>;

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <HeroSection />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12 flex flex-col md:flex-row gap-6 lg:gap-10">
        
        {/* 1️⃣ البار المخصص للموبايل فقط */}
        <div className="flex md:hidden items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-2 gap-3">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Found <strong className="text-slate-800">{filteredProducts.length}</strong> items
          </span>
          
          <div className="flex items-center gap-2 relative">
            {/* 💡 Custom Sort للموبايل */}
            <div className="relative" ref={mobileSortRef}>
              <button 
                onClick={() => setIsMobileSortOpen(!isMobileSortOpen)}
                className="flex items-center gap-1 px-3 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                <span>{sortLabels[sortBy]}</span>
                <HiChevronDown className={`text-slate-500 transition-transform duration-200 ${isMobileSortOpen ? "rotate-180" : ""}`} size={14} />
              </button>

              {isMobileSortOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-30 overflow-hidden py-1 animate-fade-in">
                  {Object.keys(sortLabels).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSortBy(key);
                        setIsMobileSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors block cursor-pointer ${
                        sortBy === key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl active:scale-95 transition-transform cursor-pointer"
            >
              <HiFunnel size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* 2️⃣ الفلتر العادي للكمبيوتر */}
        <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* 3️⃣ شاشة الفلتر المنبثقة للموبايل */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
                  <HiXMark size={24} className="text-slate-600" />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* 4️⃣ قسم المنتجات والجريد */}
        <div className="flex-1 flex flex-col gap-8 md:gap-10">
          
          {/* البار العلوي على الكمبيوتر */}
          <div className="hidden md:flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Found {filteredProducts.length} items matching filters</span>
            
            <div className="flex items-center gap-3">
              
              {/* 💡 قائمة الترتيب المخصصة والفاخرة للكمبيوتر (Custom UI Dropdown) */}
              <div className="relative" ref={desktopSortRef}>
                <button 
                  onClick={() => setIsDesktopSortOpen(!isDesktopSortOpen)}
                  className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm gap-2 min-w-[200px] justify-between hover:border-slate-300 transition-colors cursor-pointer text-slate-800"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-medium">Sort by:</span>
                    <span className="font-bold">{sortLabels[sortBy]}</span>
                  </div>
                  <HiChevronDown className={`text-slate-500 transition-transform duration-200 ${isDesktopSortOpen ? "rotate-180" : ""}`} size={14} />
                </button>

                {/* المنيو الفاخرة المنسدلة */}
                {isDesktopSortOpen && (
                  <div className="absolute right-0 mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-xl z-30 overflow-hidden py-1.5 border border-slate-200/60 animate-fade-in">
                    {Object.keys(sortLabels).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSortBy(key);
                          setIsDesktopSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                          sortBy === key 
                            ? "bg-slate-900 text-white font-black" 
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {sortLabels[key]}
                        {sortBy === key && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors cursor-pointer font-bold text-slate-700">
                📋 RFQ System
              </button>
            </div>
          </div>

          {currentGridProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 text-slate-400 font-medium">
              لم نجد منتجات تطابق خيارات الفلترة الحالية.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
              {currentGridProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}

          {/* البيجنيشن */}
          {filteredProducts.length > itemsPerPage && (
            <div className="mt-4 flex justify-center">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;