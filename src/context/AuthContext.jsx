import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import usersData from '../data/users.json'; // 👈 تأكد من مسار ملف الـ JSON عندك

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState([]); // 🚀 هنا هنخزن كل المستخدمين
    const [user, setUser] = useState(null);       // المستخدم الحالي اللي مسجل دخول
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // 1️⃣ خطوة جلب كل المستخدمين وحفظهم في الـ State العالمي
        const loadAllUsers = () => {
            try {
                // تأمين قراءة ملف الـ JSON في كل بيئات التطوير
                const actualData = usersData.users ? usersData.users : (usersData.default?.users || usersData);
                setAllUsers(actualData || []);
            } catch (error) {
                console.error("Error loading all users data:", error);
            }
        };

        // 2️⃣ خطوة الشيك على اليوزر المسجل حالياً (عن طريق الـ id المحفوظ)
        const checkLoggedInUser = () => {
            const localUserId = localStorage.getItem("rememberedUser");
            const sessionUserId = sessionStorage.getItem("rememberedUser");
            const savedUserId = localUserId || sessionUserId;

            if (savedUserId) {
                try {
                    // تأمين الصيغة وجلب اليوزر المطابق للـ id من الملف مباشرة
                    const actualData = usersData.users ? usersData.users : (usersData.default?.users || usersData);
                    const found = actualData?.find(u => String(u.id) === String(savedUserId));
                    if (found) {
                        setUser(found);
                    }
                } catch (error) {
                    console.error("Error matching saved user ID:", error);
                    localStorage.removeItem("rememberedUser");
                    sessionStorage.removeItem("rememberedUser");
                }
            }
        };

        loadAllUsers();
        checkLoggedInUser();
        setLoading(false);
    }, []);

    // 🔍 دالة مساعدة ممتازة: تنادي عليها من أي صفحة وتباصي لها الـ ID ترجعلك بيانات اليوزر فوراً
    const getUserById = (id) => {
        return allUsers.find(u => String(u.id) === String(id)) || null;
    };

    const loginGlobal = (userData) => {
        setUser(userData);
    };

    const logoutGlobal = () => {
        try {
            setUser(null); 
            localStorage.removeItem("rememberedUser");
            sessionStorage.removeItem("rememberedUser");

            toast.success('Logged out successfully. See you soon!', {
                duration: 3500,
                position: 'top-right',
                style: {
                    borderRadius: '12px',
                    background: '#ffffff',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: '500'
                },
            });
        } catch (error) {
            console.error("Logout execution error:", error);
            localStorage.removeItem("rememberedUser");
            sessionStorage.removeItem("rememberedUser");
            setUser(null);
        }
    };

    return (
        // 🚀 باصينا هنا الـ allUsers والـ getUserById عشان تستخدمهم براحتك في أي صفحة
        <AuthContext.Provider value={{ user, allUsers, getUserById, loginGlobal, logoutGlobal, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};