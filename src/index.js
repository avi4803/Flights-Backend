const dotenv  = require('dotenv').config({path:'../.env'});
const PORT = process.env.PORT
const {logger} = require('./config/index')



const express = require('express');
const app = express();

const apiRoutesV1 = require('./routes/V1/index');
const apiRoutesV2 = require('./routes/V2/index')


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1' , apiRoutesV1)
app.use('/api/v2' , apiRoutesV2)

app.listen(PORT , () => {
    console.log("Server started and running on Port:", PORT);
    logger.info("successfully started the server")
})

