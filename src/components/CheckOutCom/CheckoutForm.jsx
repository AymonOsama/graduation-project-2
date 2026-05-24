import React from 'react';
import { MapPin, Info, Plus, CheckCircle2, ArrowLeft } from 'lucide-react';

const CheckoutForm = ({
    address, setAddress,
    receiver, setReceiver,
    someoneDetails, setShowSomeoneModal,
    deliveryInstruction, setDeliveryInstruction,
    paymentMethod, setPaymentMethod,
    fetchingUser, currentUser,
    onBack, onConfirm
}) => {

    const displayedName = currentUser?.username || currentUser?.name || currentUser?.fullName || currentUser?.email || 'Unknown User';
    const displayedPhone = currentUser?.phone || currentUser?.phoneNumber || currentUser?.mobile || 'No Phone';

    return (
        <>
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
                        onClick={() => { setReceiver('someone'); setShowSomeoneModal(true); }}
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
                        <Plus size={18} className={`shrink-0 ${receiver === 'someone' ? 'text-[#B6332E]' : 'text-slate-400'}`} />
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
                    onClick={onBack}
                    className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-8 rounded-full text-sm transition-all border border-slate-300 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                    <ArrowLeft size={14} /> Back
                </button>
                <button 
                    type="button"
                    onClick={onConfirm}
                    className={`font-bold py-3.5 px-8 rounded-full text-sm transition-all duration-300 cursor-pointer shadow-md sm:min-w-[180px] text-white ${
                        !address.trim() 
                        ? 'bg-slate-400 hover:bg-slate-500 cursor-not-allowed opacity-70' 
                        : 'bg-[#B6332E] hover:bg-red-700'
                    }`}
                >
                    Confirm Order
                </button>
            </div>
        </>
    );
};

export default CheckoutForm;