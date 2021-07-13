'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderNumber: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    subTotal: DataTypes.DOUBLE(8, 2),
    totalAmount: DataTypes.DOUBLE(8, 2),
    qty: DataTypes.INTEGER,
    paymentMethod: DataTypes.ENUM('cod', 'paypal', 'stripe'),
    paymentStatus: DataTypes.ENUM('paid', 'unpaid'),
    status: DataTypes.ENUM('active', 'inactive'),
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    postCode: DataTypes.STRING,
    addressOne: DataTypes.TEXT,
    addressTwo: DataTypes.TEXT
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    models.Order.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return Order;
};