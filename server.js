const express = require('express');
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');
const bookRoutes = require('./Routes/bookRoutes');
const userRoutes = require('./Routes/userRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
