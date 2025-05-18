import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header';
import Footer from './pages/Footer';
import BuyerHome from './pages/BuyerHome';
import SellerAnalytics from './pages/SellerAnalytics';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EditProductPage from './pages/EditProduct';
import AboutUsPage from './pages/AboutUs';
import AddProductPage from './pages/AddProduct';
import ContactSupportPage from './pages/ContactSupport';
import MessagingPage from './pages/Messaging';
import OnlineStorePage from './pages/OnlineStore';
import SellerProductPage from './pages/SellerProduct';
import SellerProfilePage from './pages/SellerProfile';
import WishlistPage from './pages/WishlistPage';
import PaymentPage from './pages/Payment';
import VerifyEmailPage from './pages/VerifyEmailPage';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SellerGuidelines from './pages/SellerGuidelines';
import SellerSupport from './pages/SellerSupport';
import PaymentConfirmation from './pages/PaymentConfirmation';
import SellerDashboard from './pages/SellerDashboard';
import SellerAllProducts from './pages/SellerAllProducts';
import SellerOrders from './pages/SellerOrders';
import BuyerOrders from './pages/BuyerOrders';
import BuyerProfile from './pages/BuyerProfile';
import SellerInbox from './pages/SellerInbox';
import BuyerInbox from './pages/BuyerInbox';
import CartPage from './pages/CartPage';
import MakeStore from './pages/MakeStore';
import SellerRoute from './components/SellerRoute';
import BuyerLayout from './layouts/BuyerLayout';
import { CartProvider } from './context/CartContext';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Whishlist';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for testing
  const [userRole, setUserRole] = useState('buyer'); // Set to buyer for testing

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <CartProvider>
      <Router>
        <OrderProvider>
          <div className="app d-flex flex-column min-vh-100">
            <Header 
              isAuthenticated={isAuthenticated} 
              userRole={userRole} 
              onLogout={handleLogout} 
            />
            
            <main className="main-content flex-grow-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/contact-support" element={<ContactSupportPage />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/seller/guidelines" element={<SellerGuidelines />} />
                <Route path="/seller/support" element={<SellerSupport />} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                
                {/* Seller Store Setup - This is accessed via SellerRoute */}
                <Route path="/seller/setup-store" element={<MakeStore />} />

                {/* Buyer Routes with Sidebar Layout */}
                <Route element={<BuyerLayout userRole={userRole} isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
                  <Route path="/home" element={<BuyerHome />} />
                  <Route path="/" element={<BuyerHome />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/online-store" element={<OnlineStorePage />} />
                  <Route path="/messaging" element={<MessagingPage />} />
                  <Route path="/buyer/orders" element={<BuyerOrders />} />
                  <Route path="/buyer/inbox" element={<BuyerInbox />} />
                  <Route path="/buyer/profile" element={<BuyerProfile />} />
                  <Route path="/wishlistPage" element={<WishlistPage />} />

                  <Route path="/cart" element={<CartPage />} />
                </Route>

                {/* Protected Seller Routes - Only accessible if seller has set up store */}
                <Route path="/seller/analytics" element={
                  <SellerRoute>
                    <SellerAnalytics />
                  </SellerRoute>
                } />
                <Route path="/seller/product" element={
                  <SellerRoute>
                    <SellerProductPage />
                  </SellerRoute>
                } />
                <Route path="/seller/profile" element={
                  <SellerRoute>
                    <SellerProfilePage />
                  </SellerRoute>
                } />
                <Route path="/seller/add-product" element={
                  <SellerRoute>
                    <AddProductPage />
                  </SellerRoute>
                } />
                <Route path="/seller/edit-product/:id" element={
                  <SellerRoute>
                    <EditProductPage />
                  </SellerRoute>
                } />
                <Route path="/seller/dashboard" element={
                  <SellerRoute>
                    <SellerDashboard />
                  </SellerRoute>
                } />
                <Route path="/seller/all-products" element={
                  <SellerRoute>
                    <SellerAllProducts />
                  </SellerRoute>
                } />
                <Route path="/seller/orders" element={
                  <SellerRoute>
                    <SellerOrders />
                  </SellerRoute>
                } />
                <Route path="/seller/inbox" element={
                  <SellerRoute>
                    <SellerInbox />
                  </SellerRoute>
                } />
              </Routes>
            </main>

            <Footer />
          </div>
        </OrderProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
