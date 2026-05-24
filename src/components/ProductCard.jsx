import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { HiStar, HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi2"; 
import { HiOutlineStar } from "react-icons/hi"; 
import { IoStarHalf } from "react-icons/io5"; 
import { useFavorite } from '../hooks/useFavorite'; 
import { useCart } from '../context/CartContext'; // 🚀 استيراد هوك السلة

const ProductCard = ({ product }) => {
  if (!product) return null;

  const navigate = useNavigate(); 
  
  // 🚀 التعديل هنا: سحبنا addToCart ودالة الحذف removeFromCart (تأكد من مطابقة مسميات الـ Context عندك)
  const { addToCart, removeFromCart, cartItems = [] } = useCart(); 
  const { isFavorite, toggleFavorite } = useFavorite(product.id);
  const brandRed = "#B6332E";

  // فحص ديناميكي هل المنتج في السلة حالياً أم لا
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // 🚀 دالة الـ Toggle الذكية والمحدثة لتتوافق مع الـ MOQ
  const handleCartToggle = (e) => {
    e.stopPropagation(); // ✋ منع فتح صفحة التفاصيل عند الضغط على زرار السلة
    
    if (isInCart) {
      // 1. لو المنتج موجود بالفعل في السلة -> قُم بإزالته
      if (removeFromCart) {
        removeFromCart(product.id);
      } else {
        console.error("removeFromCart function is not defined in CartContext");
      }
    } else {
      // 2. لو المنتج مش موجود في السلة -> قُم بإضافته بالحد الأدنى للطلب
      if (addToCart) {
        // حساب الـ MOQ ديناميكياً وتحويله لرقم (لو مش موجود أو مكتوب غلط يرجع لـ 1 كأمان)
        const rawMoq = product.moq || product.mqo || 1;
        const initialQuantity = parseInt(rawMoq, 10) || 1;

        addToCart({
          ...product,
          quantity: initialQuantity // 🚀 كدا هيضيف الحد الأدنى فوراً زي صفحة المنتج بالظبط!
        });
      } else {
        console.error("addToCart function is not defined in CartContext");
      }
    }
  };

  
  // دالة لإنشاء النجوم ديناميكياً
  const renderStars = (rating) => {
    const stars = [];
    if (rating >= 4.7) {
      for (let i = 1; i <= 5; i++) {
        stars.push(<HiStar key={`full-5-${i}`} className="text-amber-400 fill-amber-400 size-4" />);
      }
      return stars;
    }
    if (rating < 1.5) {
      stars.push(<HiStar key="full-1" className="text-amber-400 fill-amber-400 size-4" />);
      for (let i = 1; i <= 4; i++) {
        stars.push(<HiOutlineStar key={`empty-1-${i}`} className="text-slate-300 size-4" />);
      }
      return stars;
    }
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<HiStar key={`full-${i}`} className="text-amber-400 fill-amber-400 size-4" />);
    }
    if (decimalPart >= 0.3 && decimalPart <= 0.8) {
      stars.push(<IoStarHalf key="half" className="text-amber-400 size-4" />);
    } else if (decimalPart > 0.8) {
      stars.push(<HiStar key="half-full" className="text-amber-400 fill-amber-400 size-4" />);
    }
    const currentStarsLength = stars.length;
    for (let i = 1; i <= (5 - currentStarsLength); i++) {
      stars.push(<HiOutlineStar key={`empty-${i}`} className="text-slate-300 size-4" />);
    }
    return stars;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="w-full bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 font-sans cursor-pointer group"
    >
      
      {/* 1. IMAGE SECTION */}
      <div className="relative h-[240px] w-full bg-slate-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* الـ Icons الجانبية */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {/* زرار المفضلة */}
          <button 
            onClick={toggleFavorite} 
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-800 hover:bg-white shadow-sm transition-all active:scale-90 cursor-pointer"
          >
            {isFavorite ? (
              <HiHeart size={18} color={brandRed} />
            ) : (
              <HiOutlineHeart size={18} className="text-slate-700" />
            )}
          </button>

          {/* 🚀 زرار الـ Toggle الفوري للسلة (إضافة / حذف) وبدون أي Toasts هنا */}
          <button 
            onClick={handleCartToggle}
            className={`p-2 rounded-full shadow-sm transition-all active:scale-90 cursor-pointer duration-300 ${
              isInCart 
                ? 'bg-[#B6332E] text-white hover:bg-[#9c2b27]' 
                : 'bg-white/90 text-slate-700 hover:bg-white backdrop-blur-sm'
            }`}
          >
            {isInCart ? <HiShoppingBag size={18} /> : <HiOutlineShoppingBag size={18} />}
          </button>
        </div>
      </div>
      
      {/* 2. DETAILS SECTION */}
      <div className="p-5 text-left flex flex-col gap-3">
        {/* Category Tag */}
        <div>
          <span className="px-2.5 py-0.5 bg-red-50 text-[11px] font-bold rounded-full text-slate-800 border border-red-100/50">
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xl font-bold text-slate-800 truncate group-hover:text-[#B6332E] transition-colors">
          {product.title}
        </h3>

        {/* Product Description */}
        <p className="text-slate-500 text-xs line-clamp-2 min-h-[32px]">
          {product.description}
        </p>
        
        {/* Views Counter */}
        <div className="text-xs font-semibold text-slate-700 bg-slate-50 py-1 px-2.5 rounded-full w-fit">
          {product.views} viewed in past week
        </div>

        {/* سكشن النجوم */}
        <div className="flex items-center gap-1.5 bg-amber-50/60 py-1 px-3 rounded-full w-fit text-xs font-bold">
          <div className="flex items-center gap-0.5 text-amber-400">
            {renderStars(product.rating)}
          </div>
          <span className="text-slate-800 pl-1">{product.rating}</span> 
          <span className="text-slate-400 font-medium">({product.reviewsCount})</span>
        </div>
        
        <hr className="border-slate-100" />

        {/* 3. MOQ & PRICE MATRIX SECTION */}
        <div className="grid grid-cols-2 relative py-0.5 text-xs">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">MOQ</span>
            <span className="text-base font-black text-slate-800">{product.moq || product.mqo}</span>
          </div>

          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200" />

          <div className="flex flex-col pl-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Unit Price</span>
            <span className="text-base font-black text-slate-800">{product.price.toLocaleString()} EGP</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;