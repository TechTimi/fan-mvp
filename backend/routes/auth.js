const express = require('express');
const { body, validationResult } = require('express-validator');
const { getAuth, getFirestore } = require('../config/firebase');
const { sendSMS } = require('../services/termii');

const router = express.Router();

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('phone').isMobilePhone(),
  body('firstName').trim().isLength({ min: 2 }),
  body('lastName').trim().isLength({ min: 2 }),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, phone, firstName, lastName, password } = req.body;
    const db = getFirestore();

    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phone
    });

    const userData = {
      uid: userRecord.uid,
      email,
      phone,
      firstName,
      lastName,
      creditScore: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    await sendSMS(phone, `Welcome to FAN! Your account has been created successfully.`);

    res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/verify-phone', [
  body('phone').isMobilePhone(),
  body('code').isLength({ min: 4, max: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, code } = req.body;

    if (code === '1234') {
      res.json({ message: 'Phone verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Phone verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/send-verification', [
  body('phone').isMobilePhone()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone } = req.body;
    const verificationCode = '1234';

    await sendSMS(phone, `Your FAN verification code is: ${verificationCode}`);

    res.json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
});

module.exports = router;
