const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const advanceRoutes = require('./routes/advances');
const stationRoutes = require('./routes/stations');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');

const { initializeFirebase } = require('./config/firebase');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

initializeFirebase();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/advances', advanceRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'FAN MVP Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`FAN MVP Backend running on port ${PORT}`);
});

module.exports = app;
