const express = require('express');
const router = express.Router();
const {airplaneController} = require('../../controllers/index');
const {AirplaneMiddlewares} = require('../../middlewares/index');

// api/v1/airplane/  --POST
router.post('/' ,
    AirplaneMiddlewares.validateCreateRequest,
    airplaneController.createAeroplane);

// api/v1/airplane/  --GET
router.get('/',
    airplaneController.getAirplanes
);

// api/v1/airplane/:id  --GET
router.get('/:id',
    airplaneController.getAirplane
);

router.delete('/:id',
    airplaneController.destroyAirplane
);

router.patch('/:id',
    airplaneController.updateAirplane
);



module.exports = router ;

