module.exports = (sequelize, Sequelize) => {
  const TransactionDetail = sequelize.define("transaction-detail", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    transactionId: {
      type: Sequelize.UUID
    },
    itemId: {
      type: Sequelize.UUID
    },
    qty: {
      type: Sequelize.INTEGER
    }
  });

  return TransactionDetail;
};