const db = require("../models");
const ItemsModel = db.items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const item = {
    name: req.body.name,
    code: req.body.code,
    price: req.body.price
  };

  ItemsModel.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Items."
      });
    });
};
exports.findAll = (req, res) => {
  ItemsModel.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Items"
      });
    });
};

exports.findOne = (req, res) => {
  ItemsModel.findByPk(req.params.id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Items with id=" + id
      });
    });
};

exports.update = (req, res) => {
  ItemsModel.update(req.body, {
    where: { id: req.body.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Items was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Items with id=${req.body.id}. Maybe Items was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Items with id=" + req.body.id
      });
    });
};

exports.delete = (req, res) => {
  ItemsModel.destroy({
    where: { id: req.body.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Items was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Items with id=${req.body.id}. Maybe Items was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Items with id=" + req.body.id
      });
    });
};