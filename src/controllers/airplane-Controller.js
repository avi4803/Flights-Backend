const { StatusCodes } = require('http-status-codes');
const {AirPlaneService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');



// POST : /airplanes
// req body {model-number: 'smthg' , capacity:200}


async function createAeroplane(req, res){
  console.log(req.body)
  
    try {
        const airplane = await AirPlaneService.createAirplane({
            modelNumber: req.body.modelNumber ,
            capacity: req.body.capacity,
        });

        SuccessResponse.data = airplane ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse);
        
    } catch (error) {
      console.log(error)
      

        
    }

}


async function getAirplanes(req, res){
  try {
    const airplanes = await AirPlaneService.getAirplanes();
    SuccessResponse.data = airplanes ;
    SuccessResponse.message = 'List of found planes'
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


async function getAirplane(req, res){
  try {
    const airplane = await AirPlaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane ;
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

async function destroyAirplane(req, res){
  try {
    const airplane = await AirPlaneService.destroyAirplane(req.params.id);
    SuccessResponse.message = 'Successfully deleted the airplane';
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)
    
  } catch (error) {
    ErrorResponse.error = error;
    return res 
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json(ErrorResponse);
  }
}

async function updateAirplane(req, res){
  
  try {
    const updatedAirplane = await AirPlaneService.updateAirplane(req.params.id , {
      modelNumber: req.body.modelNumber ,
      capacity: req.body.capacity,
    
      
    })
    SuccessResponse.message = 'Successfully updated the Plane' 
    SuccessResponse.data = updatedAirplane ;
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

module.exports ={
 createAeroplane,
 getAirplanes,
 getAirplane,
 destroyAirplane,
 updateAirplane
};
