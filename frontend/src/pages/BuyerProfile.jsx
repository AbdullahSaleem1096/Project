import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Nav, Tab } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';

const BuyerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '+92 123 456 7890',
    address: '318 Razi Hostel, NUST Islamabad',
    city: 'Islamabad',
    country: 'Pakistan',
    postalCode: '44000'
  });

  // Handle profile data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Handle profile form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data logic would go here
    alert('Profile updated successfully!');
  };

  return (
    <Container className="py-4">
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Card>
          <Card.Header className="bg-white">
            <h3 className="mb-3">My Profile</h3>
            <Nav variant="tabs" className="border-bottom-0">
              <Nav.Item>
                <Nav.Link eventKey="profile">
                  <FaUser className="me-2" />
                  Personal Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="addresses">
                  <FaHome className="me-2" />
                  Addresses
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              {/* Profile Tab */}
              <Tab.Pane eventKey="profile">
                <h4 className="mb-4">Personal Information</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                  </Button>
                </Form>
              </Tab.Pane>

              {/* Addresses Tab */}
              <Tab.Pane eventKey="addresses">
                <h4 className="mb-4">Addresses</h4>
                <Card className="mb-4 border">
                  <Card.Body>
                    <h5 className="card-title">Default Address</h5>
                    <p className="text-muted mb-0">{profileData.firstName} {profileData.lastName}</p>
                    <p className="text-muted mb-0">{profileData.address}</p>
                    <p className="text-muted mb-0">{profileData.city}, {profileData.country} {profileData.postalCode}</p>
                    <p className="text-muted mb-0">{profileData.phone}</p>
                    <div className="mt-3">
                      <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                      <Button variant="outline-danger" size="sm">Remove</Button>
                    </div>
                  </Card.Body>
                </Card>
                <Button variant="primary">
                  Add New Address
                </Button>
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Container>
  );
};

export default BuyerProfile; 