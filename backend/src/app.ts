import express, {Request, Response} from "express";
import rootRouter from "./routes";

const app = express();

app.get('/', (req:Request,res:Response) => {
    res.json({
        message: "Hello"
    })
})

app.use('/api', rootRouter);

export default app;