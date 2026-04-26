import type { TypedRequest } from "@/types";
import { AppError } from "@/utils/error.util";
import type { CreateEventInviteInput } from "@/validators/event-invite.validator";
import type { Response, NextFunction } from "express";
import { Event } from "@/model/event.model";
import { EventInvite, InviteStatus } from "@/model/event-invite.model";

export const createEventInviteController = async (
  req: TypedRequest<CreateEventInviteInput>,
  res: Response,
  next: NextFunction,
) => {
  const { eventId, inviteeId } = req.body;

  const inviterId = req.user?.id;

  if (inviteeId === inviterId) {
    return next(new AppError("You cannot invite yourself to an event", 400));
  }

  const event = await Event.findById(eventId);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  if (event.organizerId.toString() !== inviterId) {
    return next(new AppError("Only the event organizer can send invites", 403));
  }

  const existingInvite = await EventInvite.findOne({ eventId, inviteeId });

  if (existingInvite) {
    return next(
      new AppError(
        "An invite has already been sent to this user for this event",
        400,
      ),
    );
  }

  const newInvite = await EventInvite.create({
    eventId,
    inviterId,
    inviteeId,
    status: InviteStatus.PENDING,
  });

  res.status(201).json({
    success: true,
    newInvite,
  });
};
