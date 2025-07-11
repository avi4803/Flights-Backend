const express = require('express');
const router = express.Router();
const {cityController} = require('../../controllers/');
const {CityMiddlewares} = require('../../middlewares/')

// api/v1/airplane/  --POST
router.post('/' ,
    CityMiddlewares.validateCreateRequest,
    cityController.createCity);

// api/v1/airplane/  --GET
router.get('/',
    CityMiddlewares.validateCreateRequest,
    cityController.getCities
);

// api/v1/airplane/:id  --GET
router.get('/:id',
    cityController.getCity
);

router.delete('/:id',
    cityController.destroyCity
);

router.patch('/:id',
    cityController.updateCity
);



module.exports = router ;

