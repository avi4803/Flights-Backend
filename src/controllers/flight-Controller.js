const { StatusCodes } = require('http-status-codes');
const {FlightService, AirPlaneService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { query } = require('winston');
const AppError = require('../utils/errors/App-Error');



// POST : /airplanes
// req body {model-number: 'smthg' , capacity:200}


async function createFlight(req, res){
  
  
    try {
        const flight = await FlightService.createFlight({
          flightNumber: req.body.flightNumber,
          airplaneId: req.body.airplaneId,
          departureAirportId: req.body.departureAirportId,
          arrivalAirportId: req.body.arrivalAirportId ,
          arrivalTime: req.body.arrivalTime ,
          departureTime: req.body.departureTime ,
          price: req.body.price ,
          boardingGate: req.body.boardingGate,
          totalSeats: req.body.totalSeats    
        });

        SuccessResponse.data = flight ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse);
        
    } catch (error) {
      ErrorResponse.message = "Airplane ID , departureAirportId or arrivalAirportId doesn't match with database";
      ErrorResponse.error = error;

      return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
      

        
    }

}

async function getAllFlights(req ,res){
  
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights ;
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse);
    
  } catch (error) {
    
    ErrorResponse.error = (error);
    return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json(ErrorResponse)
    
  }
  
 }


// async function getAirplanes(req, res){
//   try {
//     const airplanes = await AirPlaneService.getAirplanes();
//     SuccessResponse.data = airplanes ;
//     SuccessResponse.message = 'List of found planes'
//     return res
//               .status(StatusCodes.OK)
//               .json(SuccessResponse)
//   } catch (error) {
//     ErrorResponse.error = error;
//     return res
//               .status(error.statusCode)
//               .json(ErrorResponse)
    
//   }
// }


async function getFlight(req, res){
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight ;
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

// async function destroyAirplane(req, res){
//   try {
//     const airplane = await AirPlaneService.destroyAirplane(req.params.id);
//     SuccessResponse.message = 'Successfully deleted the airplane';
//     return res
//               .status(StatusCodes.OK)
//               .json(SuccessResponse)
    
//   } catch (error) {
//     ErrorResponse.error = error;
//     return res 
//               .status(StatusCodes.INTERNAL_SERVER_ERROR)
//               .json(ErrorResponse);
//   }
// }

// async function updateAirplane(req, res){
  
//   try {
//     const updatedAirplane = await AirPlaneService.updateAirplane(req.params.id , {
//       modelNumber: req.body.modelNumber ,
//       capacity: req.body.capacity,
    
      
//     })
//     SuccessResponse.message = 'Successfully updated the Plane' 
//     SuccessResponse.data = updatedAirplane ;
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
 createFlight,
 getAllFlights,
 getFlight
//  getAirplanes,
//  getAirplane,
//  destroyAirplane,
//  updateAirplane
};
