const express = require('express');
const router = express.Router();
const {infoControllers} = require('../../controllers');
const airplaneRoute = require('./airplaneRoute');
const cityRoute = require('./cityRoute')
const airportRoute = require('./airportRoute');
const flightRoute = require('./flightRoute')


router.use((req , res , next) =>{
    console.log('first middleware passed');
    next();

})

router.get('/' , infoControllers.info);

//routes for airplanes CRUD api
router.use('/airplanes' , airplaneRoute )

//routes for city CRUD api
router.use('/cities' , cityRoute)

//routes for airport CRUD api
router.use('/airports' , airportRoute )

//routes for flight CRUD api
router.use('/flights' , flightRoute )




router.get('/info' , (req , res) =>{
    const data = {
        success: true ,
        message: "This data is provided by v1 api" ,
        error:"" ,
        status: "" ,

    }
    res.json(data);

    
})

module.exports = router ;