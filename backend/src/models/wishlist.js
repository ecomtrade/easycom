'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    productId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    price: DataTypes.DOUBLE(8,2),
    qty: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE(8,2)
  }, {});
  Wishlist.associate = function(models) {
    // associations can be defined here
    models.Cart.belongsTo(models.Users, { foreignKey: 'userId' });  
    models.Cart.belongsTo(models.Cart, { foreignKey: 'cartId' });
    models.Cart.belongsTo(models.Product, { foreignKey: 'productId' }); 
  };
  return Wishlist;
};