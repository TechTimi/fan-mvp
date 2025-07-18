import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Station {
  id: string;
  name: string;
  address: string;
  phone: string;
  fuelTypes: string[];
  rating: number;
  isActive: boolean;
  operatingHours: {
    weekdays: string;
    weekends: string;
  };
  amenities: string[];
  commissionRate: number;
  maxAdvanceAmount: number;
}

const mockStations: Station[] = [
  {
    id: 'station_001',
    name: 'Total Energies Victoria Island',
    address: 'Plot 1684, Sanusi Fafunwa Street, Victoria Island, Lagos',
    phone: '+234-1-2345678',
    fuelTypes: ['PMS', 'AGO', 'DPK'],
    rating: 4.5,
    isActive: true,
    operatingHours: {
      weekdays: '06:00 - 22:00',
      weekends: '07:00 - 21:00',
    },
    amenities: ['ATM', 'Convenience Store', 'Car Wash', 'Restroom'],
    commissionRate: 2.5,
    maxAdvanceAmount: 50000,
  },
  {
    id: 'station_002',
    name: 'Mobil Ikeja',
    address: 'Allen Avenue, Ikeja, Lagos State',
    phone: '+234-1-3456789',
    fuelTypes: ['PMS', 'AGO'],
    rating: 4.2,
    isActive: true,
    operatingHours: {
      weekdays: '05:30 - 23:00',
      weekends: '06:00 - 22:00',
    },
    amenities: ['ATM', 'Convenience Store', 'Restroom'],
    commissionRate: 2.0,
    maxAdvanceAmount: 40000,
  },
  {
    id: 'station_003',
    name: 'Shell Lekki',
    address: 'Lekki-Epe Expressway, Lekki Phase 1, Lagos',
    phone: '+234-1-4567890',
    fuelTypes: ['PMS', 'AGO', 'DPK', 'LPG'],
    rating: 4.7,
    isActive: true,
    operatingHours: {
      weekdays: '24/7',
      weekends: '24/7',
    },
    amenities: ['ATM', 'Convenience Store', 'Car Wash', 'Restroom', 'Restaurant'],
    commissionRate: 3.0,
    maxAdvanceAmount: 75000,
  },
];

export default function Stations() {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && station.isActive) ||
                         (statusFilter === 'inactive' && !station.isActive);
    return matchesSearch && matchesStatus;
  });

  const toggleStationStatus = (stationId: string) => {
    setStations(prev => prev.map(station => 
      station.id === stationId ? { ...station, isActive: !station.isActive } : station
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Partner Stations</h1>
            <p className="text-gray-600">Manage fuel station partnerships</p>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700">
            <PlusIcon className="h-5 w-5" />
            <span>Add Station</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Stations</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {filteredStations.map((station) => (
            <div key={station.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{station.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span className="line-clamp-2">{station.address}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  station.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {station.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Phone: {station.phone}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">Rating: </span>
                    <div className="flex items-center ml-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium ml-1">{station.rating}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Fuel Types:</p>
                  <div className="flex flex-wrap gap-1">
                    {station.fuelTypes.map((fuel) => (
                      <span key={fuel} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {fuel}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Operating Hours:</p>
                  <p className="text-sm text-gray-600">Weekdays: {station.operatingHours.weekdays}</p>
                  <p className="text-sm text-gray-600">Weekends: {station.operatingHours.weekends}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {station.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {amenity}
                      </span>
                    ))}
                    {station.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">+{station.amenities.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Commission Rate</p>
                    <p className="text-sm font-medium">{station.commissionRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Max Advance</p>
                    <p className="text-sm font-medium">₦{station.maxAdvanceAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-3">
                  <button
                    onClick={() => toggleStationStatus(station.id)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md ${
                      station.isActive 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {station.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-100 rounded-md hover:bg-primary-200">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
