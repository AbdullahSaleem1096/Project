const express = require('express');
const app = express();
const productRouter = express.Router();
const storeRouter = require('./routes/storeRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const connectDB = require('./config/connection');
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Product routes
productRouter.post('/', validateProductData, createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/search', searchProducts);
productRouter.get('/:id', validateProductId, getProductById);
productRouter.get('/:id/related', validateProductId, getRelatedProducts);
productRouter.get('/store/:storeId', getProductsByStore);
productRouter.put('/:id', validateProductId, validateProductData, updateProduct);
productRouter.delete('/:id', validateProductId, deleteProduct);

// Mount routers
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/stores', storeRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/orders', orderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});


