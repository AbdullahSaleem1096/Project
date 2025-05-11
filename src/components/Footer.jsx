
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-3 mt-5 rounded">
      <div className="container text-center d-flex justify-content-around">
        <div>
        <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <div>
        <i class="fa-solid fa-heart"></i>
        </div>
        <div>
        <i class="fa-solid fa-arrow-left"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
