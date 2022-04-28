'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('demoPassword')
      },
      {
        email: 'LaPooh@LaPooh.LaPooh',
        username: 'LaPooh',
        hashedPassword: bcrypt.hashSync('LaPoohPassword')
      },
      {
        email: 'RandomUser@user.com',
        username: 'RandomUser',
        hashedPassword: bcrypt.hashSync('RandomUserPassword')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo', 'LaPooh', 'RandomUser'] }
    }, {});
  }
};
