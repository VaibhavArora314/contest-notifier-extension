import express from "express";
import rootRouter from "./routes";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', rootRouter);

export default app;