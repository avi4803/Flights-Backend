const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/App-Error');
const { AirportRepository } = require('../repositories');
const { SuccessResponse } = require('../utils/common');
const airportRepository = new AirportRepository();


async function createAirport(data){
    try{
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error){
        throw error;
    }

}


async function getAirport(data){
    try {
        const airport = await airportRepository.get(data);
        return airport;
        
    } catch (error) {
        if (error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);  
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }

        else if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('airport with requested id is not present', error.statusCode)
        }
        throw new AppError('Cannot get Airport', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}


async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot get Airports', StatusCodes.INTERNAL_SERVER_ERROR); 
        
    }
}


async function destroyAirport(data){
    try {
        const airport = await airportRepository.destroy(data);
        
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('airport with requested id is not present', error.statusCode)
        }
        
    }

}


async function updateAirport(id, data){
    try {
        const airport = await airportRepository.update(id, data);
        return getAirport(id)
        
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('airport with requested id is not present', error.statusCode)
        }
        
    }

}



module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}