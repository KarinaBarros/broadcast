import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Contact } from "../types";

const COLLECTION = "contacts";

export const createContact = async (data: Omit<Contact, "id" | "createdAt">) => {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: new Date(),
  });
};

export const subscribeContacts = (
  connectionId: string,
  callback: (data: Contact[]) => void
) => {
  const q = query(
    collection(db, COLLECTION),
    where("connectionId", "==", connectionId)
  );

  return onSnapshot(q, (snapshot) => {
    const data: Contact[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Contact, "id">),
    }));

    callback(data);
  });
};