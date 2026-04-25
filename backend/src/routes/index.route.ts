import { Router } from "express";
import eventRouter from "./event.route";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/events", eventRouter);

export default router;
