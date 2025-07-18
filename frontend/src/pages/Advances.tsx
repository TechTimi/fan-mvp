import React, { useState } from 'react';
import { MagnifyingGlassIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Advance {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  station: string;
  fuelType: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  purpose?: string;
}

const mockAdvances: Advance[] = [
  {
    id: 'ADV_001',
    userId: '1',
    userName: 'John Doe',
    amount: 15000,
    station: 'Total Energies Victoria Island',
    fuelType: 'PMS',
    status: 'pending',
    requestDate: '2024-01-18T10:30:00Z',
    purpose: 'Business trip to Abuja',
  },
  {
    id: 'ADV_002',
    userId: '2',
    userName: 'Jane Smith',
    amount: 25000,
    station: 'Shell Lekki',
    fuelType: 'AGO',
    status: 'approved',
    requestDate: '2024-01-17T14:20:00Z',
    purpose: 'Weekly fuel allowance',
  },
  {
    id: 'ADV_003',
    userId: '3',
    userName: 'Mike Johnson',
    amount: 12000,
    station: 'Mobil Ikeja',
    fuelType: 'PMS',
    status: 'completed',
    requestDate: '2024-01-16T09:15:00Z',
  },
  {
    id: 'ADV_004',
    userId: '1',
    userName: 'John Doe',
    amount: 18000,
    station: 'Conoil Surulere',
    fuelType: 'PMS',
    status: 'rejected',
    requestDate: '2024-01-15T16:45:00Z',
    purpose: 'Emergency fuel request',
  },
];

export default function Advances() {
  const [advances, setAdvances] = useState<Advance[]>(mockAdvances);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAdvances = advances.filter(advance => {
    const matchesSearch = advance.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         advance.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         advance.station.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || advance.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (advanceId: string, newStatus: 'approved' | 'rejected') => {
    setAdvances(prev => prev.map(advance => 
      advance.id === advanceId ? { ...advance, status: newStatus } : advance
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Fuel Advances</h1>
        <p className="text-gray-600">Review and manage fuel advance requests</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search advances..."
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
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdvances.map((advance) => (
                <tr key={advance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{advance.id}</div>
                    {advance.purpose && (
                      <div className="text-sm text-gray-500">{advance.purpose}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{advance.userName}</div>
                    <div className="text-sm text-gray-500">ID: {advance.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₦{advance.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{advance.station}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {advance.fuelType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(advance.status)}`}>
                      {advance.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(advance.requestDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {advance.status === 'pending' && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(advance.id, 'approved')}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Approve"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(advance.id, 'rejected')}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Reject"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                    {advance.status !== 'pending' && (
                      <button className="text-primary-600 hover:text-primary-900">
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAdvances.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No advances found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
