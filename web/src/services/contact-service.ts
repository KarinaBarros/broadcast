import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";

const COLLECTION = "contacts";

export const createContact = async (data: {
  name: string;
  phone: string;
  connectionId: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  await addDoc(collection(db, COLLECTION), {
    ...data,
    userId: user.uid,
    createdAt: new Date(),
  });
};


export const updateContact = async (
  id: string,
  data: Partial<{ name: string; phone: string }>
) => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteContact = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};


export const subscribeContacts = (callback: (data: any[]) => void) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", user.uid)
  );

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });
};