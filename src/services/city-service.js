const { StatusCodes } = require('http-status-codes');
const CityRepository = require('../repositories/city-repository');
const AppError = require('../utils/errors/App-Error')
const cityRepository = new CityRepository();


async function createCity(data){
    console.log(data)
    try{
        const city = await cityRepository.create(data);
        return city;
        
    } catch(error){
        
        throw new AppError('Error creating the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    
}

module.exports = {
    createCity

}
