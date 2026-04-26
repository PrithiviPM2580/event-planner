import { Router } from "express";
import asyncHandler from "@/middleware/async-handler.middleware";
import { requireAuth } from "@/middleware/require-auth.middleware";
import { validateRequest } from "@/middleware/validate-request.middleware";
import { createEventInviteSchema } from "@/validators/event-invite.validator";
import { createEventInviteController } from "@/controllers/event-invite/send-event-invite.controller";
import { getReceiveInviteController } from "@/controllers/event-invite/get-receive-invite.controller";

const eventInviteRouter = Router();

eventInviteRouter.post(
  "/",
  validateRequest({ body: createEventInviteSchema }),
  requireAuth,
  asyncHandler(createEventInviteController),
);

eventInviteRouter.get(
  "/received",
  requireAuth,
  asyncHandler(getReceiveInviteController),
);

export default eventInviteRouter;
