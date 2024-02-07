import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.borja.starter',
  appName: 'ionic-assbook',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId: 'Web app client ID goes here! (Not the Android id)',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
