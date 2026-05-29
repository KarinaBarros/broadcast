import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { MessageStatus } from "../types";

const COLLECTION = "messages";

export const createMessage = async (text: string, scheduledAt: Date | null) => {
  const status: MessageStatus = scheduledAt ? "scheduled" : "sent";

  await addDoc(collection(db, COLLECTION), {
    text,
    scheduledAt,
    status,
    sentAt: scheduledAt ? null : new Date(),
    createdAt: new Date(),
  });
};
