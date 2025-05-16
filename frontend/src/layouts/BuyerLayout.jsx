import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './BuyerLayout.css';

const BuyerLayout = ({ userRole = 'buyer', isAuthenticated = true, onLogout }) => {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Fixed Sidebar */}
        <Col lg={2} md={3} className="sidebar-column">
          <div className="fixed-sidebar">
            <Sidebar 
              userRole={userRole}
              isAuthenticated={isAuthenticated}
              onLogout={onLogout}
            />
          </div>
        </Col>
        
        {/* Main Content */}
        <Col lg={10} md={9} className="main-content-with-sidebar">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default BuyerLayout; 