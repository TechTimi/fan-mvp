import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  MapPinIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Advances', href: '/advances', icon: CreditCardIcon },
  { name: 'Stations', href: '/stations', icon: MapPinIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary-600">FAN Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 ${
                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="px-4">
                <button
                  onClick={handleLogout}
                  className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full"
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex-1 lg:ml-0">
          <div className="lg:hidden">
            <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-600"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">FAN Admin</h1>
              <div className="w-6" />
            </div>
          </div>
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
