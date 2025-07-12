const { StatusCodes } = require('http-status-codes');
const FlightRepository = require('../repositories/flight-repository');
const AppError = require('../utils/errors/App-Error')
const flightRepository = new FlightRepository();
const {Op} = require('sequelize')


async function createFlight(data){
    
    try{
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error){
        // console.log("here is the error" ,error.name)
        
        if (error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);  
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }

        if (error.name == "SequelizeUniqueConstraintError"){
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


async function getAllFlights(query){
    let customFilter = {};
    const endingTripTime = '23:59:00' ;
    let sortFilter;

    //trips: MUM-DEL
    if(query.trips){
        [departureAirportId , arrivalAirportId] = query.trips.split("-"); 
        customFilter.departureAirportId = departureAirportId ;
        customFilter.arrivalAirportId = arrivalAirportId ;

        //both should not be same
    }

    if(query.price){
        [minPrice , maxPrice] = query.price.split('-'); 
        customFilter.price = {
            [Op.between]: [minPrice , (maxPrice == undefined ? 20000: maxPrice)] //custom upper limit if not provided by frontend
        }

       
    }

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        } 
    }

    if(query.tripDate){
        customFilter.departureTime = {
            [Op.gte] : [query.tripDate , query.tripDate + endingTripTime]
        } 
    }

    //sort:departureTime_ASC,price_DESC  --sort:attributename_ASC or DESC   (any query can be used in this form)
    if(query.sort){
        const params = query.sort.split(",");   //return array of both [departureTime_ASC , price_DESC]
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters ;

    }
    
    try {
        const flights = await flightRepository.getAllFlights(customFilter , sortFilter);
        return flights;
        
    } catch (error) {
        console.log(error)
        
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR)
        
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
    getAllFlights
//     getAirplanes,
//     getAirplane,
//     destroyAirplane,
//     updateAirplane
   }