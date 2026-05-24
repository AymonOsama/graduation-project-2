import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalProducts } from '../context/ProductContext';

export const useProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { filteredProducts } = useGlobalProducts();
    
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('reviews');
    const [isFavorite, setIsFavorite] = useState(false);

    // البحث عن المنتج
    const product = filteredProducts?.find(p => String(p.id) === String(id));

    // 💡 تعديل الاسم هنا من moq إلى mqo
    useEffect(() => {
        if (product?.mqo) {
            setQuantity(Number(product.mqo));
        }
    }, [product]);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => {
        // 💡 تعديل الاسم هنا كمان لـ mqo
        const minOrder = product?.mqo || 1;
        setQuantity(prev => (prev > minOrder ? prev - 1 : minOrder));
    };

    return {
        product,
        quantity,
        activeTab,
        setActiveTab,
        isFavorite,
        setIsFavorite,
        handleIncrement,
        handleDecrement,
        navigate
    };
};