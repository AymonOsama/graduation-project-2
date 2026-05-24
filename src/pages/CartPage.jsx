import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage = () => {
    const { cartItems, removeFromCart, clearCart, setCheckoutSummary } = useCart(); // ✅ أضفنا setCheckoutSummary هنا
    const navigate = useNavigate();

    // تصنيف المنتجات ديناميكياً
    const regularProducts = cartItems.filter(item => !item.isRfq && !item.isSample);
    const rfqRequests = cartItems.filter(item => item.isRfq);
    const samples = cartItems.filter(item => item.isSample);

    // الحسابات المالية
    const orderSubtotal = regularProducts.reduce((total, item) => total + ((parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 1)), 0);
    const rfqSubtotal = rfqRequests.reduce((total, item) => total + ((parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 1)), 0);
    
    const taxFee = 5000; 
    const shippingFee = cartItems.length > 0 ? 1000 : 0;
    const finalTotal = orderSubtotal + rfqSubtotal + taxFee + shippingFee;

    const handleCheckout = () => {
        // حفظ البيانات في الـ Context قبل التنقل
        if (setCheckoutSummary) {
            setCheckoutSummary({
                orderSubtotal,
                rfqSubtotal,
                taxFee,
                shippingFee,
                finalTotal
            });
        }
        navigate('/checkout');
    };

    // شاشة السلة الفاضية مع تأثير أنيميشن لطيف
    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center"
                >
                    <div className="p-6 bg-white rounded-full shadow-sm mb-6 text-slate-400">
                        <ShoppingBag size={64} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
                    <button 
                        onClick={() => navigate('/services')}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-bold transition-colors cursor-pointer"
                    >
                        Start Shopping
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#F4F6F8] text-slate-900 font-sans pt-24 md:pt-32 pb-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 1. العنوان الرئيسي */}
                <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-3xl font-bold text-[#B6332E] mb-10 text-left px-2"
                >
                    Your Cart
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* 2. الجزء الأيسر (قائمة المنتجات والأقسام) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                        className="w-full lg:col-span-8 space-y-10"
                    >
                        
                        {/* === SECTION 1: PRODUCTS === */}
                        {regularProducts.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 text-left px-2">Products</h2>
                                {regularProducts.map((item) => (
                                    <div key={item.id} className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center justify-between gap-4 shadow-sm relative">
                                        <div className="flex items-center gap-5 text-left">
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover bg-slate-50 rounded-2xl border border-gray-100 flex-shrink-0" />
                                            <div className="space-y-1.5">
                                                <h3 className="font-bold text-base text-slate-900 leading-tight">{item.title}</h3>
                                                <p className="text-xs text-gray-400 font-medium">by {item.brand || "Bosta Lighting"}</p>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <span className="text-[10px] font-bold bg-red-50 text-[#B6332E] px-2.5 py-0.5 rounded-full border border-red-100">
                                                        MQO: {item.mqo || item.quantity || 20}pcs
                                                    </span>
                                                    <span className="text-[10px] font-bold bg-red-50 text-[#B6332E] px-2.5 py-0.5 rounded-full border border-red-100">
                                                        Unit Price: {item.price || 700}EGP
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-3 py-1 rounded-md border border-emerald-100">Available</span>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-600 transition-colors cursor-pointer p-1">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* === SECTION 2: RFQ REQUESTS === */}
                        {rfqRequests.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 text-left px-2">RFQ Requests</h2>
                                {rfqRequests.map((item) => (
                                    <div key={item.id} className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center justify-between gap-4 shadow-sm">
                                        <div className="flex items-center gap-5 text-left">
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover bg-slate-50 rounded-2xl border border-gray-100 flex-shrink-0" />
                                            <div className="space-y-1.5">
                                                <h3 className="font-bold text-base text-slate-900 leading-tight">{item.title}</h3>
                                                <p className="text-xs text-gray-400 font-medium">by {item.brand || "Mobica"}</p>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <span className="text-[10px] font-bold bg-red-50 text-[#B6332E] px-2.5 py-0.5 rounded-full border border-red-100">
                                                        Qty Offered: {item.quantity || 20}pcs
                                                    </span>
                                                    <span className="text-[10px] font-bold bg-red-50 text-[#B6332E] px-2.5 py-0.5 rounded-full border border-red-100">
                                                        Unit Price: {item.price || 700}EGP
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="bg-amber-50 text-amber-600 text-[10px] font-extrabold px-3 py-1 rounded-md border border-amber-100">RFQ</span>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-600 transition-colors cursor-pointer p-1">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* === SECTION 3: SAMPLES === */}
                        {samples.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 text-left px-2">Samples</h2>
                                {samples.map((item) => (
                                    <div key={item.id} className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center justify-between gap-4 shadow-sm">
                                        <div className="flex items-center gap-5 text-left">
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover bg-slate-50 rounded-2xl border border-gray-100 flex-shrink-0" />
                                            <div className="space-y-1.5">
                                                <h3 className="font-bold text-base text-slate-900 leading-tight">{item.title}</h3>
                                                <p className="text-xs text-gray-400 font-medium">by {item.brand || "Wrap & Roll"}</p>
                                                <div className="pt-1 space-y-0.5">
                                                    <span className="text-xs font-bold text-emerald-600 block">Free</span>
                                                    <span className="text-[11px] text-gray-400 block font-medium">Limit: 1 per user</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="bg-blue-50 text-blue-600 text-[10px] font-extrabold px-3 py-1 rounded-md border border-blue-100">Sample</span>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-600 transition-colors cursor-pointer p-1">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button onClick={clearCart} className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer block ml-auto px-4 py-2 hover:bg-red-50 rounded-xl">
                            Clear All Items
                        </button>
                    </motion.div>

                    {/* 3. الجزء الأيمن (Cart Total الفاتورة) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                        className="w-full lg:col-span-4 md:sticky md:top-32 text-left px-2 lg:px-4"
                    >
                        <h2 className="text-2xl font-bold text-[#1E293B] mb-6 tracking-tight">Cart Total</h2>
                        
                        <div className="border-t-2 border-[#B6332E]/30 mb-5"></div>
                        
                        <div className="space-y-4 text-sm font-medium text-slate-500">
                            <div className="flex justify-between items-center">
                                <span>Order</span>
                                <span className="font-bold text-slate-900"><span className="text-xs font-normal text-slate-400 mr-0.5">EGP</span> {orderSubtotal.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span>RFQ Requests</span>
                                <span className="font-bold text-slate-900"><span className="text-xs font-normal text-slate-400 mr-0.5">EGP</span> {rfqSubtotal.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span>Samples</span>
                                <span className="font-bold text-emerald-600">Free</span>
                            </div>
                            
                            <div className="border-t-2 border-[#B6332E] my-4"></div>
                            
                            <div className="flex justify-between items-center">
                                <span>Tax</span>
                                <span className="font-bold text-slate-900"><span className="text-xs font-normal text-slate-400 mr-0.5">EGP</span> {taxFee.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span>Shipping Fee</span>
                                <span className="font-bold text-slate-900"><span className="text-xs font-normal text-slate-400 mr-0.5">EGP</span> {shippingFee.toLocaleString()}</span>
                            </div>
                            
                            <div className="border-t-2 border-[#B6332E] my-4"></div>
                            
                            <div className="flex justify-between items-center pb-8">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <span className="text-xl font-black text-slate-950"><span className="text-xs font-bold text-slate-400 mr-0.5">EGP</span> {finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* أزرار التحكم */}
                        <div className="space-y-4">
                            <motion.button 
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}  // ✅ من غير ()
                                className="w-full bg-[#B6332E] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-full text-sm transition-all duration-300 cursor-pointer text-center shadow-sm block"
                            >
                                Proceed to Checkout
                            </motion.button>
                            <motion.button 
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/services')}
                                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-full text-xs transition-colors cursor-pointer text-center border-2 border-gray-300/80 flex items-center justify-center gap-1.5 shadow-sm"
                            >
                                <ArrowLeft size={14} /> Continue Shopping
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;