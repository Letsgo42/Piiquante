const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');

const app = express();

const sauceRoutes = require('./routes/sauceRoutes');
const userRoutes = require('./routes/userRoutes');


// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_DB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


// ALLOW CROSS-ORIGIN REQUESTS 
// Then handle next middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// USE EXPRESS MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
