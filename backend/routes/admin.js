const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/advances', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getFirestore();
    const { status, limit = 50 } = req.query;

    let query = db.collection('advances').orderBy('createdAt', 'desc');
    
    if (status) {
      query = query.where('status', '==', status);
    }

    const advancesSnapshot = await query.limit(parseInt(limit)).get();
    const advances = [];
    
    advancesSnapshot.forEach(doc => {
      advances.push({ id: doc.id, ...doc.data() });
    });

    res.json(advances);
  } catch (error) {
    console.error('Admin get advances error:', error);
    res.status(500).json({ error: 'Failed to fetch advances' });
  }
});

router.put('/advances/:id/status', authenticateToken, requireAdmin, [
  body('status').isIn(['approved', 'rejected', 'pending']),
  body('reason').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getFirestore();
    const { status, reason } = req.body;

    const updateData = {
      status,
      updatedAt: new Date(),
      adminId: req.user.uid
    };

    if (reason) {
      updateData.reason = reason;
    }

    await db.collection('advances').doc(req.params.id).update(updateData);

    res.json({ message: 'Advance status updated successfully' });
  } catch (error) {
    console.error('Admin update advance error:', error);
    res.status(500).json({ error: 'Failed to update advance status' });
  }
});

router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getFirestore();
    const { limit = 50 } = req.query;

    const usersSnapshot = await db.collection('users')
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .get();

    const users = [];
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      delete userData.password;
      users.push({ id: doc.id, ...userData });
    });

    res.json(users);
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/analytics', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getFirestore();

    const [usersSnapshot, advancesSnapshot, paymentsSnapshot] = await Promise.all([
      db.collection('users').get(),
      db.collection('advances').get(),
      db.collection('payments').get()
    ]);

    const analytics = {
      totalUsers: usersSnapshot.size,
      totalAdvances: advancesSnapshot.size,
      totalPayments: paymentsSnapshot.size,
      pendingAdvances: 0,
      approvedAdvances: 0,
      rejectedAdvances: 0,
      totalAdvanceAmount: 0
    };

    advancesSnapshot.forEach(doc => {
      const advance = doc.data();
      if (advance.status === 'pending') analytics.pendingAdvances++;
      if (advance.status === 'approved') analytics.approvedAdvances++;
      if (advance.status === 'rejected') analytics.rejectedAdvances++;
      analytics.totalAdvanceAmount += advance.amount || 0;
    });

    res.json(analytics);
  } catch (error) {
    console.error('Admin analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
