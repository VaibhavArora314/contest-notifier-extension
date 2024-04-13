import express from "express";
import rootRouter from "./routes";
import cors from "cors";

const app = express();
app.use(cors());

app.use('/api', rootRouter);

export default app;