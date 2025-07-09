const dotenv = require('dotenv') ;
dotenv.config({ path: '../../.env' });
const PORT = process.env.PORT ;
console.log(PORT)

module.exports = PORT ;
   
