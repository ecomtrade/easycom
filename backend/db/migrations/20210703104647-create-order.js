'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      subTotal: {
        type: Sequelize.DOUBLE(8, 2)
      },
      totalAmount: {
        type: Sequelize.DOUBLE(8, 2)
      },
      qty: {
        type: Sequelize.INTEGER
      },
      paymentMethod: {
        type: Sequelize.ENUM('cod', 'paypal', 'stripe')
      },
      paymentStatus: {
        type: Sequelize.ENUM('paid', 'unpaid')
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive')
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      postCode: {
        type: Sequelize.STRING
      },
      addressOne: {
        type: Sequelize.TEXT
      },
      addressTwo: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};