const db = require("../models");
const ItemsModel = db.items;
const TransactionModel = db.transactions;
const TransactionDetailModel = db.transactionDetail;

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let total = 0;
  const transaction = {
    customerPhone: req.userPhone,
  };
  TransactionModel.create(transaction)
    .then(data => {
      req.body.items.forEach(item => {
        const itemDetail = {
          transactionId: data.id,
          itemId: item.item,
          qty: item.qty
        };
        TransactionDetailModel.create(itemDetail);
        ItemsModel.findByPk(item.item).then(dataItem => {
          total += dataItem.price * item.qty;
          TransactionModel.update(
            { total: total }, {
            where: { id: data.id }
          });
        })
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Items."
      });
    })
  res.send({
    message: "Create Transaction Success !"
  });
};

exports.findOne = (req, res) => {
  TransactionModel.findAll({
    attributes: ['id', 'total', 'createdAt', 'updatedAt'],
    where: {
      id: req.params.id
    },
    include: [db.customer, db.transactionDetail]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Can't get profile customer"
      });
    });
};