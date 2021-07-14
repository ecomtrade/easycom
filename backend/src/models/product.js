'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    slug: DataTypes.STRING,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    qty: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'inactive'),
    price: DataTypes.DOUBLE(8, 2),
    sellingPrice: DataTypes.DOUBLE(8, 2),
    discount: DataTypes.DOUBLE(8, 2),
    isFeatured: DataTypes.BOOLEAN,
    catId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    models.Product.hasMany(models.ProductPhoto, { foreignKey: 'productId' });
    models.Product.belongsTo(models.Brand, { foreignKey: 'brandId' });
    models.Product.belongsTo(models.Category, { foreignKey: 'catId' });
  };
  return Product;
};