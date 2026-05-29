import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

admin.initializeApp();

export const processScheduledMessages = onSchedule(
  "every 1 minutes",
  async () => {
    const db = admin.firestore();
    const now = new Date();

    const snapshot = await db
      .collection("messages")
      .where("status", "==", "scheduled")
      .where("scheduledAt", "<=", now)
      .get();

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        status: "sent",
        sentAt: now,
      });
    });

    await batch.commit();
  }
);