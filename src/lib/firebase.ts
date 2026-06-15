import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth;

export function initFirebase() {
  if (!getApps().length) { app = initializeApp(firebaseConfig); }
  else { app = getApps()[0]; }
  auth = getAuth(app);
  return { app, auth };
}

export function getFirebaseAuth() {
  if (!auth) { const initialized = initFirebase(); auth = initialized.auth; }
  return auth;
}

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export async function signInWithGoogle() { const auth = getFirebaseAuth(); const result = await signInWithPopup(auth, googleProvider); return result.user; }
export async function signInWithFacebook() { const auth = getFirebaseAuth(); const result = await signInWithPopup(auth, facebookProvider); return result.user; }
export async function signInWithEmail(email: string, password: string) { const auth = getFirebaseAuth(); const result = await signInWithEmailAndPassword(auth, email, password); return result.user; }
export async function signUpWithEmail(email: string, password: string, displayName?: string) { const auth = getFirebaseAuth(); const result = await createUserWithEmailAndPassword(auth, email, password); if (displayName) { await updateProfile(result.user, { displayName }); } return result.user; }
export async function resetPassword(email: string) { const auth = getFirebaseAuth(); await sendPasswordResetEmail(auth, email); }
export async function logout() { const auth = getFirebaseAuth(); await signOut(auth); }
export { onAuthStateChanged };