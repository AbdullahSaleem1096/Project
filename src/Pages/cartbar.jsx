import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CartItem = ({ image, name, price, index }) => (
  <motion.div
    className="mb-4"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <div className="d-flex align-items-center">
      <img
        src={image}
        alt={name}
        className="me-3 rounded"
        style={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      />
      <div className="flex-grow-1">
        <div className="fw-semibold text-white mb-1">{name}</div>
        <div className="text-danger fw-bold">${price}</div>
        <div className="mt-2 d-flex align-items-center">
          <button className="btn p-0 me-3 text-white">
            <i className="bi bi-dash-square fs-5"></i>
          </button>
          <span className="border rounded px-3 py-1 bg-white text-dark">1</span>
          <button className="btn p-0 ms-3 text-white">
            <i className="bi bi-plus-square fs-5"></i>
          </button>
        </div>
      </div>
      <button className="btn p-0 text-secondary ms-3">
        <i className="bi bi-trash fs-5"></i>
      </button>
    </div>
  </motion.div>
);

const CartBar = () => {
  const item = {
    image: "https://i.imgur.com/QkIa5tT.jpeg",
    name: "Gucci duffle bag",
    price: 960,
  };
  
  // Dynamic viewport height for iOS
  const [viewportHeight, setViewportHeight] = useState('100vh');
  
  useEffect(() => {
    // iPhone-specific height adjustment
    const updateHeight = () => {
      // iPhone 16 Pro has a notch/dynamic island, so we adjust accordingly
      const height = window.innerHeight;
      setViewportHeight(`${height}px`);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    // Handle iOS Safari address bar height changes
    setTimeout(updateHeight, 100);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return (
    <div className="container-fluid p-0 bg-secondary" style={{ height: viewportHeight, overflow: 'hidden' }}>
      <motion.div
        className="text-white w-100 d-flex flex-column"
        style={{
          height: viewportHeight,
          backgroundColor: "#0A0B2E",
          position: "relative",
          overflow: "hidden",
          // iPhone 16 Pro has rounded corners, match that aesthetic
          borderRadius: "0px" 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header - Styled for iPhone notch */}
        <div className="d-flex align-items-center px-4 py-3 border-bottom border-secondary"
             style={{ 
               position: "sticky", 
               top: 0, 
               zIndex: 10, 
               backgroundColor: "#0A0B2E",
               paddingTop: "env(safe-area-inset-top)" // Handle notch space
             }}>
          <button className="btn p-0 me-2 text-white">
            <i className="bi bi-arrow-left fs-5"></i>
          </button>
          <span className="text-primary fw-bold">BACK TO STORE</span>
        </div>

        {/* Cart Title */}
        <div className="px-4 py-3">
          <h4 className="fw-bold mb-0">CART</h4>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="px-4 overflow-auto flex-grow-1" style={{ paddingBottom: "130px" }}>
          <CartItem {...item} index={0} />
          <CartItem {...item} index={1} />
        </div>

        {/* Proceed Button - Fixed above footer, iPhone style */}
        <div 
          className="w-100 px-4 py-3" 
          style={{ 
            position: "absolute", 
            bottom: "76px", // Account for iPhone home indicator
            left: 0, 
            backgroundColor: "#0A0B2E",
            boxShadow: "0 -10px 15px rgba(0,0,0,0.15)",
            zIndex: 5,
            paddingBottom: "env(safe-area-inset-bottom)"
          }}
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="btn w-100 text-white fw-semibold py-3"
            style={{
              background: "linear-gradient(to right, #007bff, #d63384)",
              borderRadius: "0.8rem",
              // iPhone buttons typically have this shadow
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}
          >
            Proceed to Payment
          </motion.button>
        </div>

        {/* Footer - Fixed at bottom with iPhone home indicator space */}
        <div 
          className="w-100"
          style={{ 
            position: "absolute", 
            bottom: 0, 
            left: 0,
            backgroundColor: "#0F42A9",
            zIndex: 10,
            paddingBottom: "env(safe-area-inset-bottom)" // Handle iPhone home indicator
          }}
        >
          <div className="d-flex justify-content-around align-items-center" style={{ height: "76px" }}>
            <button className="btn text-white p-2">
              <i className="bi bi-cart-fill fs-4"></i>
            </button>
            <button className="btn text-white p-2">
              <i className="bi bi-heart fs-4"></i>
            </button>
            <button className="btn text-white p-2">
              <i className="bi bi-arrow-left fs-4"></i>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartBar;