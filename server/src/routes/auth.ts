import express from "express";
import passport from "passport";
import { db } from "../db/db";
import { serializePassport } from "../utils/passport";
const router = express.Router();

serializePassport();

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.send("profile");
  }
);
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const newUser = await db.users.createUser({ username, password });
  if (newUser) {
    res.status(201).json({ msg: "new user added succesfully", newUser });
  } else {
    res.status(500).json({ msg: "impossible to create new user" });
  }
});

router.get("/test", (req, res) => {
  res.json({ data: db.dataBase });
});

router.get("/logout", (req, res) => {
  //@ts-ignore
  req.logout();
  res.redirect("/login");
});

export default router;
