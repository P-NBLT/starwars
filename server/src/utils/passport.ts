import passport from "passport";
import { db } from "../db/db";
import session from "express-session";
import { Strategy } from "passport-local";

const store = new session.MemoryStore();

export function initPassport(app) {
  app.use(
    session({
      secret: "secret-key",
      cookie: { maxAge: 300000000, secure: false },
      resave: false,
      saveUninitialized: false,
      store,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new Strategy(function (username, password, done) {
      db.users.findUser(username, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user.password != password) return done(null, false);
        return done(null, user);
      });
    })
  );
}

export function serializePassport() {
  // Complete the serializeUser function below:
  passport.serializeUser((user, done) => {
    return done(null, {
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });

  // Complete the deserializeUser function below:
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}
