const express = require('express');
const app = express();
const router = express.Router();
const productRouter = express.Router();
const storeRouter = require('./routes/storeRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const connectDB = require('./config/connection');
const {registerUser, loginUser, verifyOTP} = require('./controllers/UserControllers');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByStore,
  searchProducts,
  getRelatedProducts
} = require('./controllers/ProductControllers');
const { validateProductData, validateProductId } = require('./middleware/productValidation');
const cors = require('cors');

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Routes
router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);

// Product Routes
productRouter.post('/', validateProductData, createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/search', searchProducts);
productRouter.get('/store/:storeId', getProductsByStore);
productRouter.get('/:id/related', validateProductId, getRelatedProducts);
productRouter.get('/:id', validateProductId, getProductById);
productRouter.put('/:id', validateProductId, validateProductData, updateProduct);
productRouter.delete('/:id', validateProductId, deleteProduct);

// Mount routers
app.use('/api/user', router);
app.use('/api/products', productRouter);
app.use('/api/stores', storeRouter);
app.use('/api/wishlist', wishlistRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});


