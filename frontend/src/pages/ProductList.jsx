import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { productAPI } from '../services/api';
import { Spinner, Alert, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all products
      const response = await productAPI.getAllProducts();
      const allProducts = response.products || [];
      setProducts(allProducts);
      setFilteredProducts(allProducts);

      // Set best sellers (products with most views)
      const sorted = [...allProducts].sort((a, b) => (b.views || 0) - (a.views || 0));
      setBestSellers(sorted.slice(0, 4)); // Get top 4 viewed products
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid bg-black text-white p-4 min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid bg-black text-white p-4 min-vh-100">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-black text-white p-4 min-vh-100">
      <div className="mb-4">
        <InputGroup>
          <InputGroup.Text className="bg-dark text-light border-secondary">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-dark text-light border-secondary"
          />
        </InputGroup>
      </div>
      
      {bestSellers.length > 0 && (
        <>
          <h5 className="fw-bold mb-3">Best Sellers</h5>
          <div className="row">
            {bestSellers.map(product => (
              <ProductCard 
                key={product._id} 
                product={{
                  id: product._id,
                  title: product.name,
                  price: `Rs. ${product.price}`,
                  imageUrl: product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png',
                  reviews: product.views || 0,
                  bestSeller: true
                }} 
              />
            ))}
          </div>
        </>
      )}

      <h5 className="fw-bold my-4">All Products</h5>
      {filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product._id} 
              product={{
                id: product._id,
                title: product.name,
                price: `Rs. ${product.price}`,
                imageUrl: product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png',
                reviews: product.views || 0
              }} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p>Try adjusting your search to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
