'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.TEXT, allowNull: false },
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: "hostId" });

    Event.belongsTo(models.Category, { foreignKey: "categoryId" });

    const columnMapping2 = {
      through: "Ticket",
      otherKey: "userId",
      foreignKey: "eventId",
    };

    Event.belongsToMany(models.User, columnMapping2);


  };
  return Event;
};
