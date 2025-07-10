const { StatusCodes } = require('http-status-codes');
const AirplaneRepository = require('../repositories/airplane-repository');
const AppError = require('../utils/errors/App-Error')
const airplaneRepository = new AirplaneRepository();


async function createAirplane(data){
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error){
        throw error;
    }

}


async function getAirplane(data){
    try {
        const airplane = await airplaneRepository.get(data);
        return airplane;
        
    } catch (error) {
        if (error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);  
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}


async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
        
    } catch (error) {
        throw new AppError('Cannot create new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR); 
        
    }
}

async function getAirplane(data){
    try {
        const airplane = await airplaneRepository.get(data);
        return airplane;
        
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airplane with requested id is not present', error.statusCode)
        }
        
    }
}

async function destroyAirplane(data){
    try {
        const airplane = await airplaneRepository.destroy(data);
        
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airplane with requested id is not present', error.statusCode)
        }
        
    }

}


async function updateAirplane(id, data){
    try {
        const airplane = await airplaneRepository.update(id, data);
        return getAirplane(id)
        
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airplane with requested id is not present', error.statusCode)
        }
        
    }

}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}