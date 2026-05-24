import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoMailOpenOutline } from "react-icons/io5"; // أيقونة الإيميل
import toast, { Toaster } from 'react-hot-toast';

// 📷 إيمبورت للوجو
import logo from '../../assets/logo.svg'; 

const VerifyOTP = () => {
    const navigate = useNavigate();
    
    // 🔌 States
    const [otp, setOtp] = useState(new Array(6).fill("")); // مصفوفة لـ 6 أرقام
    const [activeInput, setActiveInput] = useState(0);
    const [timer, setTimer] = useState(59);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    // 🕒 منطق التايمر (Count Down)
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // ⌨️ التنقل بين المربعات تلقائياً
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeInput]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1); // ناخد آخر رقم بس

        if (!value) { // لو مسح (Backspace)
            if (activeInput > 0) setActiveInput(activeInput - 1);
        } else { // لو كتب رقم
            if (activeInput < 5) setActiveInput(activeInput + 1);
        }
        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && activeInput > 0) {
            setActiveInput(activeInput - 1);
        }
    };

   // ... الكود السابق كما هو بدون تغيير حتى دالة handleVerify ...

    const handleVerify = async (e) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length < 6) {
            toast.error("Please enter the full 6-digit code");
            return;
        }

        setIsLoading(true);
        // 🔌 [BACKEND INTEGRATION]: ابعت الكود للسيرفر هنا
        console.log("Verifying OTP:", code);
        
        setTimeout(() => {
            setIsLoading(false);
            toast.success("OTP Verified Successfully!");
            
            // 🚀 التعديل هنا: بنقله لصفحة تعيين كلمة المرور الجديدة بعد ثانية واحدة عشان يلحق يشوف الـ Toast الأخضر
            setTimeout(() => {
                navigate('/reset-password'); 
            }, 1000);
        }, 1500);
    };

// ... باقي كود الـ return والـ UI كما هو بدون تغيير ...

    return (
        <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center py-12 px-6 font-sans">
            <Toaster position="top-center" />

            {/* 1. اللوجو والعنوان (خارج الكارد) */}
            <div className="text-center mb-10 space-y-4">
                <img src={logo} alt="IndusConnect" className="h-12 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-[#1E2229]">Reset Your Password</h1>
                <p className="text-[#64748B] text-lg">Enter the OTP sent to your email to reset your password.</p>
            </div>

            {/* 2. الكارد الأبيض (Main Card) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-[650px] rounded-[32px] p-10 md:p-14 shadow-sm border border-gray-100"
            >
                <div className="flex flex-start gap-5 mb-8">
                    {/* أيقونة الإيميل الوردية */}
                    <div className="w-16 h-16 bg-[#FDF2F2] rounded-2xl flex items-center justify-center shrink-0">
                        <IoMailOpenOutline className="text-[#B6332E] text-3xl" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-[#1E2229] mb-1">Verify Your Email</h2>
                        <p className="text-[#64748B] text-[15px]">
                            Enter the 6-digit OTP code we sent to <br />
                            <span className="text-[#1E2229] font-semibold">nourhan19@gmail.com</span>
                        </p>
                    </div>
                </div>

                {/* مربعات الـ OTP */}
                <div className="flex justify-between gap-2 md:gap-4 mb-10">
                    {otp.map((_, index) => (
                        <input
                            key={index}
                            ref={index === activeInput ? inputRef : null}
                            type="number"
                            value={otp[index]}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            // 🔥 [FIX]: هنا أضفت الكلاسات اللي بتطير الأسهم تماماً في المتصفحات
                            className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-bold border border-gray-200 rounded-2xl bg-white focus:border-[#B6332E] focus:ring-1 focus:ring-[#B6332E] outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    ))}
                </div>

                {/* Resend Code & Timer */}
                <div className="text-center mb-10">
                    <p className="text-[#64748B] font-medium">
                        Didn't receive the code ? {' '}
                        <button 
                            type="button" 
                            disabled={timer > 0}
                            className="text-[#B6332E] font-bold hover:underline disabled:opacity-50 cursor-pointer"
                        >
                            Resend code ({timer < 10 ? `00:0${timer}` : `00:${timer}`})
                        </button>
                    </p>
                </div>

                {/* زر التأكيد */}
                <button 
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="cursor-pointer w-full bg-[#B6332E] hover:bg-[#942723] text-white font-bold py-4 rounded-full shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
            </motion.div>
        </div>
    );
};

export default VerifyOTP;