// components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  // 💡 دالة ذكية لتحديد الأرقام اللي هتظهر بناءً على مقاس الشاشة والصفحة الحالية
  const getVisiblePages = () => {
    const pages = [];
    
    // لو إجمالي الصفحات صغير (مثلاً أقل من 5)، نعرضهم كلهم عادي
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // هنا بتبدأ الحسبة الذكية: دايماً بنعرض الصفحة الأولى والأخيرة، وحوالين الصفحة الحالية
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push('... '); // نقاط تخطي من البداية
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push(' ...'); // نقاط تخطي قبل النهاية
    }

    pages.push(totalPages);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6 border-t border-slate-200/60 mt-4 font-sans select-none">
      
      {/* زر السهم الخلفي */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all cursor-pointer border ${
          currentPage === 1 
            ? "text-slate-300 border-slate-100 bg-slate-50 cursor-not-allowed pointer-events-none" 
            : "text-slate-600 border-slate-200 hover:bg-slate-50 active:scale-95"
        }`}
      >
        ←
      </button>

      {/* أرقام الصفحات الذكية المفلترة */}
      {visiblePages.map((page, index) => {
        // لو العنصر عبارة عن نقاط تخطي، بنعرضه كنص مش زرار قابل للضغط
        if (typeof page === 'string' && page.includes('...')) {
          return (
            <span 
              key={`dots-${index}`} 
              className="w-8 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-400 font-bold text-sm"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              currentPage === page
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "text-slate-600 hover:bg-slate-100 active:scale-95"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* زر السهم الأمامي */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all cursor-pointer border ${
          currentPage === totalPages 
            ? "text-slate-300 border-slate-100 bg-slate-50 cursor-not-allowed pointer-events-none" 
            : "text-slate-600 border-slate-200 hover:bg-slate-50 active:scale-95"
        }`}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;