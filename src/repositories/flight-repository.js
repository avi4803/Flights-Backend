const crudRepository = require('./crud-repository');
const {Flight , Airport, sequelize,Aeroplane ,City} = require('../models/');
const {Sequelize} = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const db = require('../models');
const {addRowLockOnFlights} = require('./queries')

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




    async updateRemainingSeats(flightId, seats, dec = true) {
    try {

        await db.sequelize.query(addRowLockOnFlights(flightId)) ;           //using row lock for consistent data
        const flight = await Flight.findByPk(flightId);
        let response;
        if (parseInt(dec)) {
            response = await flight.decrement('totalSeats', { by: seats });
        }
        else {
            response = await flight.increment('totalSeats', { by: seats });  
        } 
        // Reload the flight to get updated values
        await flight.reload();
        return flight;
        
    } catch (error) {
        console.error('Error in updateRemainingSeats:', error);
        throw error;
    }
}
}



module.exports = FlightRepository ;