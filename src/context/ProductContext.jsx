import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
// استيراد الفانكشن من ملف الـ api بتاعك
import { fetchProductsFromApi } from "../api/fetchProductsFromApi";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States الفلاتر والترتيب
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [selectedRating, setSelectedRating] = useState(null); 
  const [sortBy, setSortBy] = useState('recommended'); 

  // 🚀 [جديد] ستايت تخزين الـ IDs للمنتجات المفضلة مع قراءتها من الـ LocalStorage أول ما الموقع يفتح
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // 🚀 [جديد] useEffect لمزامنة وحفظ المفضلة في الـ LocalStorage أوتوماتيك أول ما الـ IDs تتغير
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // 1. جلب البيانات وتفكيكها فوراً عند تحميل الموقع بس من خلال ملف الـ api بتاعك
  useEffect(() => {
    const fetchAndNormalizeProducts = async () => {
      try {
        setLoading(true);
        
        // نادينّا هنا على الملف بتاعك اللي بيرجع الـ raw data
        const rawProducts = await fetchProductsFromApi(); 
        
        // تفكيك وعمل Mapping للداتا عشان تطابق الـ UI والـ ProductCard بتاعك بالظبط
        const normalizedData = rawProducts.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category, 
          description: item.description,
          views: `${Math.floor(Math.random() * 300) + 40}+`,
          rating: item.rating,
          reviewsCount: item.stock * 2,
          mqo: Math.floor(Math.random() * 40) + 10, 
          price: Math.round(item.price * 50), 
          image: item.images?.[0] || item.thumbnail
        }));

        setProducts(normalizedData);
        setError(null);
      } catch (err) {
        console.error("Context Error while fetching from your api file:", err);
        setError("فشل في تحميل البيانات من السيرفر.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndNormalizeProducts();
  }, []);

  // 2. استخراج الفئات (Categories) الحقيقية ديناميكياً بدون تكرار
  const dynamicCategories = useMemo(() => {
    const categoriesSet = new Set(products.map(p => p.category));
    return Array.from(categoriesSet);
  }, [products]);

  // 3. محرك الفلترة والـ Sorting الذكي مدمجين سوا بأعلى كفاءة
  const filteredProducts = useMemo(() => {
    const filteredResult = products.filter(product => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price <= maxPrice;
      
      let matchesRating = true;
      if (selectedRating) {
        if (selectedRating === 5) {
          matchesRating = product.rating >= 4.7;
        } else if (selectedRating === 1) {
          matchesRating = product.rating < 1.5 || (product.rating >= 1 && product.rating < 2);
        } else {
          matchesRating = product.rating >= selectedRating && product.rating < selectedRating + 1;
        }
      }

      return matchesCategory && matchesPrice && matchesRating;
    });

    if (sortBy === 'lowToHigh') {
      return [...filteredResult].sort((a, b) => a.price - b.price); 
    }
    if (sortBy === 'highToLow') {
      return [...filteredResult].sort((a, b) => b.price - a.price); 
    }

    return filteredResult;
  }, [products, selectedCategories, maxPrice, selectedRating, sortBy]); 

  // 🚀 [جديد] دالة التبديل (Toggle) لإضافة أو حذف المنتج من المفضلة
  const toggleFavorite = (productId) => {
    setFavoriteIds(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId) // لو موجود شيله
        : [...prev, productId] // لو مش موجود ضيفه
    );
  };

  // 🚀 [جديد] تجميع لستة المنتجات المفضلة كاملة كأوبجكتس بناءً على الـ IDs عشان نعرضها في صفحة المفضلة
  const favoriteProducts = useMemo(() => {
    return products.filter(product => favoriteIds.includes(product.id));
  }, [products, favoriteIds]);

  // دالة لتصفية وإعادة تعيين الفلاتر (Reset All)
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(250000);
    setSelectedRating(null); 
    setSortBy('recommended'); 
  };

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      dynamicCategories,
      loading,
      error,
      selectedCategories,
      setSelectedCategories,
      maxPrice,
      setMaxPrice,
      selectedRating,    
      setSelectedRating, 
      sortBy,            
      setSortBy,         
      clearAllFilters,
      // 🚀 باصينا الداتا والـ Functions الجديدة هنا عشان الـ Hook تقرأها فوراً
      favoriteIds,
      favoriteProducts,
      toggleFavorite
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext; 

export const useGlobalProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useGlobalProducts must be used within ProductProvider");
  return context;
};