import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HomeCom/HeroSection';
import StorySection from '../components/HomeCom/StorySection';
import FeaturesSection from '../components/HomeCom/FeaturesSection';
import StatsSection from '../components/HomeCom/StatsSection';
import TestimonialsSection from '../components/HomeCom/TestimonialsSection';
import PartnersSection from '../components/HomeCom/PartnersSection';

const Home = () => {
    return (
        <div className="flex flex-col bg-white font-sans overflow-hidden">
            {/* Hero: السكشن العلوي الرمادي */}
            <HeroSection />

            {/* Our Story: من نحن a*/}
            <StorySection />

            {/* Features: المميزات بالأيقونات */}
            <FeaturesSection />

            {/* Stats: الأرقام والإحصائيات */}
            <StatsSection />

            {/* Testimonials: آراء العملاء */}
            <TestimonialsSection />

            {/* Partners: شركاء النجاح */}
            <PartnersSection />
        </div>
    );
};

export default Home;