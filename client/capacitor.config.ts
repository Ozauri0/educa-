import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'educa+',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
