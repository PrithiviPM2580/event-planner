import { z } from "zod";
import { Types } from "mongoose";

export const createEventInviteSchema = z.object({
  eventId: z
    .string()
    .nonempty("Event ID is required")
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "Invalid Event ID format",
    }),
  inviteeId: z
    .string()
    .nonempty("Invitee ID is required")
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "Invalid Invitee ID format",
    }),
});

export type CreateEventInviteInput = z.infer<typeof createEventInviteSchema>;
