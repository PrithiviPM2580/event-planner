import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  maxAttendees?: number;
  isPublic: boolean;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    maxAttendees: {
      type: Number,
      default: null,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
