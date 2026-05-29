import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import type { User } from "firebase/auth";

export const register = async (
  email: string,
  password: string,
): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  return result.user;
};

export const login = async (email: string, password: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return result.user;
};

export const logout = async () => {
  return signOut(auth);
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
