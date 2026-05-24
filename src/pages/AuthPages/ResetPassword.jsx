import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { IoLockOpenOutline } from "react-icons/io5"; // أيقونة القفل
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
    const navigate = useNavigate();

    // 🔌 States
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [strength, setStrength] = useState({ label: 'Weak', score: 1, color: 'bg-red-500', textColor: 'text-red-500' });

    // 🔒 دالة فحص قوة كلمة المرور وتحديث المؤشر تلقائياً
    const checkPasswordStrength = (value) => {
        setPassword(value);
        if (!value) {
            setStrength({ label: 'Weak', score: 1, color: 'bg-gray-200', textColor: 'text-gray-400' });
            return;
        }

        let score = 0;
        if (value.length >= 6) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        if (score <= 1) {
            setStrength({ label: 'Weak', score: 1, color: 'bg-[#B6332E]', textColor: 'text-[#B6332E]' });
        } else if (score === 2) {
            setStrength({ label: 'Fair', score: 3, color: 'bg-orange-400', textColor: 'text-orange-400' });
        } else {
            setStrength({ label: 'Strong', score: 5, color: 'bg-green-500', textColor: 'text-green-500' });
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        // 🔌 [BACKEND INTEGRATION]: هنا بتبعت الباسورد الجديد للـ API بتاعك
        console.log("Updating password to:", password);

        setTimeout(() => {
            setIsLoading(false);
            toast.success("Password Updated Successfully!");
            
            // سحب المستخدم لصفحة الـ Login بعد النجاح
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center py-12 px-6 font-sans">
            <Toaster position="top-center" />

            {/* الكارد الأبيض الرئيسي (Main Card) بنفس أبعاد صفحة الـ OTP تماماً */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-[650px] rounded-[32px] p-10 md:p-14 shadow-sm border border-gray-100"
            >
                {/* الهيدر: الأيقونة الوردية، العنوان، والوصف الجانبي */}
                <div className="flex flex-start gap-5 mb-8">
                    <div className="w-16 h-16 bg-[#FDF2F2] rounded-2xl flex items-center justify-center shrink-0">
                        <IoLockOpenOutline className="text-[#B6332E] text-3xl" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-[#1E2229] mb-1">Create New Password</h2>
                        <p className="text-[#64748B] text-[15px]">
                            Your new password must be different from previous used passwords.
                        </p>
                    </div>
                </div>

                {/* Form العناصر */}
                <form onSubmit={handleUpdatePassword} className="space-y-6 text-left">
                    
                    {/* حقل الباسورد الأول */}
                    <div className="space-y-2">
                        <label className="block text-[#1E2229] font-bold text-base">New Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => checkPasswordStrength(e.target.value)}
                            className="w-full px-5 py-4.5 bg-[#F9FAFB] border border-gray-200 rounded-[14px] text-slate-900 placeholder:text-gray-400 font-medium outline-none transition-all focus:border-gray-400 focus:bg-white text-base"
                        />
                    </div>

                    {/* 📊 مؤشر قوة كلمة المرور (Password Strength Meter) الـ 5 شرط */}
                    <div className="space-y-2">
                        <div className="flex gap-1.5 max-w-[140px]">
                            {[...Array(5)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`h-[4px] flex-1 rounded-full transition-all duration-300 ${
                                        i < strength.score ? strength.color : 'bg-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-[13px] font-medium text-gray-500">
                            Password strength: <span className={`font-bold ${strength.textColor}`}>{strength.label}</span>
                        </p>
                    </div>

                    {/* حقل تأكيد الباسورد */}
                    <div className="space-y-2 pt-2">
                        <label className="block text-[#1E2229] font-bold text-base">Confirm New Password</label>
                        <input 
                            type="password" 
                            placeholder="Re-enter new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-5 py-4.5 bg-[#F9FAFB] border border-gray-200 rounded-[14px] text-slate-900 placeholder:text-gray-400 font-medium outline-none transition-all focus:border-gray-400 focus:bg-white text-base"
                        />
                    </div>

                    {/* زر التحديث */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full bg-[#B6332E] hover:bg-[#942723] text-white font-bold py-4 rounded-full shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 mt-4 text-base"
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>

                    {/* رابط العودة للـ Login السفلي */}
                    <div className="flex items-center justify-center gap-2 pt-4 text-[15px]">
                        <span className="text-[#64748B] font-medium">Remember your password ?</span>
                        <Link 
                            to="/login" 
                            className="text-[#B6332E] font-bold hover:underline cursor-pointer"
                        >
                            Back to login
                        </Link>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;