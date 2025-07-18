# FAN MVP Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Firebase project
- Google Maps API key
- Termii API credentials
- Paystack/Flutterwave test keys

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/TechTimi/fan-mvp.git
cd fan-mvp
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Set up environment variables**

Copy the example files and fill in your credentials:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp mobile/.env.example mobile/.env
```

4. **Firebase Setup**
- Create a Firebase project
- Enable Authentication and Firestore
- Download service account key
- Update environment variables

5. **Google Maps Setup**
- Enable Google Maps JavaScript API
- Enable Google Maps SDK for Android/iOS
- Update API key in environment variables

## Development

### Backend
```bash
cd backend
npm run dev
```

### Frontend (Admin Panel)
```bash
cd frontend
npm run dev
```

### Mobile App
```bash
cd mobile
expo start
```

## Deployment

### Backend (Fly.io)
```bash
cd backend
fly deploy
```

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Mobile App (Expo EAS)
```bash
cd mobile
eas build --platform all
eas submit
```

## API Documentation

The backend API provides comprehensive endpoints for authentication, user management, fuel advances, station management, payments, and admin operations. See docs/API.md for detailed documentation.

## Troubleshooting

### Common Issues

1. **Firebase connection issues**
   - Verify service account credentials
   - Check project ID and configuration

2. **Payment integration issues**
   - Ensure test keys are properly configured
   - Check API endpoints and credentials

3. **Mobile app build issues**
   - Update Expo CLI to latest version
   - Clear cache: `expo start --clear`

4. **Maps not loading**
   - Verify Google Maps API key
   - Check API restrictions and billing

## Support

For support, please contact the development team or create an issue in the repository.
