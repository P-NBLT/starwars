import express from "express";
import axios from "axios";
import { middleware } from "../utils/middleware";
import { db } from "../db/db";
import { handleStarWarsTableData } from "../services/starwars.services";

const router = express.Router();

router.get("/data", middleware.isLoggedIn, async (req, res) => {
  if (db.starWarsTableCache.length) {
    res.status(201).json({ data: db.starWarsTableCache });
  } else {
    console.log("loading");
    const response = await axios.get("http://swapi.dev/api/people");
    const data = response.data.results;

    await handleStarWarsTableData(data);

    res.status(201).json({ data });
  }
});

export default router;
