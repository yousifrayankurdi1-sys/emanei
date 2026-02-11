
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// فحص بسيط للتأكد من وجود الإعدادات قبل التهيئة
const isConfigValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// تصدير الخدمات مع معالجة احتمالية غياب الإعدادات
export const db = isConfigValid ? getFirestore(app) : null;
export const auth = isConfigValid ? getAuth(app) : null;
export const firebaseReady = isConfigValid;
