const express = require('express');
const router = express.Router();
const {flightController} = require('../../controllers/index');
const {FlightMiddlewares} = require('../../middlewares/index');

// api/v1/flight/  --POST
router.post('/' ,
    FlightMiddlewares.validateCreateRequest,
    flightController.createFlight);

// // api/v1/flight/  --GET
// router.get('/',
//     flightController.getFlights
// );

// // api/v1/flight/:id  --GET
// router.get('/:id',
//     flightController.getFlight
// );

// router.delete('/:id',
//     flightController.destroyFlight
// );

// router.patch('/:id',
//     flightController.updateFlight
// );



module.exports = router ;

