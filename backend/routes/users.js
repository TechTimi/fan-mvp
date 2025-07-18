const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    delete userData.password;

    res.json(userData);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/profile', authenticateToken, [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('address').optional().trim(),
  body('dateOfBirth').optional().isISO8601(),
  body('occupation').optional().trim(),
  body('monthlyIncome').optional().isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getFirestore();
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    await db.collection('users').doc(req.user.uid).update(updateData);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.get('/credit-score', authenticateToken, async (req, res) => {
  try {
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const creditScore = calculateCreditScore(userData);

    await db.collection('users').doc(req.user.uid).update({
      creditScore,
      updatedAt: new Date()
    });

    res.json({ creditScore });
  } catch (error) {
    console.error('Credit score error:', error);
    res.status(500).json({ error: 'Failed to calculate credit score' });
  }
});

function calculateCreditScore(userData) {
  let score = 300;

  if (userData.isVerified) score += 100;
  if (userData.monthlyIncome) {
    if (userData.monthlyIncome > 100000) score += 150;
    else if (userData.monthlyIncome > 50000) score += 100;
    else score += 50;
  }
  if (userData.occupation) score += 50;
  if (userData.address) score += 25;

  return Math.min(score, 850);
}

module.exports = router;
