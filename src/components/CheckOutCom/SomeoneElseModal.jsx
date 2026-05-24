import React from 'react';
import { X } from 'lucide-react';

const SomeoneElseModal = ({ isOpen, onClose, someoneDetails, setSomeoneDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl font-bold text-[#1E293B]">Receiver's Details</h3>
                    <button 
                        type="button"
                        onClick={onClose}
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
                    onClick={onClose}
                    className="w-full bg-[#B6332E] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-sm mt-2"
                >
                    Save Details
                </button>
            </div>
        </div>
    );
};

export default SomeoneElseModal;