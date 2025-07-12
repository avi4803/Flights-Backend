const { StatusCodes } = require('http-status-codes');
const {AirportService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');



// POST : /airports
// req body {name: 'smthg' , code: '' , cityId: 'integer' , address: 'string'}


async function createAirport(req, res){
  console.log(req.body)
  
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name ,
            cityId: req.body.cityId,
            code: req.body.code ,
            address: req.body.address ,

        });

        SuccessResponse.data = airport ;
        SuccessResponse.message = 'Successfully created the Airport'
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse);
        
    } catch (error) {
      ErrorResponse.error = error;
      return res
                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse.error)
      

        
    }

}


async function getAirports(req, res){
  try {
    const airports = await AirportService.getAirports();
    console.log(airports)
    SuccessResponse.data = airports ;
    SuccessResponse.message = 'List of found airports'
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


async function getAirport(req, res){
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport ;
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

async function destroyAirport(req, res){
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.message = 'Successfully deleted the airport';
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

// async function updateAirport(req, res){
  
//   try {
//     const updatedairport = await AirportService.updateAirport(req.params.id , {
//       name: req.body.name ,
//       cityId: req.body.cityId,
//       code: req.body.code ,
//       address: req.body.address ,
    
      
//     })
//     SuccessResponse.message = 'Successfully updated the Airport' 
//     SuccessResponse.data = updatedairport ;
//     return res
//              .status(StatusCodes.OK)
//              .json(SuccessResponse)
//   } catch (error) {
//     ErrorResponse.error = error;
//     return res
//              .status(StatusCodes.NOT_FOUND)
//              .json(ErrorResponse)

    
//   }

// }

module.exports ={
 createAirport,
 getAirports,
 getAirport,
 destroyAirport,
//  updateAirport
};
