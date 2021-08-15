module.exports = app => {
  const transactions = require("../controllers/transactions.controller.js");
  const { authJwt } = require("../middleware");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.post("/create", [authJwt.verifyToken], transactions.create);

  router.get("/find/:id", [authJwt.verifyToken], transactions.findOne);

  app.use('/api/transactions', router);
};