const mongoose = require('mongoose');
require('dotenv').config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;
function connectToDatabase() {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected!');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
}
module.exports = connectToDatabase;
