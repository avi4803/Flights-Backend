const express = require('express');
const router = express.Router();
const {cityController} = require('../../controllers/');

// api/v1/airplane/  --POST
router.post('/' ,
    cityController.createCity);

// api/v1/airplane/  --GET
// router.get('/',
//     airplaneController.getAirplanes
// );

// // api/v1/airplane/:id  --GET
// router.get('/:id',
//     airplaneController.getAirplane
// );

// router.delete('/:id',
//     airplaneController.destroyAirplane
// );

// router.patch('/:id',
//     airplaneController.updateAirplane
// );



module.exports = router ;

