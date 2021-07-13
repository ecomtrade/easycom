'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    summary: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    isParent: DataTypes.BOOLEAN,
    parentId: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'inactive')
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};