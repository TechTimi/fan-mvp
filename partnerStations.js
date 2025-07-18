const partnerStations = [
  {
    id: "station_001",
    name: "Total Energies Victoria Island",
    address: "Plot 1684, Sanusi Fafunwa Street, Victoria Island, Lagos",
    coordinates: {
      latitude: 6.4281,
      longitude: 3.4219
    },
    phone: "+234-1-2345678",
    email: "vi@totalenergies.ng",
    fuelTypes: ["PMS", "AGO", "DPK"],
    operatingHours: {
      weekdays: "06:00 - 22:00",
      weekends: "07:00 - 21:00"
    },
    amenities: ["ATM", "Convenience Store", "Car Wash", "Restroom"],
    rating: 4.5,
    isActive: true,
    commissionRate: 2.5,
    maxAdvanceAmount: 50000,
    qrCode: "QR_TOTAL_VI_001"
  },
  {
    id: "station_002",
    name: "Mobil Ikeja",
    address: "Allen Avenue, Ikeja, Lagos State",
    coordinates: {
      latitude: 6.6018,
      longitude: 3.3515
    },
    phone: "+234-1-3456789",
    email: "ikeja@mobil.ng",
    fuelTypes: ["PMS", "AGO"],
    operatingHours: {
      weekdays: "05:30 - 23:00",
      weekends: "06:00 - 22:00"
    },
    amenities: ["ATM", "Convenience Store", "Restroom"],
    rating: 4.2,
    isActive: true,
    commissionRate: 2.0,
    maxAdvanceAmount: 40000,
    qrCode: "QR_MOBIL_IKJ_002"
  },
  {
    id: "station_003",
    name: "Shell Lekki",
    address: "Lekki-Epe Expressway, Lekki Phase 1, Lagos",
    coordinates: {
      latitude: 6.4474,
      longitude: 3.5562
    },
    phone: "+234-1-4567890",
    email: "lekki@shell.ng",
    fuelTypes: ["PMS", "AGO", "DPK", "LPG"],
    operatingHours: {
      weekdays: "24/7",
      weekends: "24/7"
    },
    amenities: ["ATM", "Convenience Store", "Car Wash", "Restroom", "Restaurant"],
    rating: 4.7,
    isActive: true,
    commissionRate: 3.0,
    maxAdvanceAmount: 75000,
    qrCode: "QR_SHELL_LEK_003"
  },
  {
    id: "station_004",
    name: "Conoil Surulere",
    address: "Adeniran Ogunsanya Street, Surulere, Lagos",
    coordinates: {
      latitude: 6.4969,
      longitude: 3.3534
    },
    phone: "+234-1-5678901",
    email: "surulere@conoil.ng",
    fuelTypes: ["PMS", "AGO"],
    operatingHours: {
      weekdays: "06:00 - 21:00",
      weekends: "07:00 - 20:00"
    },
    amenities: ["Convenience Store", "Restroom"],
    rating: 4.0,
    isActive: true,
    commissionRate: 2.2,
    maxAdvanceAmount: 35000,
    qrCode: "QR_CONOIL_SUR_004"
  },
  {
    id: "station_005",
    name: "NNPC Abuja Central",
    address: "Central Business District, Abuja, FCT",
    coordinates: {
      latitude: 9.0579,
      longitude: 7.4951
    },
    phone: "+234-9-2345678",
    email: "central@nnpc.gov.ng",
    fuelTypes: ["PMS", "AGO", "DPK"],
    operatingHours: {
      weekdays: "06:00 - 22:00",
      weekends: "07:00 - 21:00"
    },
    amenities: ["ATM", "Convenience Store", "Restroom"],
    rating: 4.3,
    isActive: true,
    commissionRate: 1.8,
    maxAdvanceAmount: 60000,
    qrCode: "QR_NNPC_ABJ_005"
  },
  {
    id: "station_006",
    name: "Oando Kano",
    address: "Murtala Mohammed Way, Kano State",
    coordinates: {
      latitude: 12.0022,
      longitude: 8.5919
    },
    phone: "+234-64-123456",
    email: "kano@oando.ng",
    fuelTypes: ["PMS", "AGO"],
    operatingHours: {
      weekdays: "05:00 - 23:00",
      weekends: "06:00 - 22:00"
    },
    amenities: ["ATM", "Convenience Store", "Car Wash", "Restroom"],
    rating: 4.1,
    isActive: true,
    commissionRate: 2.3,
    maxAdvanceAmount: 45000,
    qrCode: "QR_OANDO_KAN_006"
  }
];

const stationUtils = {
  getActiveStations: () => partnerStations.filter(station => station.isActive),
  
  findNearbyStations: (userLat, userLng, radiusKm = 10) => {
    return partnerStations.filter(station => {
      const distance = calculateDistance(
        userLat, userLng,
        station.coordinates.latitude,
        station.coordinates.longitude
      );
      return distance <= radiusKm && station.isActive;
    });
  },
  
  getStationById: (stationId) => partnerStations.find(station => station.id === stationId),
  
  getStationsByFuelType: (fuelType) => {
    return partnerStations.filter(station => 
      station.fuelTypes.includes(fuelType) && station.isActive
    );
  },
  
  calculateDistance: (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
};

function calculateDistance(lat1, lng1, lat2, lng2) {
  return stationUtils.calculateDistance(lat1, lng1, lat2, lng2);
}

module.exports = {
  partnerStations,
  stationUtils
};
