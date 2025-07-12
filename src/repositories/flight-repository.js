const crudRepository = require('./crud-repository');
const {Flight , Airport, sequelize} = require('../models/');
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
                attributes: ['code', 'name', 'address', 'cityId']  // Select specific fields
            },
            {
                model: Airport,
                as: 'arrivalAirport',       // Use the alias from association  
                attributes: ['code', 'name', 'address', 'cityId']  // Select specific fields
            }
        ]
        });
        return flight;
    }
}



module.exports = FlightRepository ;