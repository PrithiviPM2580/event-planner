import { Event } from "@/model/event.model";
import type { CreateEventInput } from "@/validators/event.validator";
import type { Response, NextFunction } from "express";
import type { TypedRequest } from "@/types";

export const createEventController = async (
  req: TypedRequest<CreateEventInput>,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;

  const { title, description, location, startDate, endDate, visibility } =
    req.body;

  const event = await Event.create({
    title,
    description,
    location,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    visibility,
    organizerId: userId,
  });

  res.status(201).json({
    success: true,
    event,
  });
};
