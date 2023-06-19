function isLoggedIn(req, res, next) {
  console.log("is authenticated", req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else res.status(403).json({ message: "not authenticated" });
}

export const middleware = {
  isLoggedIn,
};
