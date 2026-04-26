import { EventInvite, InviteStatus } from "@/model/event-invite.model";
import { AppError } from "@/utils/error.util";
import type { Request, Response, NextFunction } from "express";

export const cancelInviteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { inviteId } = req.params;
  const userId = req.user?.id;

  const invite = await EventInvite.findById(inviteId);

  if (!invite) {
    return next(new AppError("Invite not found", 404));
  }

  if (invite.inviterId.toString() !== userId) {
    return next(new AppError("You are not allowed to cancel this invite", 403));
  }

  if (invite.status !== InviteStatus.PENDING) {
    return next(new AppError("Only pending invites can be cancelled", 400));
  }

  await invite.deleteOne();

  res.status(200).json({
    success: true,
    message: "Invite cancelled successfully",
  });
};
