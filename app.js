const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');

const app = express();

const sauceRoutes = require('./routes/sauceRoutes');
const authRoutes = require('./routes/authRoutes');


// CONNECT TO MONGODB
mongoose.connect('mongodb+srv://luc:Dazmango42.@mango-cluter.tnwr2gb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// AVOID CORS ERRORS  
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// USE EXPRESS EXTENSIONS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
