import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrentUser } from '../hooks/useCurrentUser';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion'; // 👈 استيراد framer-motion

// استيراد المكونات الفرعية
import CheckoutForm from '../components/CheckOutCom/CheckoutForm';
import OrderSummary from '../components/CheckOutCom/OrderSummary';
import SomeoneElseModal from '../components/CheckOutCom/SomeoneElseModal';

const CheckOutPage = () => {
    const navigate = useNavigate();
    const { checkoutSummary, clearCart } = useCart(); 
    const { currentUser, fetchingUser } = useCurrentUser();

    // States الرئيسية
    const [receiver, setReceiver] = useState('me');
    const [deliveryInstruction, setDeliveryInstruction] = useState('call');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [address, setAddress] = useState('');
    
    // Someone else details state
    const [showSomeoneModal, setShowSomeoneModal] = useState(false);
    const [someoneDetails, setSomeoneDetails] = useState({
        name: '',
        phone: '',
        address: ''
    });

    // Success Popup State
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // 1️⃣ عند الضغط على Confirm Order تفتح الـ Popup الكبيرة فقط
    const handleConfirmOrder = () => {
        if (!address.trim()) {
            toast.error('Please add your delivery address first!');
            return;
        }
        setShowSuccessModal(true);
    };

    // 2️⃣ عند الضغط على زرار الـ Popup تروح للهوم
    const handleContinueShopping = () => {
        setShowSuccessModal(false);
        
        navigate('/home'); 

        setTimeout(() => {
            if (clearCart) {
                clearCart(false); 
            }
        }, 100);

        setTimeout(() => {
            toast.success('Order placed successfully!', {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: '#fff',
                    color: '#333',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    zIndex: 999999
                }
            });
        }, 250); 
    };

    return (
        // 👈 تحويل الكونتينر الرئيسي لـ motion.div لدخول انسيابي للصفحة
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full min-h-screen bg-[#F4F6F8] text-slate-900 font-sans pt-20 md:pt-32 pb-16 text-left select-none"
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                <h1 className="text-2xl md:text-3xl font-bold text-[#B6332E] mb-6 md:mb-10 px-1">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Column - Form */}
                    <div className="w-full lg:col-span-8 space-y-8 md:space-y-10 px-1">
                        <CheckoutForm 
                            address={address}
                            setAddress={setAddress}
                            receiver={receiver}
                            setReceiver={setReceiver}
                            someoneDetails={someoneDetails}
                            setShowSomeoneModal={setShowSomeoneModal}
                            deliveryInstruction={deliveryInstruction}
                            setDeliveryInstruction={setDeliveryInstruction}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            fetchingUser={fetchingUser}
                            currentUser={currentUser}
                            onBack={() => navigate(-1)}
                            onConfirm={handleConfirmOrder}
                        />
                    </div>

                    {/* Right Column - Summary */}
                    <div className="w-full lg:col-span-4 lg:sticky lg:top-32 px-1 lg:px-4 mt-4 lg:mt-0">
                        <OrderSummary checkoutSummary={checkoutSummary} />
                    </div>

                </div>
            </div>

            {/* Someone Else Details Modal */}
            <SomeoneElseModal 
                isOpen={showSomeoneModal}
                onClose={() => setShowSomeoneModal(false)}
                someoneDetails={someoneDetails}
                setSomeoneDetails={setSomeoneDetails}
            />

            {/* 👈 استخدام AnimatePresence عشان الـ Exit أنيميشن يشتغل لما الـ Modal تقفل */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        {/* كارد الـ Popup الميرور بحركة مطاطية رايقة عند الفتح وقفل سريع عند الاختفاء */}
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm text-center shadow-2xl space-y-5"
                        >
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100"
                            >
                                <CheckCircle2 size={36} className="text-green-500 fill-green-50" />
                            </motion.div>
                            
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900">Order Placed Successfully!</h3>
                                <p className="text-sm font-medium text-slate-500 px-2">
                                    Thank you for your purchase. Your order has been confirmed and is being processed.
                                </p>
                            </div>

                            <button 
                                type="button"
                                onClick={handleContinueShopping}
                                className="w-full bg-[#B6332E] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-md"
                            >
                                Continue Shopping
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CheckOutPage;