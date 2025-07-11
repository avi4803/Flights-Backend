const { StatusCodes } = require('http-status-codes');
const {CityService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createCity(req, res){
    
    try {
        const city = await CityService.createCity({
            name : req.body.name
        })
        SuccessResponse.message = 'successfully added the city';
        SuccessResponse.data = city ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)


        
    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
        
    }
}

async function getCities(req, res){
  try {
    const cities = await CityService.getCities();
    SuccessResponse.data = cities ;
    SuccessResponse.message = 'List of found cities'
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)
  } catch (error) {
    
    ErrorResponse.error = error;
    return res
              .status(error.statusCode)
              .json(ErrorResponse)
    
  }
}

async function getCity(req, res){
  try {
    const city = await CityService.getCity(req.params.id);
    SuccessResponse.data = city ;
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res
              .status(error.statusCode)
              .json(ErrorResponse)
    
  }
}


async function destroyCity(req, res){
  try {
    const city = await CityService.destroyCity(req.params.id);
    SuccessResponse.message = 'Successfully deleted the City with requested';
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse.message)
    
  } catch (error) {
    ErrorResponse.error = error;
    return res 
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json(ErrorResponse);
  }
}

async function updateCity(req, res){
  
    try {
    const updatedCity = await CityService.updateCity(req.params.id , {
      name: req.body.name
    
      
    })
    SuccessResponse.message = 'Successfully updated the City name' 
    SuccessResponse.data = updatedCity ;
    return res
             .status(StatusCodes.OK)
             .json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res
             .status(StatusCodes.NOT_FOUND)
             .json(ErrorResponse)

    
  }

}



module.exports = {
    createCity,
    destroyCity,
    getCities,
    getCity,
    updateCity
}