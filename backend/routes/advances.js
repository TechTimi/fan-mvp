const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/request', authenticateToken, [
  body('amount').isNumeric().custom(value => value > 0 && value <= 100000),
  body('stationId').notEmpty(),
  body('fuelType').isIn(['PMS', 'AGO', 'DPK', 'LPG']),
  body('purpose').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getFirestore();
    const { amount, stationId, fuelType, purpose } = req.body;

    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    if (userData.creditScore < 500) {
      return res.status(400).json({ error: 'Credit score too low for advance' });
    }

    const advanceData = {
      id: uuidv4(),
      userId: req.user.uid,
      amount,
      stationId,
      fuelType,
      purpose: purpose || '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('advances').doc(advanceData.id).set(advanceData);

    res.status(201).json({
      message: 'Advance request submitted successfully',
      advanceId: advanceData.id
    });
  } catch (error) {
    console.error('Advance request error:', error);
    res.status(500).json({ error: 'Failed to submit advance request' });
  }
});

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const db = getFirestore();
    const advancesSnapshot = await db.collection('advances')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const advances = [];
    advancesSnapshot.forEach(doc => {
      advances.push({ id: doc.id, ...doc.data() });
    });

    res.json(advances);
  } catch (error) {
    console.error('Advance history error:', error);
    res.status(500).json({ error: 'Failed to fetch advance history' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const db = getFirestore();
    const advanceDoc = await db.collection('advances').doc(req.params.id).get();

    if (!advanceDoc.exists) {
      return res.status(404).json({ error: 'Advance not found' });
    }

    const advanceData = advanceDoc.data();
    if (advanceData.userId !== req.user.uid) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ id: advanceDoc.id, ...advanceData });
  } catch (error) {
    console.error('Get advance error:', error);
    res.status(500).json({ error: 'Failed to fetch advance' });
  }
});

module.exports = router;
