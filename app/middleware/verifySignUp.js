const db = require("../models");
const User = db.customer;

checkDuplicateNumber = (req, res, next) => {
  User.findOne({
    where: {
      phone: req.body.phone
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Phone Number is already in use!"
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateNumber: checkDuplicateNumber,
};

module.exports = verifySignUp;