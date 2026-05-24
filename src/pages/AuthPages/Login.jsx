import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import usersData from '../../data/users.json'; 
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { loginGlobal } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); 
    const [formData, setFormData] = useState({ username: "", password: "" });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle login submission
    const onclickLogin = (e) => {
        e.preventDefault();

        // تأمين قراءة الملف ليعمل بشكل سليم في جميع بيئات التطوير
        const actualData = usersData.users ? usersData : (usersData.default || usersData);

        // البحث المرن: يدعم الدخول بـ اسم المستخدم أو البريد الإلكتروني
        const foundUser = actualData.users?.find(
            (user) => (user.username === formData.username || user.email === formData.username) && user.password === formData.password
        );

        if (foundUser) {
            toast.success(`Welcome back, ${foundUser.username}! You're logged in.`);
            
            // تحديث الـ Context العالمي للتطبيق بأوبجكت المستخدم كامل
            loginGlobal(foundUser);

            // 🚀 التعديل هنا: تخزين الـ id فقط كـ String بدلاً من أوبجكت المستخدم كامل
            if (rememberMe) {
                localStorage.setItem("rememberedUser", String(foundUser.id));
                sessionStorage.removeItem("rememberedUser"); 
            } else {
                sessionStorage.setItem("rememberedUser", String(foundUser.id));
                localStorage.removeItem("rememberedUser"); 
            }

            setTimeout(() => {
                navigate("/home");
            }, 500);
        } else {
            toast.error("Invalid username or password, try again!");
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-10 font-sans selection:bg-black selection:text-white">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
                {/* Left side: Login form */}
                <div className="flex flex-col px-4 md:px-16">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 mb-12 cursor-pointer"
                    >
                        <img 
                            src="/logo.svg" 
                            alt="IndusConnect" 
                            className="w-55 h-15 object-contain" 
                        />
                    </motion.div>

                    <h2 className="text-4xl font-bold text-black mb-12 tracking-tight">Welcome back!</h2>

                    <form onSubmit={onclickLogin} className="space-y-5">
                        {/* Username input */}
                        <div className="relative">
                            <input
                                name="username"
                                type="text"
                                placeholder="Username or Email"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-6 py-4 rounded-2xl border-2 border-zinc-200 bg-white focus:border-black focus:ring-4 focus:ring-zinc-100 outline-none transition-all text-black font-medium"
                                required
                            />
                        </div>

                        {/* Password input */}
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-6 py-4 rounded-2xl border-2 border-zinc-200 bg-white focus:border-black focus:ring-4 focus:ring-zinc-100 outline-none transition-all text-black font-medium"
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition-colors cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Remember me & Forgot password link */}
                        <div className="flex justify-between items-center">
                            <div>
                                <label className="flex items-center cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-black border-2 border-zinc-200 bg-white focus:ring-black rounded transition-colors cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm font-medium text-zinc-900">Remember me</span>
                                </label>
                            </div>
                            <Link to="/forget-password" className="text-sm font-bold text-zinc-900 hover:underline">
                                Forget password ?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-red-800 text-white py-3 rounded-full font-bold text-lg hover:bg-red-900 transition-all shadow-lg shadow-zinc-200 cursor-pointer mt-6"                                    >
                            Login
                        </motion.button>
                    </form>

                    {/* Signup redirect */}
                    <div className="text-center mt-8">
                        <Link to="/signup" className="text-sm font-bold text-zinc-900 hover:underline">
                            Don't have an account? Sign Up
                        </Link>
                    </div>

                    {/* Social media login section */}
                    <div className="mt-12">
                        <div className="relative flex items-center mb-8">
                            <div className="grow border-t-2 border-zinc-100"></div>
                            <span className="px-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">or continue with</span>
                            <div className="grow border-t-2 border-zinc-100"></div>
                        </div>

                        <div className="flex justify-center gap-16">
                            {[
                                { icon: <FaGoogle size={20} />, label: "Google" },
                                { icon: <FaApple size={22} />, label: "Apple" },
                                { icon: <FaFacebookF size={18} />, label: "Facebook" }
                            ].map((social, index) => (
                                <motion.button 
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button" 
                                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transition-transform shadow-md hover:bg-zinc-800 cursor-pointer"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side: Decorative image section */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="hidden md:block h-[600px]"
                >
                    <div className="w-full h-full bg-zinc-100 rounded-[4rem] border-2 border-zinc-50 flex items-center justify-center relative overflow-hidden">
                        <div className="text-zinc-300">
                             <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                             </svg>
                        </div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-tl-[3.5rem]"></div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;