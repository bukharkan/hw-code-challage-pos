module.exports = app => {
  const customer = require("../controllers/customers.controller.js");
  const { authJwt } = require("../middleware");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.get("/profile", [authJwt.verifyToken], customer.profile);

  router.post("/update", [authJwt.verifyToken], customer.update);

  app.use('/api/customer', router);
};