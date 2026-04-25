import mongoose, { Schema, Document, Types } from "mongoose";

export enum AttendanceStatus {
  GOING = "GOING",
  MAYBE = "MAYBE",
  NOT_GOING = "NOT_GOING",
}

export interface IAttendance extends Document {
  status: AttendanceStatus;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
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
attendanceSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export const Attendance = mongoose.model<IAttendance>(
  "Attendance",
  attendanceSchema,
);
