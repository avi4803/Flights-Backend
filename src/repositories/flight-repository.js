const crudRepository = require('./crud-repository');
const {Flight , Airport, sequelize,Aeroplane ,City} = require('../models/');
const {Sequelize} = require('sequelize')

class FlightRepository extends crudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const flight = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
            {
                model: Airport,
                as: 'departureAirport',     // Use the alias from association
                attributes: ['code', 'name', 'address', 'cityId'],  // Select specific fields
                include:[{
                    model: City ,
                    as: City,
                    attributes:  ['name']
                }]
            },
            {
                model: Airport,
                as: 'arrivalAirport',       // Use the alias from association  
                attributes: ['code', 'name', 'address', 'cityId']  // Select specific fiel //on: {
                //   col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), '=' , Sequelize.col("Airport.code"))
                //}      
            },
            {
                model: Aeroplane,      //do based on association only
                as: 'Airplane',       // Use the alias from association
            },

        ]});
        return flight;
    }
}



module.exports = FlightRepository ;