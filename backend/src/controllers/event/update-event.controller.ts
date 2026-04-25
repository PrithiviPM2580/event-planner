import type { Response, NextFunction, Request } from "express";
import { Event } from "@/model/event.model";
import type { TypedRequest } from "@/types";
import type { UpdateEventInput } from "@/validators/event.validator";
import { AppError } from "@/utils/error.util";

export const updateEventController = async (
  req: TypedRequest<UpdateEventInput>,
  res: Response,
  next: NextFunction,
) => {
  const { eventId } = req.params;
  const userId = req.user?.id;

  const event = await Event.findById(eventId);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  if (event.organizerId.toString() !== userId) {
    return next(new AppError("Unauthorized", 403));
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      ...req.body,
      startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
      endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
    },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    updatedEvent,
  });
};
