import React, { useState } from 'react';
import { Container, Card, Table, Badge, Button, Nav } from 'react-bootstrap';
import { FaEye, FaFileDownload, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BuyerOrders = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for orders
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      status: 'Delivered',
      total: 1520,
      items: [
        { id: 1, name: 'Gucci Duffle Bag', price: 960, quantity: 1 },
        { id: 2, name: 'Leather Wallet', price: 560, quantity: 1 }
      ],
      tracking: 'TRK-789456'
    },
    {
      id: 'ORD-12346',
      date: '2023-05-01',
      status: 'Processing',
      total: 799,
      items: [
        { id: 3, name: 'Designer Jacket', price: 799, quantity: 1 }
      ],
      tracking: 'TRK-789457'
    },
    {
      id: 'ORD-12347',
      date: '2023-04-20',
      status: 'Cancelled',
      total: 599,
      items: [
        { id: 4, name: 'Leather Bag', price: 599, quantity: 1 }
      ],
      tracking: null
    },
    {
      id: 'ORD-12348',
      date: '2023-04-10',
      status: 'Delivered',
      total: 1299,
      items: [
        { id: 5, name: 'Premium Laptop', price: 1299, quantity: 1 }
      ],
      tracking: 'TRK-789458'
    }
  ];

  // Filter orders based on active tab
  const filteredOrders = () => {
    if (activeTab === 'all') return orders;
    return orders.filter(order => order.status.toLowerCase() === activeTab);
  };

  // Get status badge color
  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'primary';
      case 'cancelled':
        return 'danger';
      case 'shipped':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">My Orders</h3>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input type="text" className="form-control" placeholder="Search orders..." />
            <button className="btn btn-outline-secondary" type="button">Search</button>
          </div>
        </Card.Header>
        <Card.Body>
          <Nav variant="pills" className="mb-4">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'all'} 
                onClick={() => setActiveTab('all')}
              >
                All Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'processing'} 
                onClick={() => setActiveTab('processing')}
              >
                Processing
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'shipped'} 
                onClick={() => setActiveTab('shipped')}
              >
                Shipped
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'delivered'} 
                onClick={() => setActiveTab('delivered')}
              >
                Delivered
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'cancelled'} 
                onClick={() => setActiveTab('cancelled')}
              >
                Cancelled
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {filteredOrders().length === 0 ? (
            <div className="text-center py-5">
              <FaExclamationCircle size={48} className="text-muted mb-3" />
              <h5>No orders found</h5>
              <p className="text-muted">You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
              <Link to="/online-store">
                <Button variant="primary">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <Table responsive className="align-middle">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders().map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      <Badge bg={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td>Rs. {order.total.toFixed(2)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" title="View Details">
                          <FaEye />
                        </Button>
                        {order.status === 'Delivered' && (
                          <Button variant="outline-success" size="sm" title="Download Invoice">
                            <FaFileDownload />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BuyerOrders; 