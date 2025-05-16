import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTwitter, FaInstagram, FaLinkedin, FaUsers, FaShoppingCart, FaStore, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './AboutUs.css';

const teamMembers = [
  {
    name: 'Abdullah Saleem',
    role: 'UI/UX Designer',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Creates intuitive and visually appealing interfaces for our platform.'
  },
  {
    name: 'Fakiha Saadat',
    role: 'Front-end Developer',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Builds responsive and interactive components for our web application.'
  },
  {
    name: 'Adina Fatima',
    role: 'MERN Stack Developer',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Full-stack developer specializing in MongoDB, Express, React, and Node.js.'
  },
  {
    name: 'Maryam Shehzad',
    role: 'Frontend Developer',
    img: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Transforms designs into functional and responsive code.'
  },
  {
    name: 'Ayesha Tariq',
    role: 'Backend Developer',
    img: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Develops robust server-side applications and APIs for our platform.'
  },
];

const AboutUsPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="about-us-page">
      {/* Header Section */}
      <div className="about-header">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-lg-start"
              >
                <Link to="/home" className="back-link mb-2 d-inline-block">
                  <FaArrowLeft /> Back to Home
                </Link>
                <h1 className="display-4 fw-bold">About Us</h1>
                <p className="lead">Discover the story behind Nustify, the premier online marketplace for NUST students.</p>
                <Button variant="primary" size="lg" className="mt-3">Join Our Community</Button>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team Collaboration" 
                  className="img-fluid rounded header-image"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Our Story Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5 }}
              className="text-center mb-5"
            >
              <h2 className="section-title">Our Story</h2>
              <div className="section-divider mx-auto mb-4"></div>
            </motion.div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={6}>
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="story-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <p className="story-text">
                    Launched in 2025, Nustify is the premier online marketplace designed exclusively for the
                    students of NUST. Born out of a need to simplify campus life, we connect students with
                    affordable essentials, academic resources, and local sellers—all in one convenient
                    platform.
                  </p>
                  <p className="story-text">
                    With over 100 sellers, 50 product categories, and a growing community of 5000 student
                    users, we're committed to making university life easier, smarter, and more connected. From
                    textbooks and dorm supplies to snacks and tech gadgets, Nustify offers a curated selection
                    tailored to student needs, all delivered with the speed and convenience your campus
                    lifestyle demands.
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 mt-lg-0"
            >
              <div className="vision-mission p-4 rounded shadow-sm">
                <div className="mb-4">
                  <h3 className="h4 mb-3">Our Vision</h3>
                  <p>To create the most trusted and convenient marketplace that enhances student life at NUST.</p>
                </div>
                <div>
                  <h3 className="h4 mb-3">Our Mission</h3>
                  <p>To empower NUST students by providing a secure, efficient, and affordable platform for exchanging goods and services within the campus community.</p>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Stats Section */}
      <div className="stats-section py-5">
        <Container>
          <Row>
            {[
              { icon: <FaUsers />, value: '10.5k', label: 'Active Users', delay: 0 },
              { icon: <FaShoppingCart />, value: '33k', label: 'Monthly Sales', delay: 0.2 },
              { icon: <FaStore />, value: '450+', label: 'Campus Sellers', delay: 0.4 },
              { icon: <FaGraduationCap />, value: '5k+', label: 'Student Customers', delay: 0.6 }
            ].map((stat, idx) => (
              <Col key={idx} md={6} lg={3} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  className="stat-card text-center p-4 rounded shadow-sm"
                >
                  <div className="stat-icon mb-3">{stat.icon}</div>
                  <h2 className="stat-value">{stat.value}</h2>
                  <p className="stat-label mb-0">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5 }}
              className="text-center mb-5"
            >
              <h2 className="section-title">Meet Our Team</h2>
              <div className="section-divider mx-auto mb-4"></div>
              <p className="section-subtitle">The passionate individuals behind Nustify's success.</p>
            </motion.div>
          </Col>
        </Row>
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="team-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="position-relative mb-4 team-image-container mx-auto">
                      <Image 
                        src={member.img} 
                        alt={member.name} 
                        roundedCircle 
                        className="team-image"
                      />
                    </div>
                    <h3 className="team-name h5 mb-2">{member.name}</h3>
                    <p className="team-role mb-3">{member.role}</p>
                    <p className="team-bio mb-4">{member.bio}</p>
                    <div className="social-icons">
                      <a href="#" className="social-icon"><FaTwitter /></a>
                      <a href="#" className="social-icon"><FaInstagram /></a>
                      <a href="#" className="social-icon"><FaLinkedin /></a>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
      <div className="cta-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-5 rounded cta-content"
              >
                <h2 className="mb-4">Join the Nustify Community Today</h2>
                <p className="mb-4">Experience the convenience of campus shopping with Nustify. Sign up now to access exclusive student deals!</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="light" size="lg">Learn More</Button>
                  <Button variant="primary" size="lg">Sign Up Now</Button>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;