import express from "express";
import passport from "passport";
import { db } from "../db/db";
import { middleware } from "../utils/middleware";

const router = express.Router();

router.get("/login", middleware.isLoggedIn, (req, res) => {
  res.status(200).json({ msg: "user already logged in" });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  //@ts-ignore
  res.json({ message: "profile", session: req.session });
});

router.get("/logout", (req, res) => {
  //@ts-ignore
  req.logout();
  res.redirect("/login");
});

router.post(
  "/register",
  async (req, res, next) => {
    const { username, password, email } = req.body;

    const newUser = await db.users.createUser({ username, password, email });

    if (newUser) {
      next();
    } else {
      res.status(500).json({ msg: "impossible to create new user" });
    }
  },
  passport.authenticate("local"),
  (req, res) => {
    //@ts-ignore
    console.log("auth", req.isAuthenticated());
    //@ts-ignore
    res.status(202).json({ msg: "success registered and logged in" });
  }
);

router.get("/verify", middleware.isLoggedIn, (req, res) => {
  //@ts-ignore
  console.log("is Authenticated", req.isAuthenticated());
  //@ts-ignore
  res.status(200).json(req.session);
});

export default router;
