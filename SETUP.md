# KYROS Esports - Setup Guide

## Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Firebase configuration:
   - Get your Firebase config from the Firebase Console
   - Replace the placeholder values with your actual Firebase credentials

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment Variables

- `REACT_APP_FIREBASE_*` - Firebase configuration
- `REACT_APP_ENV` - Application environment (development, production, etc.)
- `REACT_APP_API_URL` - Base URL for API requests
- `REACT_APP_ENABLE_ANALYTICS` - Enable/disable analytics
- `REACT_APP_ENABLE_OFFLINE_MODE` - Enable/disable offline capabilities

## Project Structure

```
src/
  ├── assets/           # Static assets (images, fonts, etc.)
  ├── components/       # Reusable UI components
  ├── config/          # Configuration files
  ├── context/         # React context providers
  ├── firebase/        # Firebase configuration and services
  ├── hooks/           # Custom React hooks
  ├── pages/           # Page components
  ├── services/        # API and service layers
  ├── styles/          # Global styles and themes
  ├── utils/           # Utility functions and helpers
  └── App.js           # Main application component
```

## Deployment

### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting:
   ```bash
   firebase init hosting
   ```

4. Deploy to Firebase:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## Troubleshooting

- **Firebase not initializing**: Ensure all Firebase environment variables are set correctly in your `.env` file.
- **Missing environment variables**: Check the browser console for warnings about missing environment variables.
- **CORS issues**: Make sure your Firebase Security Rules are properly configured.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
