import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../lib/firebase";
import type { Connection } from "../types";

const COLLECTION = "connections";

export const createConnection = async (
  userId: string,
  name: string
) => {
  await addDoc(collection(db, COLLECTION), {
    userId,
    name,
    createdAt: new Date(),
  });
};

export const deleteConnection = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};

export const subscribeConnections = (
  userId: string,
  callback: (data: Connection[]) => void
) => {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const data: Connection[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Connection, "id">),
    }));

    callback(data);
  });
};