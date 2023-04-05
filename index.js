const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const connectToDatabase = require('./db');
const app = express();

// Set up database connection
connectToDatabase();

// Set up middleware
app.use(bodyParser.json());

// Set up product routes
app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductById);
app.get(
  '/products/category/:category',
  productController.getProductsByCategory
);
app.post('/products', productController.createProduct);
app.put('/products/:id', productController.updateProductById);
app.delete('/products/:id', productController.deleteProductById);

// Set up user routes
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUserById);
app.delete('/users/:id', userController.deleteUserById);

// Start server
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; margin-top:250px">API is working</h1>!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
