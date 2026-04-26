import { Router } from "express";
import asyncHandler from "@/middleware/async-handler.middleware";
import { requireAuth } from "@/middleware/require-auth.middleware";
import { validateRequest } from "@/middleware/validate-request.middleware";
import {
  createEventInviteSchema,
  eventInviteParamsSchema,
  respondToInviteSchema,
} from "@/validators/event-invite.validator";
import { createEventInviteController } from "@/controllers/event-invite/send-event-invite.controller";
import { getReceiveInviteController } from "@/controllers/event-invite/get-receive-invite.controller";
import { getSentInviteController } from "@/controllers/event-invite/get-sent-invite.controller";
import { respondToInviteController } from "@/controllers/event-invite/respond-to-invite.controller";
import { cancelInviteController } from "@/controllers/event-invite/cancel-invite.controller";

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

eventInviteRouter.get(
  "/sent",
  requireAuth,
  asyncHandler(getSentInviteController),
);

eventInviteRouter.patch(
  "/:inviteId",
  validateRequest({
    params: eventInviteParamsSchema,
    body: respondToInviteSchema,
  }),
  requireAuth,
  asyncHandler(respondToInviteController),
);

eventInviteRouter.delete(
  "/:inviteId",
  validateRequest({ params: eventInviteParamsSchema }),
  requireAuth,
  asyncHandler(cancelInviteController),
);

export default eventInviteRouter;
