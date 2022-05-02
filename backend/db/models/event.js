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
  };
  return Event;
};
