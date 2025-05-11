import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaEllipsisV, FaPen, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Footer from './components/Footer';
import './Pages/customscrollbar.css';

const product = {
  name: 'Gucci duffle bag',
  price: '$960',
  views: 576,
  rating: 4.5,
  reviews: 65,
  image: '#' // Replace with your image
};

const ProductCard = () => (
  <Card className="mb-3 p-3 bg-dark text-white rounded-4 border-0">
    <Row className="align-items-center">
      <Col xs={12} md={4} className="mb-3 mb-md-0">
        <Card.Img src={product.image} className="img-fluid rounded w-100" />
      </Col>
      <Col xs={12} md={8}>
        <Card.Body className="p-0">
          <Card.Title className="fs-5 fw-bold">{product.name}</Card.Title>
          <div className="text-danger fw-bold">{product.price}</div>
          <div className="text-white-50 mb-2">{product.views} views</div>
          <div className="d-flex align-items-center flex-wrap mb-3">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-warning me-1" />
            ))}
            <FaStarHalfAlt className="text-warning me-2" />
            <span className="text-white-50">({product.reviews})</span>
          </div>
          <div className="d-flex flex-column flex-sm-row">
            <Button variant="primary" className="me-sm-2 mb-2 mb-sm-0 rounded-4 w-100 w-sm-auto">Edit</Button>
            <Button variant="danger" className="rounded-4 w-100 w-sm-auto">Remove</Button>
          </div>
        </Card.Body>
      </Col>
    </Row>
  </Card>
);

const SellerAllProducts = () => {
  return (
    <div style={{ backgroundColor: '#0f0c3e' }} className="min-vh-100 d-flex flex-column">
      <Container className="text-white rounded-4 py-3 px-3 px-md-4 flex-grow-1" style={{ backgroundColor: '#251f64' }}>
        {/* Header */}
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center mb-2 mb-sm-0">
            <FaArrowLeft className="me-3 fs-4" />
            <h2 className="mb-0 fs-4">All Products</h2>
          </div>
          <FaEllipsisV className="fs-4" />
        </div>

        {/* Product List */}
        <div className="bg-dark rounded-4 p-3">
          {[...Array(4)].map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </Container>

      {/* Floating Add Button */}
      <div className="position-fixed bottom-0 end-0 p-3 z-3">
        <Button variant="outline-light" className="rounded-circle p-3">
          <FaPen />
        </Button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SellerAllProducts;
