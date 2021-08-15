module.exports = app => {
  const customer = require("../controllers/auth.controller.js");
  const { verifySignUp } = require("../middleware");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  var router = require("express").Router();

  router.post("/signup", [
    verifySignUp.checkDuplicateNumber,
  ], customer.signup);

  router.post("/signin", customer.signin);

  app.use('/api/auth', router);
};