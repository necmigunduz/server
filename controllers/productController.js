const Product = require('../models/product');

// CREATE
async function createProduct(req, res, next) {
  try {
    const { name, description, price, category, seller } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      seller,
    });
    const result = await product.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

// READ
async function getProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function getProductsByCategory(req, res, next) {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    next(error);
  }
}

// UPDATE
async function updateProductById(req, res, next) {
  try {
    const { name, description, price, category, seller } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.seller = seller || product.seller;
    const result = await product.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

// DELETE
async function deleteProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProductById,
  deleteProductById,
};
