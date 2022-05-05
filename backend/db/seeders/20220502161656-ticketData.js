'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [{
      userId: 1,
      eventId: 1,
      qty: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        userId: 2,
        eventId: 2,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 3,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 4,
        qty: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 5,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 6,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 7,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 8,
        qty: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 9,
        qty: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 10,
        qty: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 11,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 12,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 13,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 14,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 15,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 16,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 17,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 18,
        qty: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 19,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 20,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 21,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 22,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 23,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 24,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 25,
        qty: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 26,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 27,
        qty: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 28,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 29,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 30,
        qty: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 31,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 32,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 33,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 34,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 35,
        qty: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 36,
        qty: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 37,
        qty: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 38,
        qty: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 39,
        qty: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 40,
        qty: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
