import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: https://firebase.google.com/docs/web/setup?hl=ko
// 가이드에 따라 firebase config를 설정합니다.
const firebaseConfig = {
 apiKey: "AIzaSyBOk1mlB6ZBmgeSd2-zR32tnAVw-5I0W_0",
  authDomain: "jtwedding-98fcc.firebaseapp.com",
  projectId: "jtwedding-98fcc",
  storageBucket: "jtwedding-98fcc.firebasestorage.app",
  messagingSenderId: "338679064088",
  appId: "1:338679064088:web:c944758a426543522fc56d",
  measurementId: "G-5CJK2YFY41"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(firebaseApp);
