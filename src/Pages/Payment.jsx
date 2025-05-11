import { Button, Card, Col, Row } from 'react-bootstrap';

const PaymentPage = () => {
  return (
    <div
      style={{
        backgroundColor: '#0B0B3B',
        minHeight: '100vh',
        width: '500px' ,
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', marginRight: '10px' }}>&larr;</span>
        <h2 style={{ margin: 0 }}>Payment</h2>
        <div style={{ marginLeft: 'auto', fontSize: '24px' }}>⋮</div>
      </div>

      {/* Payment Method */}
      <Card
        style={{
          backgroundColor: '#1C1C5B',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <h5 style={{ color: 'white' }}>Payment Method</h5>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#2F2F7B',
            padding: '15px',
            borderRadius: '15px',
            marginTop: '10px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: '#7C4DFF',
                padding: '10px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            >
              <i className="bi bi-wallet2" style={{ color: 'white' }}></i>
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Wallet Balance</div>
              <div style={{ fontSize: '12px', color: '#ccc' }}>Available: $1,284.50</div>
            </div>
          </div>
          <input type="checkbox" checked readOnly />
        </div>
      </Card>

      {/* Order Summary */}
      <Card
        style={{
          backgroundColor: '#1C1C5B',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <h5 style={{ color: 'white', marginBottom: '15px' }}>Order Summary</h5>
        <Row style={{ marginBottom: '10px' }}>
          <Col style={{ color: '#ccc' }}>Subtotal</Col>
          <Col style={{ textAlign: 'right', color: 'white' }}>$89.99</Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col style={{ color: '#ccc' }}>Delivery Fee</Col>
          <Col style={{ textAlign: 'right', color: 'white' }}>$4.99</Col>
        </Row>
        <hr style={{ borderTop: '1px solid #444' }} />
        <Row>
          <Col style={{ fontWeight: 'bold' }}>Total Amount</Col>
          <Col style={{ textAlign: 'right', fontWeight: 'bold' }}>$94.98</Col>
        </Row>
      </Card>

      {/* Confirm Button */}
      <Button
        style={{
          background: 'linear-gradient(to right, #1E90FF, #DA22FF)',
          border: 'none',
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          fontWeight: 'bold',
        }}
      >
        Confirm Payment
      </Button>
    </div>
  );
};

export default PaymentPage;
