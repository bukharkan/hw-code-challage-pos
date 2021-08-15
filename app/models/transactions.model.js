module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customerPhone: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.INTEGER
    }
  });

  return Transaction;
};