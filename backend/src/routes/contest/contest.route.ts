import { Router } from "express";
import { UpcomingContestsController } from "./contest.controller";

const contestRouter = Router();

contestRouter.get("/upcoming", UpcomingContestsController);

export default contestRouter;
