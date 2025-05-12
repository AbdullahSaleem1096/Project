import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import WishlistPage from './pages/Whishlist';
import PaymentPage from './pages/Payment';
import VerifyEmailPage from './pages/VerifyEmailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/edit-product" element={<EditProductPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/contact-support" element={<ContactSupportPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/online-store" element={<OnlineStorePage />} />
        <Route path="/seller-product" element={<SellerProductPage />} />
        <Route path="/seller-profile" element={<SellerProfilePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
