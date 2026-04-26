import { z } from "zod";
import { Types } from "mongoose";
import { InviteStatus } from "@/model/event-invite.model";

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

export const respondToInviteSchema = z.object({
  status: z.enum([InviteStatus.ACCEPTED, InviteStatus.DECLINED]),
});

export const eventInviteParamsSchema = z.object({
  inviteId: z
    .string()
    .nonempty("Invite ID is required")
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "Invalid Invite ID format",
    }),
});

export type CreateEventInviteInput = z.infer<typeof createEventInviteSchema>;
export type RespondToInviteInput = z.infer<typeof respondToInviteSchema>;
export type EventInviteParamsInput = z.infer<typeof eventInviteParamsSchema>;
