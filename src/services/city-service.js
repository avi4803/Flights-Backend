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

module.exports = {
    createCity

}
