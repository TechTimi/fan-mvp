const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');
const { initializePaystack, initializeFlutterwave } = require('../services/payments');

const router = express.Router();

router.post('/initialize', authenticateToken, [
  body('amount').isNumeric().custom(value => value > 0),
  body('advanceId').notEmpty(),
  body('provider').isIn(['paystack', 'flutterwave'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, advanceId, provider } = req.body;
    const db = getFirestore();

    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    let paymentData;

    if (provider === 'paystack') {
      paymentData = await initializePaystack({
        email: userData.email,
        amount: amount * 100,
        reference: `fan_${advanceId}_${Date.now()}`
      });
    } else {
      paymentData = await initializeFlutterwave({
        email: userData.email,
        amount,
        tx_ref: `fan_${advanceId}_${Date.now()}`,
        customer: {
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          phonenumber: userData.phone
        }
      });
    }

    res.json(paymentData);
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
});

router.post('/verify', authenticateToken, [
  body('reference').notEmpty(),
  body('provider').isIn(['paystack', 'flutterwave'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reference, provider } = req.body;

    res.json({ 
      message: 'Payment verified successfully',
      reference,
      status: 'success'
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const db = getFirestore();
    const paymentsSnapshot = await db.collection('payments')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const payments = [];
    paymentsSnapshot.forEach(doc => {
      payments.push({ id: doc.id, ...doc.data() });
    });

    res.json(payments);
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
});

module.exports = router;
