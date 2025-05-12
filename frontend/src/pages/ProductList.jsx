import React from 'react';
import ProductCard from './ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const mockProducts = [
  { id: 1, title: 'Gucci duffle bag', price: '$960', imageUrl: '/images/bag.png', reviews: 65, bestSeller: true },
  { id: 2, title: 'Gucci jacket', price: '$960', imageUrl: '/images/jacket.png', reviews: 65, bestSeller: true },
  { id: 3, title: 'Game controller', price: '$960', imageUrl: '/images/controller.png', reviews: 65 },
  { id: 4, title: 'Gaming laptop', price: '$960', imageUrl: '/images/laptop.png', reviews: 65 },
  { id: 5, title: 'Green jacket', price: '$960', imageUrl: '/images/jacket2.png', reviews: 65 },
  { id: 6, title: 'Gucci duffle bag', price: '$960', imageUrl: '/images/bag.png', reviews: 65 }
];

const ProductList = () => {
  const bestSellers = mockProducts.filter(p => p.bestSeller);
  const others = mockProducts;

  return (
    <div className="container-fluid bg-black text-white p-4 min-vh-100">
      <h5 className="fw-bold mb-3">Best Sellers</h5>
      <div className="row">
        {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
      </div>

      <h5 className="fw-bold my-4">All Products</h5>
      <div className="row">
        {others.map(product => <ProductCard key={product.id + 'a'} product={product} />)}
      </div>
    </div>
  );
};

export default ProductList;
