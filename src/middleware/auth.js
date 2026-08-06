//middleware for auth.js
import passport from "passport";
//middleware for testing the token
//uses the Passport BearerStrategy
const isAuthenticated = (req, res, next) => {
  passport.authenticate("bearer", {
    session: false,
    failWithError: true,
  })(req, res, (err) => {
    if (err) {
      // exit and return the error
      res.status(498).json({ error: 498, message: "Invalid bearer token." });
      return;
    }
    next();
  });
};

export { isAuthenticated };
