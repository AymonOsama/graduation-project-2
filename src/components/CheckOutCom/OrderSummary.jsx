import React from 'react';

const OrderSummary = ({ checkoutSummary }) => {
    const { 
        orderSubtotal = 0, 
        taxFee = 0, 
        rfqSubtotal = 0, 
        shippingFee = 0, 
        finalTotal = 0 
    } = checkoutSummary || {};

    return (
        <>
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
        </>
    );
};

// مكون السطر الصغير بداخل الفاتورة
const SummaryRow = ({ label, amount, isTotal = false }) => (
    <div className="flex justify-between items-center">
        <span className={isTotal ? "text-base font-bold text-slate-900" : ""}>{label}</span>
        <span className={`font-bold text-slate-900 ${isTotal ? "text-base" : ""}`}>
            <span className="text-[10px] font-bold text-slate-800 mr-1">EGP</span>
            {amount.toLocaleString()}
        </span>
    </div>
);

export default OrderSummary;