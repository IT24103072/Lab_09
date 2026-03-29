require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./routes/students');
const menuRoutes = require('./routes/menuItems');
const orderRoutes = require('./routes/orders');
const analyticsRoutes = require('./routes/analytics');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

// routes
app.use('/students', studentRoutes);
app.use('/menu-items', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/analytics', analyticsRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT || 3000, () =>
    console.log("Server running")
  );
})
.catch(err => console.log(err));