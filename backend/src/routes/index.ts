import { Router } from "express";
import contestRouter from "./contest/contest.route";

const rootRouter = Router();

rootRouter.use('/contests', contestRouter);

export default rootRouter;