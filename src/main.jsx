import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import './index.css';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

// Pages
import Login from './pages/AuthPages/Login';
import Signup from './pages/AuthPages/Signup';
import ForgetPassword from './pages/AuthPages/ForgetPassword';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import VerifyOTP from './pages/AuthPages/VerifyOTP';
import ResetPassword from './pages/AuthPages/ResetPassword';
import Services from './pages/Services';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import FavoriteProducts from './pages/FavoriteProducts';
import CheckOutPage from './pages/CheckOutPage';

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

/**
 * 1️⃣ Main Layout (للصفحات اللي فيها NavBar و Footer)
 */
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * 2️⃣ Auth Layout (مخصص فقط لصفحات الـ Auth)
 */
const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

// --- التحقق من تسجيل الدخول ---
const getAuthUser = () =>
  localStorage.getItem('rememberedUser') ||
  sessionStorage.getItem('rememberedUser');

// --- الصفحات المحمية (تطلب تسجيل دخول) ---
const ProtectedRoute = ({ children }) => {
  const isAuth = getAuthUser();
  return isAuth ? children : <Navigate to="/login" replace />;
};

// --- صفحات الـ Auth العامة (تمنع دخول المسجلين) ---
const PublicRoute = ({ children }) => {
  const isAuth = getAuthUser();
  return isAuth ? <Navigate to="/home" replace /> : children;
};

// --- Router configuration ---
const router = createBrowserRouter([
  // 🔑 تفرع صفحات الـ Auth
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <PublicRoute><Login /></PublicRoute>,
      },
      {
        path: '/signup',
        element: <PublicRoute><Signup /></PublicRoute>,
      },
      {
        path: '/forget-password',
        element: <PublicRoute><ForgetPassword /></PublicRoute>,
      },
      {
        path: '/verification-code',
        element: <PublicRoute><VerifyOTP /></PublicRoute>,
      },
      {
        path: '/reset-password',
        element: <PublicRoute><ResetPassword /></PublicRoute>,
      },
    ],
  },

  // 🏠 تفرع الصفحات العادية والرئيسية (تستخدم الـ MainLayout)
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: getAuthUser()
          ? <Navigate to="/home" replace />
          : <Navigate to="/login" replace />,
      },
      {
        path: '/home',
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: '/profile',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      // 💡 التعديل هنا: جعل المسار يستقبل الـ id ديناميكياً وبحروف صغيرة ناصعة
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
      {
        path: '/services',
        element: <Services />, 
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckOutPage />,
      },
      {
        path: '/favorites',
        element: <FavoriteProducts />,
      }
    ],
  },
]);

// --- Render App ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider> 
        <CartProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);