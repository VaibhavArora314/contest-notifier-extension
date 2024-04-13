import { Request, Response, Router } from "express";
import contestRouter from "./contest/contest.route";

const rootRouter = Router();

rootRouter.get('/', (req:Request,res:Response) => {
    res.json({
        message: "Hello"
    })
})
rootRouter.use('/contests', contestRouter);

export default rootRouter;