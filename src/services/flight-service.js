const { StatusCodes } = require('http-status-codes');
const FlightRepository = require('../repositories/flight-repository');
const AppError = require('../utils/errors/App-Error')
const flightRepository = new FlightRepository();


async function createFlight(data){
    
    try{
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error){
        
        if (error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);  
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }

        if (error.name == "SequelizeForeignKeyConstraintError"){
            throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
        
    throw new AppError('Cannot create new Flight Object', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}




// async function getAirplane(data){
//     try {
//         const airplane = await airplaneRepository.get(data);
//         return airplane;
        
//     } catch (error) {
//         if (error.name == "SequelizeValidationError"){
//             let explanation = [];
//             error.errors.forEach(err => {
//                 explanation.push(err.message);  
//             });
//             throw new AppError(explanation , StatusCodes.BAD_REQUEST);
//         }
//         throw new AppError('Cannot create new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR);
        
//     }
// }


// async function getAirplanes(){
//     try {
//         const airplanes = await airplaneRepository.getAll();
//         return airplanes;
        
//     } catch (error) {
//         throw new AppError('Cannot create new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR); 
        
//     }
// }

// async function getAirplane(data){
//     try {
//         const airplane = await airplaneRepository.get(data);
//         return airplane;
        
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND){
//             throw new AppError('Airplane with requested id is not present', error.statusCode)
//         }
        
//     }
// }

// async function destroyAirplane(data){
//     try {
//         const airplane = await airplaneRepository.destroy(data);
        
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND){
//             throw new AppError('Airplane with requested id is not present', error.statusCode)
//         }
        
//     }

// }


// async function updateAirplane(id, data){
//     try {
//         const airplane = await airplaneRepository.update(id, data);
//         return getAirplane(id)
        
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND){
//             throw new AppError('Airplane with requested id is not present', error.statusCode)
//         }
        
//     }

// }



module.exports = {
    createFlight,
//     getAirplanes,
//     getAirplane,
//     destroyAirplane,
//     updateAirplane
   }