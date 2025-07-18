import React from 'react';
import { 
  UsersIcon, 
  CreditCardIcon, 
  MapPinIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { name: 'Total Users', value: '1,234', icon: UsersIcon, change: '+12%', changeType: 'increase' },
  { name: 'Active Advances', value: '89', icon: CreditCardIcon, change: '+5%', changeType: 'increase' },
  { name: 'Partner Stations', value: '45', icon: MapPinIcon, change: '+2%', changeType: 'increase' },
  { name: 'Total Volume', value: '₦2.4M', icon: CurrencyDollarIcon, change: '+18%', changeType: 'increase' },
];

const chartData = [
  { name: 'Jan', advances: 65, payments: 58 },
  { name: 'Feb', advances: 78, payments: 72 },
  { name: 'Mar', advances: 90, payments: 85 },
  { name: 'Apr', advances: 81, payments: 79 },
  { name: 'May', advances: 95, payments: 89 },
  { name: 'Jun', advances: 110, payments: 105 },
];

const recentAdvances = [
  { id: 'ADV_001', user: 'John Doe', amount: '₦15,000', status: 'pending', station: 'Total VI' },
  { id: 'ADV_002', user: 'Jane Smith', amount: '₦25,000', status: 'approved', station: 'Shell Lekki' },
  { id: 'ADV_003', user: 'Mike Johnson', amount: '₦12,000', status: 'completed', station: 'Mobil Ikeja' },
  { id: 'ADV_004', user: 'Sarah Wilson', amount: '₦18,000', status: 'pending', station: 'Conoil Surulere' },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the FAN Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Advances & Payments Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="advances" stroke="#2196f3" strokeWidth={2} />
              <Line type="monotone" dataKey="payments" stroke="#4caf50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Advances</h3>
          <div className="space-y-4">
            {recentAdvances.map((advance) => (
              <div key={advance.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{advance.user}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      advance.status === 'completed' ? 'bg-green-100 text-green-800' :
                      advance.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      advance.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {advance.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{advance.station}</p>
                  <p className="text-sm font-medium text-gray-900">{advance.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
