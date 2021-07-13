'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    photo: DataTypes.TEXT,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM('active', 'inactive')
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};