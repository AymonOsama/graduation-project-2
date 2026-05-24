import React from 'react';
import { ChevronDown, Star } from 'lucide-react';

const ProductReviews = () => {
    // تقييمات العملاء الافتراضية تم نقلها هنا لتخفيف الضغط عن الصفحة الرئيسية
    const reviews = [
        { id: 1, name: "Laila Hassan", rating: 4, comment: "Excellent quality, exactly as described.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" },
        { id: 2, name: "Nour Yehia", rating: 5, comment: "Durable and perfect for our projects.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" },
        { id: 3, name: "Zain Adam", rating: 5, comment: "Meet all our specifications, highly recommended.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" }
    ];

    return (
        <div className="bg-white p-5 sm:p-10 lg:p-12 rounded-3xl shadow-sm text-left">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-md lg:text-lg font-bold text-[#B6332E]">Review List</h3>
                <button className="flex items-center gap-1.5 border border-gray-200 text-xs text-gray-600 font-medium px-3 py-1.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                    Sort By : Newest <ChevronDown size={14} />
                </button>
            </div>
            <div className="divide-y divide-gray-100 space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="flex gap-4 pt-6 first:pt-0">
                        <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-gray-100 flex-shrink-0" />
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mb-1.5">
                                <h4 className="font-bold text-sm lg:text-base text-slate-900">{review.name}</h4>
                                <div className="flex items-center sm:ml-2">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star 
                                            key={idx} 
                                            size={12} 
                                            className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm lg:text-base">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;