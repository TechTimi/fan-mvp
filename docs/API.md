# FAN MVP API Documentation

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://fan-mvp-backend.fly.dev/api`

## Authentication

All protected endpoints require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

## Endpoints

### Health Check
```http
GET /health
```
Returns API health status.

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "phone": "+234801234567",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123"
}
```

#### Verify Phone
```http
POST /auth/verify-phone
Content-Type: application/json

{
  "phone": "+234801234567",
  "code": "1234"
}
```

### Users

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Main St",
  "occupation": "Engineer",
  "monthlyIncome": 150000
}
```

### Advances

#### Request Advance
```http
POST /advances/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 15000,
  "stationId": "station_001",
  "fuelType": "PMS",
  "purpose": "Business trip"
}
```

#### Get Advance History
```http
GET /advances/history
Authorization: Bearer <token>
```

### Stations

#### Get Partner Stations
```http
GET /stations?lat=6.4281&lng=3.4219&radius=10&fuelType=PMS
Authorization: Bearer <token>
```

### Payments

#### Initialize Payment
```http
POST /payments/initialize
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 15000,
  "advanceId": "advance_123",
  "provider": "paystack"
}
```

### Admin (Requires Admin Role)

#### Get All Advances
```http
GET /admin/advances?status=pending&limit=50
Authorization: Bearer <admin-token>
```

#### Update Advance Status
```http
PUT /admin/advances/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "approved",
  "reason": "Credit check passed"
}
```

## Data Models

### User
```typescript
interface User {
  uid: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  creditScore: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Advance
```typescript
interface Advance {
  id: string;
  userId: string;
  amount: number;
  stationId: string;
  fuelType: 'PMS' | 'AGO' | 'DPK' | 'LPG';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
```
