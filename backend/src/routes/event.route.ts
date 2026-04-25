import { createEventController } from "@/controllers/event/create-event.controller";
import asyncHandler from "@/middleware/async-handler.middleware";
import { requireAuth } from "@/middleware/require-auth.middleware";
import { validateRequest } from "@/middleware/validate-request.middleware";
import { createEventSchema } from "@/validators/event.validator";
import { Router } from "express";

const eventRouter: Router = Router();

eventRouter.post(
  "/",
  validateRequest({ body: createEventSchema }),
  requireAuth,
  asyncHandler(createEventController),
);

export default eventRouter;
