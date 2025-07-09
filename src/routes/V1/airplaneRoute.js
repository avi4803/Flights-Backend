const express = require('express');
const router = express.Router();
const {airplaneController} = require('../../controllers/index');

console.log(airplaneController.createAirplane)
router.post('/' , airplaneController.createAeroplane);

module.exports = router ;

