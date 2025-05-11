import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Add your responsive tweaks here

import { motion } from "framer-motion";
import CategoryBar from "./components/CategoryBar";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import ShowMoreButton from "./components/ShowMoreButton";

function App() {
  return (
    <div className="app-wrapper d-flex flex-column min-vh-100 bg-dark text-light">
      <Navbar />

      <div className="container-fluid px-3">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CategoryBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductList />
        </motion.div>

        <motion.div
          className="text-center mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ShowMoreButton />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
