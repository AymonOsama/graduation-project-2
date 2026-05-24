import { useMemo } from 'react';
import { useGlobalProducts } from '../context/ProductContext'; 
import { toast } from 'react-hot-toast'; 

export const useFavorite = (productId = null) => {
    const { favoriteIds = [], favoriteProducts = [], toggleFavorite } = useGlobalProducts();

    const isFavorite = useMemo(() => {
        if (!productId) return false;
        return favoriteIds.includes(productId);
    }, [productId, favoriteIds]);

    const handleToggle = (e) => {
        if (e && typeof e.stopPropagation === 'function') {
            e.stopPropagation(); 
        }

        if (productId) {
            toggleFavorite(productId);

            if (isFavorite) {
                toast.success('Product removed from wishlist successfully', {
                    icon: '🗑️',
                    style: { borderRadius: '12px', background: '#fff', color: '#333', fontSize: '14px' },
                });
            } else {
                toast.success('Product added to wishlist successfully!', {
                    style: { borderRadius: '12px', background: '#fff', color: '#333', fontSize: '14px' },
                });
            }
        }
    };

    return {
        isFavorite,          
        favoriteProducts,    
        favoriteIds, // 🚀 الـسـطـر الـسـحـري الـنـاقـص هـنـا! عشان الـ NavBar يقدر يقرا الـ .length
        toggleFavorite: handleToggle 
    };
};