import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });

    // 🚀 إضافة حالة لحفظ ملخص الفاتورة
    const [checkoutSummary, setCheckoutSummary] = useState({
        orderSubtotal: 0,
        rfqSubtotal: 0,
        taxFee: 5000,
        shippingFee: 0,
        finalTotal: 0
    });

    // 🚀 State للتحكم في الـ Toast
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // دالة لإظهار التوست واختفائه تلقائياً
    const showToastNotification = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type });
        }, 2000);
    };

    const addToCart = (product, customQuantity) => {
        const finalQuantity = customQuantity !== undefined ? customQuantity : (product.quantity || 1);

        showToastNotification('Product added to cart', 'success');

        setCartItems((prevItems) => {
            const isExisting = prevItems.find(item => item.id === product.id);
            
            if (isExisting) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + finalQuantity }
                        : item
                );
            }
            const { quantity, ...productWithoutQty } = product;
            return [...prevItems, { ...productWithoutQty, quantity: finalQuantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        showToastNotification('Product removed from cart', 'error');
    };

    // 🛠️ تعديل: إضافة بارامتر للتحكم في ظهور التوست (الافتراضي يظهر)
    const clearCart = (showNotification = true) => {
        setCartItems([]);
        if (showNotification) {
            showToastNotification('Cart cleared', 'success');
        }
    };

    const cartCount = cartItems.reduce((total, item) => total + (Number(item.quantity) || 0), 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            cartCount, 
            toast, 
            checkoutSummary,    // تم إضافة الحالة
            setCheckoutSummary  // تم إضافة دالة التحديث
        }}>
            {children}
            
            <div className={`fixed top-24 right-6 sm:right-8 z-50 transition-all duration-300 transform ${
                toast.show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
            }`}>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/40 bg-white/80 backdrop-blur-xl text-slate-900 text-sm font-bold min-w-[220px] max-w-sm">
                    {toast.type === 'error' ? (
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                    <p className="font-sans tracking-wide leading-none select-none">
                        {toast.message}
                    </p>
                </div>
            </div>
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};