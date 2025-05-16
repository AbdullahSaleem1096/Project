import React from 'react';
import './SellerAnalytics.css';

const SellerAnalytics = () => {
  // Mock data - replace with actual data from your backend
  const salesData = {
    totalSales: 12500,
    totalOrders: 156,
    averageOrderValue: 80.13,
    conversionRate: 3.2
  };

  const topProducts = [
    {
      id: 1,
      name: "Product A",
      sales: 45,
      revenue: 4500
    },
    {
      id: 2,
      name: "Product B",
      sales: 38,
      revenue: 3800
    },
    {
      id: 3,
      name: "Product C",
      sales: 32,
      revenue: 3200
    }
  ];

  const customerInsights = {
    newCustomers: 45,
    returningCustomers: 111,
    customerSatisfaction: 4.5
  };

  return (
    <div className="seller-analytics">
      <h1>Analytics Dashboard</h1>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Sales Overview</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Sales</span>
              <span className="stat-value">${salesData.totalSales}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Orders</span>
              <span className="stat-value">{salesData.totalOrders}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg. Order Value</span>
              <span className="stat-value">${salesData.averageOrderValue}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Conversion Rate</span>
              <span className="stat-value">{salesData.conversionRate}%</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Top Performing Products</h3>
          <div className="products-list">
            {topProducts.map(product => (
              <div key={product.id} className="product-item">
                <span className="product-name">{product.name}</span>
                <div className="product-stats">
                  <span>{product.sales} sales</span>
                  <span>${product.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Customer Insights</h3>
          <div className="customer-stats">
            <div className="stat-item">
              <span className="stat-label">New Customers</span>
              <span className="stat-value">{customerInsights.newCustomers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Returning Customers</span>
              <span className="stat-value">{customerInsights.returningCustomers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Customer Satisfaction</span>
              <span className="stat-value">{customerInsights.customerSatisfaction}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics; 