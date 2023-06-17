import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import starWarsRouter from "./routes/starwars";
import { initPassport } from "./utils/passport";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

initPassport(app);

app.use("/auth", authRouter);
app.use("/starwars", starWarsRouter);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
