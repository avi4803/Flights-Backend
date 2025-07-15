const express = require('express');
const router = express.Router();
const {flightController} = require('../../controllers/index');
const {FlightMiddlewares} = require('../../middlewares/index');

// api/v1/flights/  --POST
router.post('/' ,
    FlightMiddlewares.validateCreateRequest,
    flightController.createFlight);


// api/v1/flights?trips=MUM-DEL  --GET
router.get('/',
    flightController.getAllFlights
)

// // api/v1/flight/  --GET
// router.get('/',
//     flightController.getFlights
// );

// api/v1/flights/:id  --GET
router.get('/:id',
    flightController.getFlight
);

// router.delete('/:id',
//     flightController.destroyFlight
// );

// router.patch('/:id',
//     flightController.updateFlight
// );



module.exports = router ;

