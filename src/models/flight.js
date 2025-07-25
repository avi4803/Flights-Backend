'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Aeroplane, {
        foreignKey: 'airplaneId' ,// This tells Sequelize which column links to Aeroplane
        targetKey: 'id',
        as:'Airplane'
      });
      this.belongsTo(models.Airport , {
        foreignKey: 'departureAirportId',
        targetKey: 'code',              // Match with Airport.code instead of Airport.id
        as: 'departureAirport'          // Add alias to distinguish
      });
      this.belongsTo(models.Airport , {
        foreignKey: 'arrivalAirportId',
        targetKey: 'code',              // Match with Airport.code instead of Airport.id
        as: 'arrivalAirport'            // Add alias to distinguish
      });
    }
  }
  Flight.init({
    flightNumber:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,

    },
    airplaneId:{
              type: DataTypes.INTEGER,
              allowNull:false,
    },
    departureAirportId:{
              type: DataTypes.STRING,
              allowNull:false,
    },
    arrivalAirportId:{
              type: DataTypes.STRING,
              allowNull:false,
    },
    arrivalTime:{
              type:DataTypes.DATE,
              allowNull:false,
    },
    departureTime:{
              type:DataTypes.DATE,
              allowNull:false,
    },
    price:{
              type: DataTypes.INTEGER,
              allowNull:false,
    },
    boardingGate:{
              type:DataTypes.STRING,
    },
    totalSeats:{
              type: DataTypes.INTEGER,
              allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};