import { getAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApp, getApps } from '@firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyARrrGqvt8rWzCCONWRxG5NkoYu8mb2LsI",
    authDomain: "visage-f4e07.firebaseapp.com",
    projectId: "visage-f4e07",
    storageBucket: "visage-f4e07.appspot.com",
    messagingSenderId: "67068203145",
    appId: "1:67068203145:web:8d9e5cc7a5500d7438f658"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)}) : getApp();

export default app;