export interface User {
  uid: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  creditScore: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  address?: string;
  dateOfBirth?: string;
  occupation?: string;
  monthlyIncome?: number;
}

export interface Advance {
  id: string;
  userId: string;
  amount: number;
  stationId: string;
  fuelType: 'PMS' | 'AGO' | 'DPK' | 'LPG';
  purpose?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  adminId?: string;
  reason?: string;
}

export interface Station {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email: string;
  fuelTypes: string[];
  operatingHours: {
    weekdays: string;
    weekends: string;
  };
  amenities: string[];
  rating: number;
  isActive: boolean;
  commissionRate: number;
  maxAdvanceAmount: number;
  qrCode: string;
}

export interface Payment {
  id: string;
  userId: string;
  advanceId: string;
  amount: number;
  provider: 'paystack' | 'flutterwave';
  reference: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
