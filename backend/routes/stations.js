const express = require('express');
const { partnerStations, stationUtils } = require('../../partnerStations');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const { lat, lng, radius, fuelType } = req.query;

    let stations = stationUtils.getActiveStations();

    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const searchRadius = radius ? parseFloat(radius) : 10;
      
      stations = stationUtils.findNearbyStations(latitude, longitude, searchRadius);
    }

    if (fuelType) {
      stations = stations.filter(station => station.fuelTypes.includes(fuelType));
    }

    res.json(stations);
  } catch (error) {
    console.error('Get stations error:', error);
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
});

router.get('/:id', authenticateToken, (req, res) => {
  try {
    const station = stationUtils.getStationById(req.params.id);
    
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    res.json(station);
  } catch (error) {
    console.error('Get station error:', error);
    res.status(500).json({ error: 'Failed to fetch station' });
  }
});

router.post('/:id/verify', authenticateToken, async (req, res) => {
  try {
    const { qrCode } = req.body;
    const station = stationUtils.getStationById(req.params.id);

    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    if (station.qrCode !== qrCode) {
      return res.status(400).json({ error: 'Invalid QR code' });
    }

    res.json({ 
      message: 'Station verified successfully',
      station: station.name
    });
  } catch (error) {
    console.error('Station verification error:', error);
    res.status(500).json({ error: 'Failed to verify station' });
  }
});

module.exports = router;
