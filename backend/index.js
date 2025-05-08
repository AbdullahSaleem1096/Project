const express = require('express');
const app = express();
const connectDB = require('./config/connection');
const router = express.Router();
const {registerUser , loginUser} = require('./controllers/UserControllers');


connectDB();
app.use(express.json());


router.post('/register',registerUser);
router.post('/login',loginUser);
app.use('/api/user',router);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});