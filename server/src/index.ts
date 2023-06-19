import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import starWarsRouter from "./routes/starwars";
import { initPassport, serializePassport } from "./utils/passport";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// Set up passport and initialize it ready to be used.
initPassport(app);
serializePassport();

// route
app.use("/auth", authRouter);
app.use("/starwars", starWarsRouter);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
