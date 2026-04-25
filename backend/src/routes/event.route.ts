import { createEventController } from "@/controllers/event/create-event.controller";
import { deleteEventController } from "@/controllers/event/delete-event.controller";
import { getAllEventsController } from "@/controllers/event/gell-all-events.controller";
import { getSingleEventController } from "@/controllers/event/get-single-event.controller";
import { updateEventController } from "@/controllers/event/update-event.controller";
import asyncHandler from "@/middleware/async-handler.middleware";
import { requireAuth } from "@/middleware/require-auth.middleware";
import { validateRequest } from "@/middleware/validate-request.middleware";
import {
  createEventSchema,
  eventIdParamSchema,
  updateEventSchema,
} from "@/validators/event.validator";
import { Router } from "express";

const eventRouter: Router = Router();

eventRouter.post(
  "/",
  validateRequest({ body: createEventSchema }),
  requireAuth,
  asyncHandler(createEventController),
);

eventRouter.get("/", requireAuth, asyncHandler(getAllEventsController));

eventRouter.get(
  "/:eventId",
  validateRequest({ params: eventIdParamSchema }),
  requireAuth,
  asyncHandler(getSingleEventController),
);
eventRouter.patch(
  "/:eventId",
  validateRequest({ body: updateEventSchema, params: eventIdParamSchema }),
  requireAuth,
  asyncHandler(updateEventController),
);

eventRouter.delete(
  "/:eventId",
  validateRequest({ params: eventIdParamSchema }),
  requireAuth,
  asyncHandler(deleteEventController),
);
export default eventRouter;
