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
import type { Message } from "../types";

const COLLECTION = "messages";

export const createMessage = async (data: {
  connectionId: string;
  contactIds: string[];
  text: string;
  scheduledAt: Date | null;
  status: "sent" | "scheduled";
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  await addDoc(collection(db, COLLECTION), {
    ...data,
    userId: user.uid,
    sentAt: data.status === "sent" ? new Date() : null,
    createdAt: new Date(),
  });
};

export const updateMessage = async (
  id: string,
  data: Partial<Pick<Message, "text" | "scheduledAt" | "status">>
) => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteMessage = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};

export const subscribeMessages = (callback: (data: Message[]) => void) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", user.uid)
  );

  return onSnapshot(q, (snapshot) => {
    const data: Message[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Message, "id">),
    }));

    callback(data);
  });
};
