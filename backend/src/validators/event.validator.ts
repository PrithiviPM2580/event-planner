import { z } from "zod";
import { Types } from "mongoose";

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE"),
});

export const eventIdParamSchema = z.object({
  eventId: z.string().refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid event ID",
  }),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type EventIdParamInput = z.infer<typeof eventIdParamSchema>;
