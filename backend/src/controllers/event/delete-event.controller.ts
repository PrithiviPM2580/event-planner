import type { Response, NextFunction, Request } from "express";
import { Event } from "@/model/event.model";
import { AppError } from "@/utils/error.util";

export const deleteEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { eventId } = req.params;
  const userId = req.user?.id;

  const event = await Event.findById(eventId).lean();

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  if (event.organizerId.toString() !== userId) {
    return next(new AppError("Unauthorized", 403));
  }

  await Event.findByIdAndDelete(eventId);

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
};
