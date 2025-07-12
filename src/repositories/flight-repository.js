const crudRepository = require('./crud-repository');
const {Flight} = require('../models/');

class FlightRepository extends crudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter){
        const flight = await Flight.findAll({
            where: filter,
        });
        return flight;
    }
}



module.exports = FlightRepository ;