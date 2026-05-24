import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation 
} from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast'; 
import './index.css';

// Providers
import { AuthProvider, useAuth } from './context/AuthContext'; 
import { ProductProvider } from './context/ProductContext';
import { CartProvider, useCart } from './context/CartContext';

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

// 1. Auth Protection Layout (صفحات تسجيل الدخول)
const AuthProtectionLayout = () => {
  const { user, loading } = useAuth();

  // لو الـ Context لسه بيشيك على الـ sessionStorage/localStorage استنى هنا
  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-zinc-500">Loading...</div>;

  // لو مسجل دخول بالفعل، ارميه على الهوم
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

// 2. Main Protection Layout (الصفحات المحمية)
const MainProtectionLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname === '/home') {
      const shouldShowToast = localStorage.getItem('showOrderToast');
      
      if (shouldShowToast === 'true') {
        const timer = setTimeout(() => {
          toast.success('Order placed successfully!', {
            duration: 4000,
            position: 'top-center',
            style: {
              background: '#333',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '12px',
            }
          });
          localStorage.removeItem('showOrderToast');
        }, 400);

        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  // انتظر لحد ما الـ Context يقرر هل فيه يوزر متخزن في السيشن ولا لاء
  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-zinc-500">Loading...</div>;

  // لو مش مسجل، ارميه على اللوجين فوراً
  if (!user) {
    return <Navigate to="/login" replace />;
  }

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

// 3. Checkout Protection Layout
const CheckoutProtectionLayout = () => {
  const { cartItems } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return <Outlet />;
};

// Root Dynamic Redirect
const RootRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

// Router Configuration
const router = createBrowserRouter([
  {
    element: <AuthProtectionLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/forget-password', element: <ForgetPassword /> },
      { path: '/verification-code', element: <VerifyOTP /> },
      { path: '/reset-password', element: <ResetPassword /> },
    ],
  },
  {
    element: <MainProtectionLayout />,
    children: [
      {
        path: '/',
        element: <RootRedirect />,
      },
      { path: '/home', element: <Home /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/about-us', element: <AboutUs /> },
      { path: '/contact', element: <ContactUs /> },
      { path: '/product/:id', element: <ProductPage /> },
      { path: '/services', element: <Services /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/favorites', element: <FavoriteProducts /> },
      {
        element: <CheckoutProtectionLayout />,
        children: [
          { path: '/checkout', element: <CheckOutPage /> },
        ],
      },
    ],
  },
]);

// App Entry Point Wrapper
const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);