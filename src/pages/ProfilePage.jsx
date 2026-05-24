import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Edit2, Check, Camera, 
  Zap, MapPin, Settings, Globe, Hexagon, Sparkles, Lock, Shield
} from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser';

const ProfilePage = () => {
    const { currentUser, fetchingUser } = useCurrentUser();
    const [isEditing, setIsEditing] = useState(false);
    
    // State محلي محدث للحقول الجديدة
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '••••••••', // قيمة افتراضية مشفرة للعرض فقط
        role: 'Standard User',
        isAdmin: false,
        isPlus: false,
    });

    // تحديث الـ State بمجرد وصول بيانات اليوزر
    useEffect(() => {
        if (currentUser) {
            setProfile({
                name: currentUser.fullName || currentUser.username || 'User',
                email: currentUser.email || '',
                password: '••••••••', 
                role: currentUser.isAdmin ? 'Verified Admin' : 'Standard User',
                isAdmin: currentUser.isAdmin || false,
                isPlus: currentUser.isPlus || false,
            });
        }
    }, [currentUser]);

    // دالة ذكية لاستخراج أول حرف من أول اسم وثاني اسم (Initials) ديناميكياً
    const getInitials = (fullName) => {
        if (!fullName) return 'U';
        const parts = fullName.trim().split(/[\s_]+/); // التقسيم بناءً على المسافات أو الـ Underscore
        const firstLetter = parts[0] ? parts[0].charAt(0).toUpperCase() : '';
        const secondLetter = parts[1] ? parts[1].charAt(0).toUpperCase() : '';
        return firstLetter + secondLetter || firstLetter;
    };

    // تعريف الحقول الجديدة بعد التعديل
    const fields = [
        { id: 'name', label: 'Full Name', icon: User, delay: 0.1, full: true },
        { id: 'email', label: 'Email Address', icon: Mail, delay: 0.2, full: true },
        { id: 'password', label: 'Password', icon: Lock, delay: 0.3, type: 'password' },
        { id: 'role', label: 'Account Role', icon: Shield, delay: 0.4, disabledAlways: true }, 
    ];

    if (fetchingUser) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
                <div className="animate-pulse text-slate-400 font-bold tracking-widest text-xs md:text-sm uppercase text-center">
                    Loading Secure Profile...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-12 md:pb-20 font-sans relative overflow-hidden">
            
            {/* --- Background Decorative Elements --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-50 blur-[80px] md:blur-[120px] rounded-full opacity-60" />
                <div className="absolute bottom-[10%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-50 blur-[70px] md:blur-[100px] rounded-full opacity-50" />
                <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pt-8 md:pt-12">
                
                {/* --- Top Action Bar --- */}
                <div className="flex justify-end mb-6 md:mb-8">
                    <motion.button 
                        whileHover={{ rotate: 15 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 md:p-3 bg-white shadow-sm border border-slate-200 rounded-xl md:rounded-2xl text-slate-400 hover:text-red-600 transition-colors"
                    >
                        <Settings size={20} />
                    </motion.button>
                </div>

                {/* --- Hero Section --- */}
                <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm mb-6 md:mb-10 relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
                        
                        {/* Dynamic Initials Avatar Column */}
                        <div className="flex justify-center relative flex-shrink-0">
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-36 h-36 md:w-48 md:h-48 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-4xl md:text-6xl font-black text-white shadow-xl border border-slate-800 relative z-10 select-none tracking-wider"
                            >
                                {getInitials(profile.name)}
                            </motion.div>
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2.5 md:p-3 bg-slate-900 text-white rounded-xl md:rounded-2xl shadow-lg z-20 border-2 md:border-4 border-white"
                            >
                                <Camera size={16} />
                            </motion.button>
                        </div>

                        {/* Info Column */}
                        <div className="flex-1 text-center lg:text-left w-full min-w-0">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3 md:mb-4">
                                {profile.isPlus && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-lg border border-red-100">
                                        <Zap size={11} fill="currentColor" /> Plus Member
                                    </span>
                                )}
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-200">
                                    {profile.role}
                                </span>
                            </div>
                            
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight break-words">
                                {profile.name}
                            </h1>
                            
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 text-slate-500 mb-6 md:mb-8 text-xs md:text-sm font-medium">
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    <span>Cairo, Egypt</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
                                <div className="flex items-center gap-1">
                                    <Globe size={14} />
                                    <span className="truncate max-w-[180px] sm:max-w-none">indusconnect.com</span>
                                </div>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-lg transition-all text-sm md:text-base ${
                                        isEditing 
                                        ? 'bg-green-600 text-white shadow-green-100' 
                                        : 'bg-red-600 text-white shadow-red-100'
                                    }`}
                                >
                                    {isEditing ? <><Check size={18}/> Save Changes</> : <><Edit2 size={16}/> Edit Profile</>}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Fields Bento Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {fields.map((field) => (
                        <motion.div
                            key={field.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: field.delay }}
                            className={`${field.full ? "col-span-1 sm:col-span-2 md:col-span-4" : "col-span-1 sm:col-span-2"} bg-white border border-slate-200/60 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-7 group hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300`}
                        >
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    {field.label}
                                </label>
                                <div className={`p-2 rounded-lg md:rounded-xl transition-colors ${isEditing && !field.disabledAlways ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                                    <field.icon size={15} />
                                </div>
                            </div>
                            
                            <input 
                                type={field.type || 'text'}
                                disabled={field.disabledAlways ? true : !isEditing}
                                value={profile[field.id]}
                                onChange={(e) => setProfile({...profile, [field.id]: e.target.value})}
                                className={`w-full bg-transparent text-lg md:text-xl font-bold outline-none transition-all ${
                                    field.disabledAlways 
                                    ? 'text-slate-400 cursor-not-allowed' 
                                    : isEditing ? 'text-red-600 border-b-2 border-red-100 pb-1' : 'text-slate-700'
                                }`}
                                placeholder={`Enter ${field.label}...`}
                            />
                        </motion.div>
                    ))}

                    {/* Industrial Stats Card */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-1 sm:col-span-2 md:col-span-4 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Hexagon size={140} className="text-white lg:w-[180px] lg:h-[180px]" />
                        </div>

                        <div className="relative z-10 min-w-0">
                            <div className="flex items-center gap-2.5 text-red-500 mb-2">
                                <Sparkles size={16} />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Special Status</span>
                            </div>
                            <h3 className="text-xl md:text-3xl font-bold text-white mb-2 tracking-tight">Premium Infrastructure Access</h3>
                            <p className="text-slate-400 text-xs md:text-sm max-w-xl">Your account has full priority in the IndusConnect node network.</p>
                        </div>

                        <button className="w-full lg:w-auto relative z-10 bg-white text-slate-900 px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl text-sm md:text-base whitespace-nowrap">
                            Upgrade Node
                        </button>
                    </motion.div>
                </div>

                {/* --- Footer --- */}
                <div className="mt-12 md:mt-16 text-center px-4">
                    <p className="text-[8px] md:text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] md:tracking-[0.5em] leading-relaxed">
                        Secured by IndusConnect Protocol v4.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;