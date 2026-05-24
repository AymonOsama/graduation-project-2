import React from 'react';
import { Heart } from 'lucide-react';

const ProductGallery = ({ image, title, isFavorite, setIsFavorite }) => (
    <div className="relative w-full aspect-square bg-[#EAEAEA] rounded-3xl overflow-hidden group">
        <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-5 right-5 p-3 bg-white rounded-full shadow-md text-slate-700 hover:scale-105 transition-all cursor-pointer"
        >
            <Heart size={22} className={isFavorite ? "text-red-500 fill-red-500" : "text-slate-700"} />
        </button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
            <span className="w-2 h-2 rounded-full bg-white/60"></span>
            <span className="w-2 h-2 rounded-full bg-white/60"></span>
        </div>
    </div>
);

export default ProductGallery;