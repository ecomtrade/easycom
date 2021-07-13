'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductPhoto = sequelize.define('ProductPhoto', {
    productId: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT
  }, {});
  ProductPhoto.associate = function(models) {
    // associations can be defined here
    models.ProductPhoto.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return ProductPhoto;
};