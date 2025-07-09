const crudRepository = require('./crud-repository');
const {Aeroplane} = require('../models');

class AirplaneRepository extends crudRepository{
    constructor(){
        super(Aeroplane);
    }
}



module.exports = AirplaneRepository ;