import { Event } from "@/model/event.model";
import type { Response, NextFunction, Request } from "express";

export const getAllEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sort = req.query.sort === "oldest" ? 1 : -1;
  const filter: any = {};

  if (req.query.visibility) {
    filter.visibility = req.query.visibility;
  } else {
    filter.visibility = "PUBLIC";
  }

  if (req.query?.mine === "true") {
    filter.organizerId = req.user?.id;
  }

  const events = await Event.find(filter)
    .sort({ createdAt: sort })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Event.countDocuments(filter);

  res.status(200).json({
    success: true,
    events,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
};
