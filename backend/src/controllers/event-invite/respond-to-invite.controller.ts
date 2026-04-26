import { InviteStatus } from "@/model/event-invite.model";
import type { TypedRequest } from "@/types";
import { AppError } from "@/utils/error.util";
import type { RespondToInviteInput } from "@/validators/event-invite.validator";
import type { Response, NextFunction } from "express";
import { EventInvite } from "@/model/event-invite.model";

export const respondToInviteController = async (
  req: TypedRequest<RespondToInviteInput>,
  res: Response,
  next: NextFunction,
) => {
  const { inviteId } = req.params;
  const { status } = req.body;
  const userId = req.user?.id;

  if (![InviteStatus.ACCEPTED, InviteStatus.DECLINED].includes(status)) {
    return next(new AppError("Invalid status value", 400));
  }

  const invite = await EventInvite.findById(inviteId);

  if (!invite) {
    return next(new AppError("Invite not found", 404));
  }

  if (invite.inviteeId.toString() !== userId) {
    return next(
      new AppError("You are not allowed to respond to this invite", 403),
    );
  }

  if (invite.status !== InviteStatus.PENDING) {
    return next(new AppError("You have already responded to this invite", 400));
  }

  invite.status = status;
  await invite.save();

  res.status(200).json({
    success: true,
    message: `Invite ${status.toLowerCase()}`,
    invite,
  });
};
