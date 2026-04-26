import { Router } from "express";
import eventRouter from "./event.route";
import eventInviteRouter from "./event-invite.route";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/events", eventRouter);
router.use("/api/invites", eventInviteRouter);
export default router;
