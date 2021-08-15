module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  });

  return Items;
};