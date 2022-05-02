'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      type: "Community & culture",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Music",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Food & drink",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Auto, boat & air",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Film, media & entertainment",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Religion & spirituality",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Performing & visual arts",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Health & wellness",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Government & politics",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Other",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
