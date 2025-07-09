const { createLogger, format, transports } = require('winston');
const { combine , timestamp, printf, label } = format ;

const customFormat = printf(({level, message, label, timestamp}) => {
    return (timestamp , label , level , message);

})

const logger = createLogger({
    format: combine(
        
        label({label : "right meowl"}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        customFormat,
        format.simple()
    ),

    transports: [
        new transports.Console() ,
        new transports.File({filename: 'cobined.log'})

    ],
}
)

module.exports = logger ;