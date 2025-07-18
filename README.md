# Fuel Advance Network (FAN) MVP

A comprehensive fintech application for fuel advances, connecting drivers with partner fuel stations through a seamless payment platform.

## 🚀 Features

### Mobile App (React Native + Expo)
- User registration and authentication
- Credit assessment and scoring
- Fuel advance requests
- Partner station finder with Google Maps
- Real-time payment processing
- Transaction history
- Push notifications via Termii

### Admin Panel (React Web)
- User management
- Advance request approval/denial
- Partner station management
- Analytics dashboard
- Payment monitoring
- Credit scoring oversight

### Backend API (Node.js)
- RESTful API with Express.js
- Firebase Authentication integration
- Firebase Firestore database
- Payment processing (Paystack/Flutterwave)
- Termii SMS/messaging integration
- Google Maps location services

## 🛠 Tech Stack

- **Frontend**: React.js (Vercel deployment)
- **Mobile**: React Native + Expo (EAS deployment)
- **Backend**: Node.js + Express (Fly.io deployment)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **UI Components**: NativeBase
- **Maps**: Google Maps API
- **Messaging**: Termii API
- **Payments**: Paystack & Flutterwave (test keys)

## 📱 User Flow

1. **Registration**: Users sign up with phone number verification
2. **Credit Assessment**: Automated scoring based on provided information
3. **Advance Request**: Users request fuel advances with amount and station
4. **Approval Process**: Admin reviews and approves/denies requests
5. **Station Selection**: Users find nearby partner stations via map
6. **Fuel Dispensing**: QR code verification at station
7. **Payment Settlement**: Automatic payment processing and settlement

## 🏗 Project Structure

```
fan-mvp/
├── mobile/                 # React Native + Expo app
├── frontend/              # React.js admin panel
├── backend/               # Node.js API server
├── shared/                # Shared utilities and types
├── docs/                  # Documentation
└── deployment/            # Deployment configurations
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- Firebase project setup
- Google Maps API key
- Termii API credentials
- Paystack/Flutterwave test keys

### Installation

1. Clone the repository
```bash
git clone https://github.com/TechTimi/fan-mvp.git
cd fan-mvp
```

2. Install dependencies
```bash
npm install
cd mobile && npm install
cd ../frontend && npm install
cd ../backend && npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Fill in your API keys and credentials
```

4. Start development servers
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# Mobile
cd mobile && expo start
```

## 🌐 Deployment

- **Frontend**: Deployed on Vercel
- **Mobile App**: Built and distributed via Expo EAS
- **Backend**: Deployed on Fly.io
- **Database**: Firebase Firestore (cloud)

## 📄 License

MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@fan-mvp.com or join our Slack channel.
