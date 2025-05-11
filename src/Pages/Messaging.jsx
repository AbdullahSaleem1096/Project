import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from 'framer-motion';
import Footer from './components/Footer';

const MessagingUI = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-2 bg-black">
      <motion.div
        className="d-flex flex-column bg-dark text-white rounded position-relative w-100 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "412px",
          height: "745px",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="border-bottom px-3 py-2 d-flex align-items-center bg-black">
          <div className="bg-primary rounded-circle text-center me-2" style={{ width: 30, height: 30 }}>
            <span className="text-white fw-bold">T</span>
          </div>
          <div className="flex-grow-1">TechHub Official</div>
          <i className="bi bi-telephone"></i>
        </div>

        {/* Chat Body */}
        <div className="p-3 d-flex flex-column flex-grow-1 overflow-auto bg-black">
          <motion.div
            className="align-self-end mb-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-primary text-white px-3 py-2 rounded-pill" style={{ maxWidth: "75%" }}>
              Hi! I am interested in your product
            </div>
            <small className="text-muted d-block text-end" style={{ fontSize: "10px" }}>2:31 PM</small>
          </motion.div>

          <motion.div
            className="align-self-start"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-secondary text-white px-3 py-2 rounded-pill" style={{ maxWidth: "75%" }}>
              thanks for choosing us how may i help you
            </div>
            <small className="text-muted d-block" style={{ fontSize: "10px" }}>2:31 PM</small>
          </motion.div>
        </div>

        {/* Input Box */}
        <motion.div
          className="p-2 d-flex align-items-center bg-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <i className="bi bi-image me-2 text-white"></i>
          <input
            type="text"
            className="form-control me-2 bg-dark text-white border-0"
            placeholder="Type your message..."
            style={{ borderRadius: "20px" }}
          />
          <i className="bi bi-send text-primary"></i>
        </motion.div>

        {/* ✅ Embed the footer component INSIDE the mobile chat container */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default MessagingUI;


