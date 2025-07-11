const { StatusCodes } = require('http-status-codes');
const CityRepository = require('../repositories/city-repository');
const AppError = require('../utils/errors/App-Error')
const cityRepository = new CityRepository();


async function createCity(data){
   
    try{
        const city = await cityRepository.create(data);
        return city;
        
    } catch(error){
        if(error.name == 'SequelizeUniqueConstraintError'){
            throw new AppError('name must be unique', StatusCodes.BAD_REQUEST)
        }
        
        throw new AppError('Error creating the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    
}

async function getCity(data){
    
    try {
        const City = await cityRepository.get(data);
        
        return City;
        
        
    } catch (error) {
        if (error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);  
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot get the requested City', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getCities(){
    try {
        const cities = await cityRepository.getAll();
        return cities;
        
    } catch (error) {
        console.log(error)
        throw new AppError('Cannot get Cities list', StatusCodes.INTERNAL_SERVER_ERROR); 
        
    }
}

async function destroyCity(data){
    try {
        const City = await cityRepository.destroy(data);
        
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('City with requested id is not present', error.statusCode)
        }
        
    }

}

async function updateCity(id, data){
    try {
        const City = await cityRepository.update(id, data);
        
        return getCity(id);
        
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('City with requested id is not present', error.statusCode)
        }
        
    }

}



module.exports = {
    createCity,
    getCity,
    getCities,
    destroyCity,
    updateCity



}
