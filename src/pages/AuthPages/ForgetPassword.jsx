import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // 🍞 امبورت للـ Toast عشان الرسايل

// 📷 إيمبورت للوجو الأصلي بتاعك
import logo from '../../assets/logo.svg'; 

const ForgetPassword = () => {
    const navigate = useNavigate();
    
    // 🔌 States للتحكم في الداتا والـ Loading
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // تأكيد سريع قبل ما نبعث للداتا بيز
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        try {
            setIsLoading(true); // شغل الـ Loader على الزرار

            // 🔌 [BACKEND INTEGRATION]: هنا هتحط الـ API call بتاعك
            // مثال باستخدام axios:
            // const response = await axios.post('/api/auth/forget-password', { email });
            
            // محاكاة للـ API Check (هنشيل الـ setTimeout ده وقت الربط الفعلي)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            // فرضاً دي النتيجة اللي جاية من السيرفر (لو موجود أو لأ)
            const isEmailExists = true; // غيرها لـ false عشان تجرب الـ Toast

            if (isEmailExists) {
                
                // لو موجود، بنوديه الصفحة التانية بعد ثانية مثلاً عشان يلحق يشوف الـ Toast
                setTimeout(() => {
                    navigate('/verification-code'); // المسار لصفحة الـ OTP أو الـ Check Email
                }, 1200);
            } else {
                // لو مش موجود في الداتا بيز، بنطلع الـ Toast الـ Error
                toast.error('This email does not exist in our system.');
            }

        } catch (error) {
            // التعامل مع أخطاء السيرفر (Network error, 500, etc.)
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false); // قفل الـ Loader في كل الأحوال
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6 font-sans">
            {/* 🍞 حاوية الـ Toasts عشان تظهر في الشاشة */}
            <Toaster position="top-center" reverseOrder={false} />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[440px] text-left space-y-8"
            >
                {/* 1. الشعار */}
                <div className="flex justify-start mb-8">
                    {logo ? (
                        <img src={logo} alt="IndusConnect Logo" className="h-11 object-contain" />
                    ) : (
                        <span className="text-2xl font-bold tracking-tight text-[#1E2229]">IndusConnect</span>
                    )}
                </div>

                {/* 2. عناوين الصفحة */}
                <div className="space-y-2">
                    <h1 className="text-[28px] md:text-[32px] font-bold text-[#1E2229] tracking-tight">
                        Forget Password ?
                    </h1>
                </div>

                {/* Form العناصر */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    {/* 3. حقل الإدخال (Email Input) */}
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // ربط التكست بالـ State
                            disabled={isLoading}
                            className="w-full px-5 py-4.5 bg-[#F9FAFB] border border-gray-300 rounded-[14px] text-slate-900 placeholder:text-gray-400 font-medium outline-none transition-all focus:border-gray-400 focus:bg-white text-left text-base disabled:opacity-60"
                            required
                        />
                    </div>

                    {/* 4. زر إعادة التعيين مع حالة الـ Loading */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#B6332E] hover:bg-[#942723] text-white font-semibold py-3.5 rounded-full shadow-md transition-all active:scale-[0.98] cursor-pointer text-base flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            // شكل Loader أنيق وبسيط بالـ Tailwind وماتش مع الـ Button
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Reset Password'
                        )}
                    </button>

                    {/* 5. روابط التنقل السفلي */}
                    <div className="flex items-center justify-start gap-2 pt-2 text-[15px]">
                        <span className="text-[#1E2229] font-medium">Don't have an account ?</span>
                        <Link 
                            to="/signup" 
                            className="text-[#B6332E] font-semibold hover:underline cursor-pointer"
                        >
                            Sign Up
                        </Link>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default ForgetPassword;