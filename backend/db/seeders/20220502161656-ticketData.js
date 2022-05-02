'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [{
      userId: 1,
      eventId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 26,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 27,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 28,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 29,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 31,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 32,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 33,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 36,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 38,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 39,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
