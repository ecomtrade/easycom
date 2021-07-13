'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE(8,2),
    status: DataTypes.ENUM('active', 'inactive'),
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    models.Cart.belongsTo(models.Users, { foreignKey: 'userId' });  
    models.Cart.belongsTo(models.Order, { foreignKey: 'orderId' });
    models.Cart.belongsTo(models.Product, { foreignKey: 'productId' }); 
  };
  return Cart;
};