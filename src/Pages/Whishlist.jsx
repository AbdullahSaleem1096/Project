import { motion } from 'framer-motion';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaEllipsisV, FaRegTrashAlt, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';

const product = {
  name: 'Gucci duffle bag',
  price: '$960',
  rating: 4.5,
  reviews: 65,
  image: 'https://via.placeholder.com/200x130.png?text=Gucci+Duffle+Bag',
};

const Wishlist = () => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-warning me-1" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-warning me-1" />}
      </>
    );
  };

  return (
    <div style={{ backgroundColor: '#0A094F', color: 'white', minHeight: '100vh' , width: '500px'}}>
      <Container>
        {/* Header */}
        <Row className="py-3 align-items-center">
          <Col xs="auto">
            <FaArrowLeft size={20} />
          </Col>
          <Col>
            <h4 className="mb-0 fw-bold">WISHLIST</h4>
          </Col>
          <Col xs="auto">
            <FaEllipsisV />
          </Col>
        </Row>

        {/* Wishlist Items */}
        {[1, 2, 3].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Card className="mb-3 bg-dark text-white rounded-4 border-0" style={{ backgroundColor: '#1D1A64' }}>
              <Card.Body>
                <Row>
                  <Col md={4} className="d-flex align-items-center justify-content-center">
                    <img src={product.image} alt="Bag" className="img-fluid rounded" />
                  </Col>
                  <Col md={8}>
                    <h5>{product.name}</h5>
                    <p className="text-danger fw-bold">{product.price}</p>
                    <div className="d-flex align-items-center">
                      {renderStars(product.rating)}
                      <span className="text-muted ms-2">({product.reviews})</span>
                    </div>
                    <div className="d-flex mt-3">
                      <Button variant="outline-light" className="me-2">
                        <FaRegTrashAlt />
                      </Button>
                      <Button style={{ backgroundColor: '#A259FF', border: 'none' }}>Add to Cart</Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </Container>
    </div>
  );
};

export default Wishlist;
