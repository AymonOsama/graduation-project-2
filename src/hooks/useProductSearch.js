import { useMemo } from 'react';
// 🚀 استيراد الـ Custom Hook الحقيقية من ملف الـ Context بتاعك
import { useGlobalProducts } from '../context/ProductContext'; 

export const useProductSearch = (searchQuery = '') => {
    // جلب الـ products الأصلية (المتفككة والمجهزة) من الـ Context
    const { products = [] } = useGlobalProducts();

    // محرك الفلترة الذكي باستعمال useMemo لمنع تكرار العمليات الحسابية
    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        
        // لو مفيش كتابة يرجع مصفوفة فاضية فوراً
        if (query === '') return [];

        return products.filter(product => {
            const title = product.title ? String(product.title).toLowerCase() : '';
            const description = product.description ? String(product.description).toLowerCase() : '';
            const category = product.category ? String(product.category).toLowerCase() : '';
            const brand = product.brand ? String(product.brand).toLowerCase() : '';

            return (
                title.includes(query) ||
                description.includes(query) ||
                category.includes(query) ||
                brand.includes(query)
            );
        });
    }, [searchQuery, products]); // يعيد الحساب فقط لو النص اتغير أو الداتا اتحدثت من السيرفر

    return filteredProducts;
};