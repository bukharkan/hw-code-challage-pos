module.exports = app => {
  const items = require("../controllers/items.controller.js");

  var router = require("express").Router();

  router.post("/add", items.create);
  router.get("/getAll", items.findAll);
  router.get("/find/:id", items.findOne);
  router.post("/delete", items.delete);
  router.post("/update", items.update);

  app.use('/api/items', router);
};