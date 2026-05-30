import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";
import type { Connection } from "../types";

const COLLECTION = "connections";

// 🔥 helper interno
const getUser = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return user;
};

// CREATE
export const createConnection = async (name: string) => {
  const user = getUser();

  await addDoc(collection(db, COLLECTION), {
    name,
    userId: user.uid,
    createdAt: new Date(),
  });
};

// UPDATE
export const updateConnection = async (id: string, name: string) => {
  await updateDoc(doc(db, COLLECTION, id), {
    name,
  });
};

// DELETE
export const deleteConnection = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};

// SUBSCRIBE LIST (CONEXÕES DO USUÁRIO)
export const subscribeConnections = (
  callback: (data: Connection[]) => void
) => {
  const user = getUser();

  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", user.uid)
  );

  return onSnapshot(q, (snapshot) => {
    const data: Connection[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Connection, "id">),
    }));

    callback(data);
  });
};

// 🔥 MAPA ID -> NOME (O QUE ESTAVA FALTANDO)
export const subscribeConnectionsMap = (callback: (map: Record<string, string>) => void) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return onSnapshot(collection(db, "connections"), (snapshot) => {
    const map: Record<string, string> = {};

    snapshot.docs
      .map((doc) => doc.data() as any)
      .filter((c) => c.userId === user.uid) // 🔥 filtro no front
      .forEach((c, index) => {
        const doc = snapshot.docs[index];
        map[doc.id] = c.name;
      });

    callback(map);
  });

};
