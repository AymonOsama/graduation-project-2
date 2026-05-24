import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// استيراد الأيقونات المحدثة من React Icons (أبيض وأسود)
import { IoEyeOutline, IoEyeOffOutline, IoLogoGoogle, IoLogoFacebook } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

// صورة تجريدية صناعية/تكنولوجية راقية بالأبيض والأسود (غير محددة لشخص)
const loginWallpaper = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('Supplier');
    const [agreed, setAgreed] = useState(false); // الـ State الخاصة بالموافقة على الشروط

    return (
        <div className="min-h-screen bg-white flex items-center justify-center font-sans relative overflow-hidden">
            
            {/* تأثير خلفية خفيف لكسر حدة الأبيض */}
            <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

            <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 items-center relative z-10">
                
                {/* القسم الأيسر: النموذج */}
                <div className="space-y-10 order-2 lg:order-1">
                    {/* الشعار */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#C53030] rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white rounded-md rotate-45 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-slate-900">IndusConnect</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Create an account</h1>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            {/* اسم المستخدم */}
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Username"
                                    className="w-full px-6 py-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                />
                            </div>

                            {/* البريد الإلكتروني */}
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    className="w-full px-6 py-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                />
                            </div>

                            {/* كلمة المرور */}
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password"
                                    className="w-full px-6 py-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl cursor-pointer"
                                >
                                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                </button>
                            </div>
                        </div>

                        {/* اختيار الدور */}
                        <div className="flex gap-8 py-2">
                            <label className="flex items-center gap-3 cursor-pointer group select-none">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        checked={role === 'Supplier'} 
                                        onChange={() => setRole('Supplier')}
                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-slate-900 transition-all cursor-pointer"
                                    />
                                    <div className="absolute w-2.5 h-2.5 bg-slate-900 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                                </div>
                                <span className="font-bold text-slate-900">Supplier</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group select-none">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        checked={role === 'Buyer'} 
                                        onChange={() => setRole('Buyer')}
                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-slate-900 transition-all cursor-pointer"
                                    />
                                    <div className="absolute w-2.5 h-2.5 bg-slate-900 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                                </div>
                                <span className="font-bold text-slate-900">Buyer</span>
                            </label>
                        </div>

                        {/* الترتيب الجديد: الـ Checkbox أولاً ثم زر التسجيل */}
                        <div className="space-y-4 pt-2">
                            {/* خانة الموافقة على الشروط وسياسة الخصوصية (أصبحت في الأعلى) */}
                            <div className="flex items-start px-2">
                                <label className="flex items-center gap-3 cursor-pointer select-none group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input 
                                            type="checkbox" 
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-slate-900 checked:border-slate-900 transition-all cursor-pointer"
                                        />
                                        <svg 
                                            className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-slate-600">
                                        I agree to the{' '}
                                        <Link to="/terms" className="text-slate-900 font-bold hover:underline">Terms of Service</Link>
                                        {' '}and{' '}
                                        <Link to="/privacy" className="text-slate-900 font-bold hover:underline">Privacy Policy</Link>
                                    </span>
                                </label>
                            </div>

                            {/* زر التسجيل */}
                            <button 
                                disabled={!agreed}
                                className={`w-full text-white py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-zinc-100 block text-center ${
                                    agreed 
                                    ? 'bg-red-800 hover:bg-red-900 cursor-pointer shadow-red-100' 
                                    : 'bg-slate-300 opacity-60 cursor-not-allowed shadow-none'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* التسجيل عبر التواصل الاجتماعي */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                            <div className="relative flex justify-center text-sm uppercase"><span className="bg-white px-4 text-slate-500 font-bold">or continue with</span></div>
                        </div>

                        {/* أيقونات أبيض وأسود فقط */}
                        <div className="flex justify-center gap-6">
                            <button type="button" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-2xl text-slate-900 cursor-pointer">
                                <IoLogoGoogle />
                            </button>
                            <button type="button" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-2xl text-slate-900 cursor-pointer">
                                <FaGithub />
                            </button>
                            <button type="button" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-2xl text-slate-900 cursor-pointer">
                                <IoLogoFacebook />
                            </button>
                        </div>

                        <p className="text-center font-medium text-slate-600">
                            Already have an account? <Link to="/login" className="text-slate-900 font-bold hover:underline">Login</Link>
                        </p>
                    </form>
                </div>

                {/* القسم الأيمن: الصورة التجريدية */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:block order-1 lg:order-2 h-full min-h-[600px] relative"
                >
                    <div 
                        className="absolute inset-0 rounded-[3rem] bg-cover bg-center shadow-2xl"
                        style={{ backgroundImage: `url(${loginWallpaper})` }}
                    >
                        {/* Overlay خفيف ليتناسب مع الستايل النظيف */}
                        <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] rounded-[3rem]"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;