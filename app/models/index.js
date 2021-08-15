const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.items = require("./items.model.js")(sequelize, Sequelize);
db.customer = require("./customers.model.js")(sequelize, Sequelize);
db.transactions = require("./transactions.model.js")(sequelize, Sequelize);
db.transactionDetail = require("./transaction-details.model.js")(sequelize, Sequelize);

db.transactions.belongsTo(db.customer, {
  foreignKey: 'customerPhone',
  targetKey: 'phone',
  onDelete: 'cascade'
});

db.customer.hasMany(db.transactions, {
  foreignKey: 'customerPhone',
  targetKey: 'phone',
  onDelete: 'cascade'
});

db.transactionDetail.belongsTo(db.transactions, {
  foreignKey: 'transactionId',
  onDelete: 'cascade'
});

db.transactions.hasMany(db.transactionDetail, {
  foreignKey: 'transactionId',
  onDelete: 'cascade'
});


db.transactionDetail.belongsTo(db.items, {
  foreignKey: 'itemId',
  onDelete: 'cascade'
});

db.items.hasMany(db.transactionDetail, {
  foreignKey: 'itemId',
  onDelete: 'cascade'
});

module.exports = db;