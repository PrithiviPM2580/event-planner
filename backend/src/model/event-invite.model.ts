import mongoose, { Schema, Document, Types } from "mongoose";

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export interface IEventInvite extends Document {
  eventId: Types.ObjectId;
  inviterId: Types.ObjectId;
  inviteeId: Types.ObjectId;
  status: InviteStatus;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const eventInviteSchema = new Schema<IEventInvite>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    inviterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inviteeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(InviteStatus),
      default: InviteStatus.PENDING,
    },
    respondedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

eventInviteSchema.index({ eventId: 1, inviteeId: 1 }, { unique: true });

export const EventInvite =
  mongoose.models.EventInvite ||
  mongoose.model<IEventInvite>("EventInvite", eventInviteSchema);
