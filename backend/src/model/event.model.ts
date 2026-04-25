import mongoose, { Schema, Document, Types } from "mongoose";

export enum EventVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface IEvent extends Document {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  visibility: EventVisibility;
  organizerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    visibility: {
      type: String,
      enum: Object.values(EventVisibility),
      default: EventVisibility.PRIVATE,
    },
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Event =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);
