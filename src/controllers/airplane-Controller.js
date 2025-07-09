const { StatusCodes } = require('http-status-codes');
const {AirPlaneService} = require('../services');
const { response } = require('express');



// POST : /airplanes
// req body {model-number: 'smthg' , capacity:200}


async function createAeroplane(req, res){
  console.log(req.body)
  
    try {
        const airplane = await AirPlaneService.createAirplane({
            modelNumber: req.body.modelNumber ,
            capacity: req.body.capacity,
            
           

        });
        return res
                  .status(StatusCodes.CREATED)
                  .json({
                    success:true,
                    message:'Successfully created an airplane',
                    data: airplane ,
                    error: {}
                  })
        
    } catch (error) {
      console.log(error)
        
        return res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json({
                    success:false,
                    message:'Something went wrong while creating Airplane',
                    data: {} ,
                    error: error,

                  })

        
    }

}


module.exports ={
 createAeroplane
};
