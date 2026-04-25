import type { Response, NextFunction, Request } from "express";
import { Event } from "@/model/event.model";
import type { EventIdParamInput } from "@/validators/event.validator";
import { AppError } from "@/utils/error.util";

export const getSingleEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { eventId } = req.params as EventIdParamInput;

  const event = await Event.findById(eventId).lean();

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  if (
    event.visibility === "PRIVATE" &&
    event.organizerId.toString() !== req.user?.id
  ) {
    return next(new AppError("You do not have access to this event", 403));
  }

  res.status(200).json({
    success: true,
    event,
  });
};
