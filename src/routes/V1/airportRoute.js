const express = require('express');
const router = express.Router();
const {airportController} = require('../../controllers/index');
const {AirportMiddlewares} = require('../../middlewares/index');

// api/v1/airplane/  --POST
router.post('/' ,
    AirportMiddlewares.validateCreateRequest,
    airportController.createAirport);

// api/v1/airplane/  --GET
router.get('/',
    airportController.getAirports
);

// api/v1/airplane/:id  --GET
router.get('/:id',
    airportController.getAirport
);

router.delete('/:id',
    airportController.destroyAirport
);

// router.patch('/:id',
//     airportController.updateAirport
// );



module.exports = router ;

