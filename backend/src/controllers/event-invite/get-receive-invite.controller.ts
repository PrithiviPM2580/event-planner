import { EventInvite } from "@/model/event-invite.model";
import type { Request, Response, NextFunction } from "express";

export const getReceiveInviteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;

  const invites = await EventInvite.find({
    inviteeId: userId,
  })
    .populate("eventId inviterId")
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    count: invites.length,
    invites,
  });
};
