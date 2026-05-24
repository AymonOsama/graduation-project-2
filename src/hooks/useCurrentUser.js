import { useAuth } from '../context/AuthContext.jsx';

export const useCurrentUser = () => {
    // 🚀 بنسحب الـ user والـ loading الحقيقيين والنهائيين من الـ Context علطول
    const { user, loading } = useAuth(); 

    // بنرجعهم بنفس الأسماء القديمة عشان ما تعدلش حاجة في الصفحات التانية
    return { 
        currentUser: user, 
        fetchingUser: loading 
    };
};