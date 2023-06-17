import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
