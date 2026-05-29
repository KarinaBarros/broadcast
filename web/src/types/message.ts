export type MessageStatus = "scheduled" | "sent";

export type Message = {
  id: string;
  userId: string;
  connectionId: string;
  contactIds: string[];

  text: string;

  status: MessageStatus;

  scheduledAt: Date | null;
  sentAt: Date | null;

  createdAt: Date;
};