const db = require("../models");
const config = require("../config/auth.config");
const Customer = db.customer;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  // Save User to Database
  Customer.create({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address
  })
    .then(user => {
      res.send({ message: "Customer was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Customer.findOne({
    where: {
      phone: req.body.phone
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var token = jwt.sign({ id: user.phone }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        name: user.name,
        phone: user.phone,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};