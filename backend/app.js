
const express = require('express');
const mongoose = require('mongoose');

const Data = require('./models/data');

const MONGODB_URI =
  'mongodb+srv://amelie:YeGp6ZNLivbGAXDZ@cluster0.ncsle.mongodb.net/covid3000';

const app = express();

const dataRoutes = require('./routes/data');


app.use(dataRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
