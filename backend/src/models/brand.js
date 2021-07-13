'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    photo: DataTypes.TEXT,
    status: DataTypes.ENUM('active', 'inactive')
  }, {});
  Brand.associate = function(models) {
    // associations can be defined here
  };
  return Brand;
};