import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

const monthlyData = [
  { month: 'Jan', advances: 65, revenue: 1250000, users: 120 },
  { month: 'Feb', advances: 78, revenue: 1480000, users: 145 },
  { month: 'Mar', advances: 90, revenue: 1720000, users: 168 },
  { month: 'Apr', advances: 81, revenue: 1580000, users: 152 },
  { month: 'May', advances: 95, revenue: 1850000, users: 189 },
  { month: 'Jun', advances: 110, revenue: 2100000, users: 215 },
];

const fuelTypeData = [
  { name: 'PMS', value: 65, color: '#2196f3' },
  { name: 'AGO', value: 25, color: '#4caf50' },
  { name: 'DPK', value: 8, color: '#ff9800' },
  { name: 'LPG', value: 2, color: '#9c27b0' },
];

const stationPerformance = [
  { station: 'Total VI', advances: 45, revenue: 850000 },
  { station: 'Shell Lekki', advances: 38, revenue: 720000 },
  { station: 'Mobil Ikeja', advances: 32, revenue: 610000 },
  { station: 'Conoil Surulere', advances: 28, revenue: 530000 },
  { station: 'NNPC Abuja', advances: 25, revenue: 475000 },
];

const creditScoreDistribution = [
  { range: '300-499', count: 45, color: '#f44336' },
  { range: '500-649', count: 120, color: '#ff9800' },
  { range: '650-749', count: 180, color: '#4caf50' },
  { range: '750-850', count: 95, color: '#2196f3' },
];

export default function Analytics() {
  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const totalAdvances = monthlyData.reduce((sum, month) => sum + month.advances, 0);
  const averageAdvanceValue = totalRevenue / totalAdvances;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into FAN performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">₦{(totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-gray-500">Last 6 months</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Advances</h3>
          <p className="text-2xl font-bold text-blue-600">{totalAdvances}</p>
          <p className="text-sm text-gray-500">Last 6 months</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Advance Value</h3>
          <p className="text-2xl font-bold text-purple-600">₦{Math.round(averageAdvanceValue).toLocaleString()}</p>
          <p className="text-sm text-gray-500">Per transaction</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-2xl font-bold text-orange-600">1,234</p>
          <p className="text-sm text-green-500">+12% this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="advances" stroke="#2196f3" strokeWidth={2} name="Advances" />
              <Line type="monotone" dataKey="users" stroke="#4caf50" strokeWidth={2} name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fuel Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fuelTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {fuelTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Station Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="station" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="advances" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Credit Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={creditScoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₦${(value / 1000000).toFixed(1)}M`, 'Revenue']} />
            <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
