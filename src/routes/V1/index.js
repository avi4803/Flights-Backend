const express = require('express');
const router = express.Router();
const {infoControllers} = require('../../controllers');
const airplaneRoute = require('./airplaneRoute');


router.use((req , res , next) =>{
    console.log('first middleware passed');
    next();

})


router.get('/' , infoControllers.info);
router.use('/airplanes' , airplaneRoute )



router.get('/api' , (req , res) =>{
    const data = {
        success: true ,
        message: "This data is provided by v1 api" ,
        error:"" ,
        status: "" ,

    }
    res.json(data);

    
})

module.exports = router ;