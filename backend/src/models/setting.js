'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    settingKey: DataTypes.STRING,
    settingValue: DataTypes.TEXT
  }, {});
  Setting.associate = function(models) {
    // associations can be defined here
  };
  return Setting;
};