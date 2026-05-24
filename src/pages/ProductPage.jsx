import React, { useState, useEffect } from 'react'; 
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../context/CartContext'; 
import ProductGallery from '../components/ProductPageCom/ProductGallery';
import { RenderStars } from '../components/ProductPageCom/RenderStars';
import ProductReviews from '../components/ProductPageCom/ProductReviews';
import { 
    Truck, DollarSign, Award, ShieldCheck, 
    User, ArrowLeft, Plus, Minus, Star 
} from 'lucide-react';

const ProductPage = () => {
    const {
        product, activeTab, setActiveTab,
        isFavorite, setIsFavorite, navigate
    } = useProduct();

    const { addToCart } = useCart();

    // 1. تحويل الـ minOrderQty لـ State عشان نضمن الـ Re-render المظبوط أول ما الـ API يحمل
    const [minOrderQty, setMinOrderQty] = useState(1);
    const [localQuantity, setLocalQuantity] = useState(1);

        // جوه المكون وقبل أي شروط عرض (مثل شرط loading)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // لو عايز الحركة تكون ناعمة، أو خليها 'auto' عشان تطلع فوراً بدون أنيميشن
        });
    }, []);

    // 2. تحديث القيمتين معاً فور وصول بيانات المنتج أو تغيره
    useEffect(() => {
        if (product && product.mqo) {
            const mqoValue = Number(product.mqo);
            setMinOrderQty(mqoValue);
            setLocalQuantity(mqoValue); // البداية تكون من الـ MQO فوراً
        }
    }, [product]);

    // دالات التحكم المحلية المأمنة بالـ State الجديد
    const localIncrement = () => setLocalQuantity(prev => prev + 1);
    
    const localDecrement = () => {
        setLocalQuantity(prev => {
            if (prev > minOrderQty) {
                return prev - 1;
            }
            return minOrderQty;
        });
    };

    // Show loading/not found state
    if (!product) {
        return (
            <div className="w-full min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center pt-36 pb-16 px-4">
                <p className="text-slate-600 font-bold mb-4 text-center">Sorry, product not found or loading...</p>
                <button 
                    onClick={() => navigate('/services')}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back to Services
                </button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#F4F6F8] text-slate-900 font-sans pt-24 md:pt-32 pb-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* الجزء العلوي الرئيسي: تفاصيل المنتج والصورة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start bg-[#F4F6F8] rounded-3xl mb-8">
                    
                    {/* اليسار: معرض الصور (Product Gallery) */}
                    <div className="w-full md:sticky md:top-32">
                        <ProductGallery 
                            image={product.image} 
                            title={product.title} 
                            isFavorite={isFavorite} 
                            setIsFavorite={setIsFavorite} 
                        />
                    </div>

                    {/* اليمين: معلومات المنتج وتفاصيل الطلب */}
                    <div className="flex flex-col justify-start text-left space-y-5 pt-2 w-full">
                        
                        {/* التصنيف (Category) */}
                        <span className="text-sm font-semibold text-[#B6332E]">
                            {product.category || "Furniture"}
                        </span>
                        
                        {/* اسم المنتج */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                            {product.title}
                        </h1>
                        
                        {/* التقييمات وعدد المراجعات */}
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                            <div className="flex text-amber-400">
                                <RenderStars rating={product.rating} />
                            </div>
                            <span className="text-slate-800 ml-1 font-bold">{product.rating || 4}</span>
                            <span className="text-xs text-gray-400">({product.reviewsCount || 100} Reviews)</span>
                        </div>

                        {/* السعر الكبير باللون النبيتي */}
                        <div className="text-2xl lg:text-3xl font-bold text-[#B6332E]">
                            EGP {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                        </div>

                        {/* عرض تنبيه الـ MQO بشكل لطيف تحت السعر لو قيمته أكبر من 1 */}
                        {minOrderQty > 1 && (
                            <span className="text-xs font-semibold bg-red-50 text-[#B6332E] px-3 py-1 rounded-full border border-red-100 w-fit">
                                Minimum Order Quantity (MQO): {minOrderQty} units
                            </span>
                        )}

                        <hr className="border-gray-200/60 my-2" />

                        {/* قسم الوصف الأساسي */}
                        <div className="space-y-2">
                            <h3 className="text-lg lg:text-xl font-bold text-slate-900">What is it ?</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                                {product.description || "Handmade pendant light using recycled glass, perfect for stylish and sustainable interiors."}
                            </p>
                        </div>

                        {/* مميزات المنتج */}
                        <div className="space-y-2 pt-1">
                            <h3 className="text-base lg:text-lg font-bold text-slate-900">Why is it special ?</h3>
                            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                                <li>Eco-friendly</li>
                                <li>Customizable</li>
                                <li>Trendy & Functional</li>
                            </ul>
                        </div>

                        {/* أزرار التحكم والكمية المحلية المضمونة */}
                        <div className="flex flex-wrap items-center gap-3 pt-4 w-full">
                            
                            {/* عداد اختيار الكمية الدائري */}
                            <div className="flex items-center justify-between border border-gray-400 rounded-full px-4 h-11 w-28 bg-transparent">
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        localDecrement();
                                    }} 
                                    className={`text-gray-600 hover:text-slate-900 p-1 flex items-center justify-center select-none ${localQuantity <= minOrderQty ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <Minus size={14} />
                                </button>
                                
                                <span className="font-bold text-sm text-slate-800 select-none min-w-[12px] text-center">
                                    {localQuantity}
                                </span>
                                
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        localIncrement();
                                    }} 
                                    className="text-gray-600 hover:text-slate-900 cursor-pointer p-1 flex items-center justify-center select-none"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                            
                            {/* زر إضافة للسلة */}
                            <button 
                                type="button"
                                onClick={() => addToCart(product, localQuantity)}
                                className="h-11 px-8 bg-[#B6332E] hover:bg-red-700 text-white font-medium rounded-full text-sm transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                            >
                                Add to cart
                            </button>
                            
                            {/* زر الـ RFQ */}
                            <button type="button" className="h-11 px-8 bg-[#B6332E] hover:bg-red-700 text-white font-medium rounded-full text-sm transition-colors cursor-pointer">
                                RFQ
                            </button>
                        </div>
                    </div>
                </div>

                {/* قسم بيانات البائع (Sold By) */}
                <div className="flex items-center justify-start gap-4 mt-12 mb-10 px-2">
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 text-slate-700 flex-shrink-0">
                        <User size={26} />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Sold by</span>
                            <span className="font-bold text-base text-slate-900">{product.brand || "Beit el ezz"}</span>
                            
                            <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-amber-200 flex items-center gap-0.5 ml-1">
                                <Star size={9} className="fill-amber-500 text-amber-500" /> {product.rating || 4} <span className="text-gray-400 font-normal">(78)</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* الأيقونات الأربعة لخدمات المتجر */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-14 max-w-4xl mx-auto">
                    {[
                        { icon: Truck, title: "Fast Shipping" },
                        { icon: DollarSign, title: "Cash on Delivery" },
                        { icon: Award, title: "100% Premium quality" },
                        { icon: ShieldCheck, title: "Payment Protection" }
                    ].map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center p-2">
                                <div className="text-[#B6332E] mb-2.5 transition-transform hover:scale-105">
                                    <IconComponent size={32} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{item.title}</span>
                            </div>
                        );
                    })}
                </div>

                {/* قسم التبديل والمراجعات (Reviews) */}
                <div className="flex justify-center gap-12 sm:gap-16 border-b border-gray-200 pb-px mb-10">
                    {['reviews', 'sample'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-lg md:text-xl font-bold transition-all relative cursor-pointer uppercase ${activeTab === tab ? 'text-slate-900' : 'text-gray-400 hover:text-slate-600'}`}
                        >
                            {tab === 'reviews' ? 'Reviews' : 'Sample Request'}
                            {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#B6332E] rounded-full"></span>}
                        </button>
                    ))}
                </div>

                {activeTab === 'reviews' ? (
                    <ProductReviews />
                ) : (
                    <div className="bg-white p-6 sm:p-12 rounded-3xl shadow-sm text-center text-gray-500 text-sm sm:text-base">
                        Sample Request form for <strong className="text-slate-800">{product.title}</strong> will be displayed here.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;