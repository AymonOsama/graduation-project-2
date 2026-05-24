// src/components/FilterSidebar.jsx
import React from 'react';
import { useGlobalProducts } from '../context/ProductContext'; // 👈 استيراد الـ Hook السحري
import { HiStar } from "react-icons/hi2"; // استخدام الأيقونة الموحدة للنجوم

const FilterSidebar = () => {
  // 👈 سحب محركات الفلترة الحقيقية من الـ Context العالمي
  const {
    dynamicCategories,
    selectedCategories,
    setSelectedCategories,
    maxPrice,
    setMaxPrice,
    selectedRating,
    setSelectedRating,
    clearAllFilters
  } = useGlobalProducts();

  // دالة التعامل مع الـ Checkbox الخاص بالفئات
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 text-left font-sans bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Filter Options</h2>
        <button 
          onClick={clearAllFilters}
          className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>
      <hr className="border-slate-100 mb-6" />

      {/* 1. SECTION: Categories (الديناميكية المستخرجة من الـ API) */}
      <div className="mb-8">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">By Categories</h3>
        <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
          {dynamicCategories.map((category, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900 capitalize">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800 accent-slate-800 cursor-pointer"
              />
              <span>{category.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>
      <hr className="border-slate-100 mb-6" />

      {/* 2. SECTION: Price Range (المربوط بـ حد السعر الأقصى للـ API) */}
      <div className="mb-8">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Price</h3>
        <div className="text-xs font-bold text-slate-600 mb-3">Up to: {maxPrice.toLocaleString()} EGP</div>
        <input 
          type="range" 
          min="500" 
          max="250000" 
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
        />
      </div>
      <hr className="border-slate-100 mb-6" />

      {/* 3. SECTION: Rating Star Filter (مربوط بالـ Radio) */}
      <div>
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">Rating</h3>
        <div className="flex flex-col gap-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
              <input 
                type="radio" 
                name="rating-filter"
                checked={selectedRating === stars}
                onChange={() => setSelectedRating(stars)}
                className="w-4 h-4 text-slate-800 focus:ring-slate-800 border-slate-300 accent-slate-800 cursor-pointer"
              />
              <div className="flex text-amber-400 gap-0.5">
                {/* رسم النجوم بناءً على الرقم */}
                {Array.from({ length: 5 }, (_, i) => (
                  <HiStar 
                    key={i} 
                    className={`size-4 ${i < stars ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-bold">{stars} Stars & Up</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;