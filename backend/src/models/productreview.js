'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define('ProductReview', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    status: DataTypes.ENUM('active', 'inactive')
  }, {});
  ProductReview.associate = function(models) {
    // associations can be defined here
    models.ProductReview.belongsTo(models.Product, { foreignKey: 'productId' });
    models.ProductReview.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return ProductReview;
};