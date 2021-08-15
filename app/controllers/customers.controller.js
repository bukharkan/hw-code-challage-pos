const db = require("../models");
const CustomerModel = db.customer;


exports.profile = (req, res) => {
  CustomerModel.findByPk(req.userPhone)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't get profile customer"
      });
    });
};

exports.update = (req, res) => {
  CustomerModel.update(req.body, {
    where: { phone: req.userPhone }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Customer. Maybe Customer phone number is duplicate!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with message=" + err
      });
    });
};
