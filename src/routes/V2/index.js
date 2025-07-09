const express = require('express');
const router = express.Router();

router.post('/' , (req , res) => {
    res.json({
        success : true ,
        data: "you are in the v1 version" ,
        error : "" ,
        status : "" ,
    })
})

router.post('/api' , (req , res) => {
    res.json({
        success : true ,
        data: "This data is provided by V2 api" ,
        error : "" ,
        status : "" ,
    })
})

module.exports = router ;