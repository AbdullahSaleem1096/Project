import React from 'react';
import './EditProduct.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function EditProduct() {
  return (
    <div className="signup-container">
      <div className="signup-box">

        {/* Properly placed top header */}
        <div className="support-header">
          <i className="bi bi-arrow-left-short"></i>
          Edit Product
        </div>

        {/* Contact Form */}
        <div className="form-card">
          <h4>Edit Product</h4>

          <form>
            <div className="mb-3 text-start">
              <label className="form-label">Enter Product Name</label>
              <input type="text" className="form-control" placeholder="Name" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Enter Product Price</label>
              <input type="email" className="form-control" placeholder="250" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Enter Category</label>
              <input type="tel" className="form-control" placeholder="Sports" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Avalibility in Stock</label>
              <input type="text" className="form-control" placeholder="46" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Enter Product Description</label>
              <textarea className="form-control" rows="5" placeholder="Type your message here..."></textarea>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Upload Product Image</label>
              <input type="file" className="form-control" accept="image/*" />
            </div>

            <button type="submit" className="btn btn-gradient w-100">Add Product</button>
              </form>
        </div>


      </div>
    </div>
  );
}

export default EditProduct;
