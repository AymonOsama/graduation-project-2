import React from 'react';
import { Star } from 'lucide-react';

export const RenderStars = ({ rating = 4 }) => {
    const stars = [];

    // 1️⃣ الحالات الخاصة: تقييم ممتاز جداً (خمس نجوم كاملة)
    if (rating >= 4.7) {
        for (let i = 1; i <= 5; i++) {
            stars.push(<Star key={`full-5-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />);
        }
        return <div className="flex items-center gap-0.5">{stars}</div>;
    }

    // 2️⃣ الحالات الخاصة: تقييم ضعيف جداً (نجمة واحدة وأربعة فاضيين)
    if (rating < 1.5) {
        stars.push(<Star key="full-1" size={16} className="text-yellow-400 fill-yellow-400" />);
        for (let i = 1; i <= 4; i++) {
            stars.push(<Star key={`empty-1-${i}`} size={16} className="text-slate-200" />);
        }
        return <div className="flex items-center gap-0.5">{stars}</div>;
    }

    // 3️⃣ الحسابات الطبيعية لباقي التقييمات المتوسطة
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;

    // رسم النجوم الكاملة الصفراء
    for (let i = 1; i <= fullStars; i++) {
        stars.push(<Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />);
    }

    // 🌟 منطق الـ كسر المتعدل ليطابق النصف نجمة بالظبط وبشكل احترافي
    if (decimalPart >= 0.3 && decimalPart <= 0.8) {
        // تأثير نصف نجمة حقيقي: حدود صفراء وتعبئة للنصف فقط باستخدام تدرج SVG مدمج في Lucide
        stars.push(
            <div key="half" className="relative inline-block">
                {/* النجمة الخلفية الفارغة الرمادية */}
                <Star size={16} className="text-slate-200" />
                {/* النجمة الأمامية المقصوصة للنصف ومصنوعة بلون التعبئة الأصفر */}
                <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 max-w-none" />
                </div>
            </div>
        );
    } else if (decimalPart > 0.8) {
        // كسر عالي جداً يجبر لنجمة كاملة
        stars.push(<Star key="half-full" size={16} className="text-yellow-400 fill-yellow-400" />);
    }

    // 4️⃣ تكملة باقي الـ 5 نجوم بنجوم فارغة رمادية
    while (stars.length < 5) {
        stars.push(<Star key={`empty-${stars.length}`} size={16} className="text-slate-200" />);
    }

    // إرجاع العناصر مغلفة في div منسق بـ Tailwind
    return <div className="flex items-center gap-0.5">{stars}</div>;
};