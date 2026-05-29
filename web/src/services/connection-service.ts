import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";
import type { Connection } from "../types";

const COLLECTION = "connections";

export const createConnection = async (name: string) => {
  const user = auth.currentUser;
  const userId = user?.uid;
  try{
  await addDoc(collection(db, COLLECTION), {
    userId,
    name,
    createdAt: new Date(),
  });
  }catch(err){
    console.error(err);
   
  }
};

export const deleteConnection = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};

export const subscribeConnections = (
  userId: string,
  callback: (data: Connection[]) => void,
) => {
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const data: Connection[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Connection, "id">),
    }));

    callback(data);
  });
};
