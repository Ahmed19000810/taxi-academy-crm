"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import type { AuthState, AppUser, UserRole } from "@/types";

interface AuthContextValue extends AuthState { user: AppUser | null; refreshUser: () => Promise<void>; }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toAppUser(firebaseUser: User): AppUser {
  return { uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName, photoURL: firebaseUser.photoURL, role: "agent" as UserRole, createdAt: new Date(), lastLoginAt: new Date(), isActive: true };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true, isAuthenticated: false });
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) { setState({ user: toAppUser(firebaseUser), isLoading: false, isAuthenticated: true }); }
      else { setState({ user: null, isLoading: false, isAuthenticated: false }); }
    });
    return () => unsubscribe();
  }, []);
  const refreshUser = async () => {
    const auth = getFirebaseAuth(); const firebaseUser = auth.currentUser;
    if (firebaseUser) { setState((prev) => ({ ...prev, user: toAppUser(firebaseUser) })); }
  };
  return (<AuthContext.Provider value={{ ...state, refreshUser }}>{children}</AuthContext.Provider>);
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) { throw new Error("useAuth must be used within an AuthProvider"); }
  return context;
}