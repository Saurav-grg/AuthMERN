const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.json('Hello World');
});
// app.use('/api/recipes', recipeRoutes);

mongoose.connect(process.env.MONGODB_KEY).then(() => {
  console.log('Connected to database');
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
  );
});
