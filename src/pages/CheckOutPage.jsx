import React, { useState } from 'react';
import { MapPin, Info, Plus, CheckCircle2, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrentUser } from '../hooks/useCurrentUser';

const CheckOutPage = () => {
    const navigate = useNavigate();
    const { checkoutSummary, clearCart } = useCart(); 
    const { currentUser, fetchingUser } = useCurrentUser();

    // States
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

    // Destructure checkout data safely
    const { 
        orderSubtotal = 0, 
        taxFee = 0, 
        rfqSubtotal = 0, 
        shippingFee = 0, 
        finalTotal = 0 
    } = checkoutSummary || {};

    // Determine displayed user information
    const displayedName = currentUser?.username || currentUser?.name || currentUser?.fullName || currentUser?.email || 'Unknown User';
    const displayedPhone = currentUser?.phone || currentUser?.phoneNumber || currentUser?.mobile || 'No Phone';

    // Handle "Someone else" selection
    const handleSomeoneElseClick = () => {
        setReceiver('someone');
        setShowSomeoneModal(true);
    };

    // Handle Confirm Order
    const handleConfirmOrder = () => {
        // التحقق من وجود العنوان أولاً لحماية الطلب
        if (!address.trim()) {
            alert('Please add your delivery address before confirming the order.');
            return;
        }

        // 🚀 التعديل هنا: مررنا false عشان يمسح الكارت في صمت بدون توست الـ Clear Cart
        if (clearCart) {
            clearCart(false);
        }
        
        // 2. إظهار بوب أب النجاح
        setShowSuccessModal(true);
    };

    // Handle Continue Shopping
    const handleContinueShopping = () => {
        setShowSuccessModal(false);
        navigate('/'); // التوجيه للصفحة الرئيسية
    };

    return (
        <div className="w-full min-h-screen bg-[#F4F6F8] text-slate-900 font-sans pt-20 md:pt-32 pb-16 text-left select-none">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                <h1 className="text-2xl md:text-3xl font-bold text-[#B6332E] mb-6 md:mb-10 px-1">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Column */}
                    <div className="w-full lg:col-span-8 space-y-8 md:space-y-10 px-1">

                        {/* Address section */}
                        <div className="space-y-3">
                            <h2 className="text-lg md:text-xl font-bold text-[#1E293B]">Address <span className="text-[#B6332E]">*</span></h2>
                            <div className="relative flex items-center">
                                <MapPin size={18} className="absolute left-4 text-[#B6332E]" />
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Add your address here (Required)"
                                    className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-2xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none transition-colors shadow-sm ${
                                        !address.trim() ? 'border-amber-300 focus:border-amber-400' : 'border-slate-200 focus:border-slate-300'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Receiver options */}
                        <div className="space-y-3">
                            <h2 className="text-lg md:text-xl font-bold text-[#1E293B]">Who will receive this order?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                {/* Option: Me */}
                                <div
                                    onClick={() => setReceiver('me')}
                                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all bg-white shadow-sm ${
                                        receiver === 'me' ? 'border-[#B6332E]' : 'border-slate-200'
                                    }`}
                                >
                                    <div className="space-y-0.5 min-w-0 pr-2">
                                        <p className="font-bold text-sm text-slate-800 truncate">
                                            {fetchingUser ? 'Loading...' : displayedName}
                                        </p>
                                        <p className="text-xs text-slate-400 font-medium truncate">
                                            {fetchingUser ? 'Please wait...' : displayedPhone}
                                        </p>
                                    </div>
                                    <CheckCircle2
                                        size={18}
                                        className={`transition-colors shrink-0 ${
                                            receiver === 'me' ? 'text-[#B6332E] fill-[#B6332E]/10' : 'text-slate-300'
                                        }`}
                                    />
                                </div>

                                {/* Option: Someone Else */}
                                <div
                                    onClick={handleSomeoneElseClick}
                                    className={`p-4 rounded-2xl border-2 border-dashed flex items-center justify-between cursor-pointer transition-all bg-white hover:bg-slate-50 shadow-sm ${
                                        receiver === 'someone' ? 'border-[#B6332E]' : 'border-slate-300'
                                    }`}
                                >
                                    <div className="space-y-0.5 min-w-0 pr-2">
                                        <span className="font-bold text-sm text-slate-700 block truncate">Add someone else</span>
                                        {someoneDetails.name && (
                                            <p className="text-xs text-slate-400 truncate font-medium">
                                                {someoneDetails.name} ({someoneDetails.phone})
                                            </p>
                                        )}
                                    </div>
                                    <Plus
                                        size={18}
                                        className={`shrink-0 ${receiver === 'someone' ? 'text-[#B6332E]' : 'text-slate-400'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Instructions */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg md:text-xl font-bold text-[#1E293B]">Delivery Instructions</h2>
                                <Info size={15} className="text-[#B6332E] cursor-pointer shrink-0" />
                            </div>

                            <div className="space-y-3.5 pt-1">
                                {[
                                    { id: 'leave', label: '🏠 Leave at my door' },
                                    { id: 'call', label: '📞 Call me before arriving' }
                                ].map((option) => (
                                    <label key={option.id} className="flex items-center gap-3 cursor-pointer select-none">
                                        <input
                                            type="radio"
                                            name="delivery"
                                            checked={deliveryInstruction === option.id}
                                            onChange={() => setDeliveryInstruction(option.id)}
                                            className="w-4 h-4 accent-[#B6332E] cursor-pointer shrink-0"
                                        />
                                        <span className="text-sm font-bold text-slate-700 cursor-pointer">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-3">
                            <h2 className="text-lg md:text-xl font-bold text-[#1E293B]">Pay with</h2>
                            <div className="space-y-3.5 pt-1 max-w-md">
                                
                                <label className="flex items-center justify-between cursor-pointer select-none bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm sm:bg-transparent sm:p-0 sm:border-none sm:shadow-none">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="w-4 h-4 accent-[#B6332E] cursor-pointer shrink-0"
                                        />
                                        <span className="text-sm font-bold text-slate-700 cursor-pointer">Credit / Debit Card</span>
                                    </div>
                                    <div className="flex items-center justify-end shrink-0 pl-2">
                                        <img 
                                            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" 
                                            alt="Mastercard" 
                                            className="h-5 sm:h-6 object-contain opacity-90" 
                                        />
                                    </div>
                                </label>

                                {[
                                    { id: 'instapay', label: 'Insta Pay' },
                                    { id: 'cod', label: 'Cash On Delivery' }
                                ].map((method) => (
                                    <label key={method.id} className="flex items-center gap-3 cursor-pointer select-none bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm sm:bg-transparent sm:p-0 sm:border-none sm:shadow-none">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === method.id}
                                            onChange={() => setPaymentMethod(method.id)}
                                            className="w-4 h-4 accent-[#B6332E] cursor-pointer shrink-0"
                                        />
                                        <span className="text-sm font-bold text-slate-700 cursor-pointer">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-4 sm:pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-8 rounded-full text-sm transition-all border border-slate-300 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <ArrowLeft size={14} /> Back
                            </button>
                            <button 
                                type="button"
                                onClick={handleConfirmOrder}
                                className={`font-bold py-3.5 px-8 rounded-full text-sm transition-all duration-300 cursor-pointer shadow-md sm:min-w-[180px] text-white ${
                                    !address.trim() 
                                    ? 'bg-slate-400 hover:bg-slate-500 cursor-not-allowed opacity-70' 
                                    : 'bg-[#B6332E] hover:bg-red-700'
                                }`}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>

                    {/* Right Column (Summary) */}
                    <div className="w-full lg:col-span-4 lg:sticky lg:top-32 px-1 lg:px-4 mt-4 lg:mt-0">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-4 lg:mb-6 tracking-tight">Payment Summary</h2>
                        <div className="border-t-2 border-[#B6332E] mb-4 lg:mb-6"></div>

                        <div className="space-y-4 text-sm font-medium text-slate-500 bg-white p-5 rounded-2xl shadow-sm lg:bg-transparent lg:p-0 lg:shadow-none">
                            <SummaryRow label="Order" amount={orderSubtotal} />
                            <SummaryRow label="Tax" amount={taxFee} />
                            <SummaryRow label="RFQ" amount={rfqSubtotal} />
                            <SummaryRow label="Shipping Fee" amount={shippingFee} />

                            <div className="border-t border-slate-100 lg:border-t-2 lg:border-[#B6332E] my-3 lg:my-4"></div>

                            <SummaryRow label="Total" amount={finalTotal} isTotal />
                        </div>
                    </div>

                </div>
            </div>

            {/* Popup Modal for adding someone else details */}
            {showSomeoneModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg md:text-xl font-bold text-[#1E293B]">Receiver's Details</h3>
                            <button 
                                type="button"
                                onClick={() => setShowSomeoneModal(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Form Fields */}
                        <div className="space-y-3.5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Full Name</label>
                                <input 
                                    type="text" 
                                    value={someoneDetails.name}
                                    onChange={(e) => setSomeoneDetails({...someoneDetails, name: e.target.value})}
                                    placeholder="Enter full name" 
                                    className="w-full px-4 py-3 bg-[#F1F3F5] border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-300 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Phone Number</label>
                                <input 
                                    type="text" 
                                    value={someoneDetails.phone}
                                    onChange={(e) => setSomeoneDetails({...someoneDetails, phone: e.target.value})}
                                    placeholder="Enter phone number" 
                                    className="w-full px-4 py-3 bg-[#F1F3F5] border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-300 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500">Delivery Address</label>
                                <input 
                                    type="text" 
                                    value={someoneDetails.address}
                                    onChange={(e) => setSomeoneDetails({...someoneDetails, address: e.target.value})}
                                    placeholder="Specific address for this recipient" 
                                    className="w-full px-4 py-3 bg-[#F1F3F5] border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-300 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Modal Action Button */}
                        <button 
                            type="button"
                            onClick={() => setShowSomeoneModal(false)}
                            className="w-full bg-[#B6332E] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-sm mt-2"
                        >
                            Save Details
                        </button>
                    </div>
                </div>
            )}

            {/* Success Popup Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm text-center shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
                            <CheckCircle2 size={36} className="text-green-500 fill-green-50" />
                        </div>
                        
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
                    </div>
                </div>
            )}
        </div>
    );
};

// Summary Row Component
const SummaryRow = ({ label, amount, isTotal = false }) => (
    <div className="flex justify-between items-center">
        <span className={isTotal ? "text-base font-bold text-slate-900" : ""}>{label}</span>
        <span className={`font-bold text-slate-900 ${isTotal ? "text-base" : ""}`}>
            <span className="text-[10px] font-bold text-slate-800 mr-1">EGP</span>
            {amount.toLocaleString()}
        </span>
    </div>
);

export default CheckOutPage;