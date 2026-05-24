import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // تأكد من مسار الـ AuthContext عندك

export const useCurrentUser = () => {
    const { allUsers } = useAuth(); // بنسحب كل اليوزرز من الـ AuthContext المركزي
    const [currentUser, setCurrentUser] = useState(null);
    const [fetchingUser, setFetchingUser] = useState(true);

    useEffect(() => {
        // 1. بنقرأ الـ id بتاع الشخص اللي عامل Login حالياً من الـ Storages
        const localUserId = localStorage.getItem("rememberedUser");
        const sessionUserId = sessionStorage.getItem("rememberedUser");
        const loggedInId = localUserId || sessionUserId;

        if (loggedInId && allUsers.length > 0) {
            // 2. بنعمل فلتر ونطابق الـ id عشان نجيب بياناته هو بس من وسط كل الناس
            const foundUser = allUsers.find(u => String(u.id) === String(loggedInId));
            setCurrentUser(foundUser || null);
        } else {
            setCurrentUser(null);
        }
        
        setFetchingUser(false);
    }, [allUsers]); // الـ useEffect هتشتغل وتحدث البيانات اتوماتيك لو لستة كل اليوزرز اتغيرت

    // بنرجع أوبجكت اليوزر الحالي، وحالة التحميل بتاعته
    return { currentUser, fetchingUser };
};