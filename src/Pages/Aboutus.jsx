import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from 'framer-motion';
import { Card, Col, Row } from 'react-bootstrap';
import Footer from './components/Footer';


const teamMembers = [
  {
    name: 'Abdullah Saleem',
    role: 'UI/UX Designer',
    img: './Images/Abdullah.png',
  },
  {
    name: 'Fakiha Saadat',
    role: 'Front-end Developer',
    img: 'https://via.placeholder.com/80',
  },
  {
    name: 'Adina Fatima',
    role: 'MERN Stack Developer',
    img: 'https://via.placeholder.com/80',
  },
  {
    name: 'Maryam Shehzad',
    role: 'Frontend Developer',
    img: 'https://via.placeholder.com/80',
  },
  {
    name: 'Ayesha Tariq',
    role: 'Backend Developer',
    img: 'https://via.placeholder.com/80',
  },
];

const AboutUsPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white min-vh-100 p-3">
      <motion.div
        className="bg-dark w-100 rounded shadow-lg d-flex flex-column"
        style={{ maxWidth: '500px' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="d-flex align-items-center px-3 py-2 border-bottom">
          <span style={{ fontSize: '24px', fontWeight: 'bold', marginRight: '10px' }}>&larr;</span>
          <h4 className="m-0">About Us</h4>
          <div className="ms-auto" style={{ fontSize: '24px' }}>⋮</div>
        </div>

        {/* Our Story */}
        <Card className="bg-secondary text-white m-3" style={{ borderRadius: '15px' }}>
          <Card.Body>
            <Card.Title>Our Story</Card.Title>
            <Card.Text style={{ fontSize: '14px', color: '#ddd' }}>
              Launched in 2025, Nustify is the premier online marketplace designed exclusively for the
              students of NUST. Born out of a need to simplify campus life, we connect students with
              affordable essentials, academic resources, and local sellers—all in one convenient
              platform.
              <br /><br />
              With over 100 sellers, 50 product categories, and a growing community of 5000 student
              users, we’re committed to making university life easier, smarter, and more connected. From
              textbooks and dorm supplies to snacks and tech gadgets, Nustify offers a curated selection
              tailored to student needs, all delivered with the speed and convenience your campus
              lifestyle demands.
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Stats */}
        <Row className="text-center px-3">
          {[
            ['10.5k', 'Sellers currently active'],
            ['33k', 'Monthly sales'],
            ['45k', 'Customers currently active'],
            ['10.5k', 'Sellers currently active'],
          ].map(([value, label], idx) => (
            <Col key={idx} xs={6} className="mb-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-primary text-white rounded p-2"
              >
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{value}</div>
                <div style={{ fontSize: '12px' }}>{label}</div>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Our Team */}
        <Card className="bg-secondary text-white m-3" style={{ borderRadius: '15px' }}>
          <Card.Body>
            <Card.Title>Our Team</Card.Title>
            <Row>
              {teamMembers.map((member, index) => (
                <Col key={index} xs={6} className="text-center mb-4">
                  <motion.img
                    src={member.img}
                    alt={member.name}
                    className="rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  />
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{member.name}</div>
                  <div style={{ fontSize: '12px', color: '#ccc' }}>{member.role}</div>
                  <div className="mt-1" style={{ fontSize: '14px', color: '#aaa' }}>
                    <i className="bi bi-twitter mx-1"></i>
                    <i className="bi bi-instagram mx-1"></i>
                    <i className="bi bi-linkedin mx-1"></i>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default AboutUsPage;