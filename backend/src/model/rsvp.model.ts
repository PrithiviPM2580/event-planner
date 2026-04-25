import mongoose, { Schema, Document, Types } from "mongoose";

export enum RSVPStatus {
  GOING = "GOING",
  MAYBE = "MAYBE",
  NOT_GOING = "NOT_GOING",
}

export interface IRSVP extends Document {
  status: RSVPStatus;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const rsvpSchema = new Schema<IRSVP>(
  {
    status: {
      type: String,
      enum: Object.values(RSVPStatus),
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Equivalent of @@unique([userId, eventId])
rsvpSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export const RSVP = mongoose.model<IRSVP>("RSVP", rsvpSchema);
