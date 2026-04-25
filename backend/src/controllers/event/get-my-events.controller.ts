import type { Response, NextFunction, Request } from "express";
import { Event } from "@/model/event.model";

export const getMyEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;

  const events = await Event.find({
    organizerId: userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    count: events.length,
    events,
  });
};
