import { z } from "zod";

export const createEventInviteSchema = z.object({
  eventId: z.string().nonempty("Event ID is required"),
  inviteeId: z.string().nonempty("Invitee ID is required"),
});

export type CreateEventInviteInput = z.infer<typeof createEventInviteSchema>;
