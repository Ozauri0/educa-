import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.miproyecto.miapp',
  appName: 'Educa+',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
