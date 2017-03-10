var winston = require('winston');
winston.emitErrs = true;


function logger (filename) {
    return new winston.Logger({
    transports: [
        new winston.transports.File({
           // level: 'info',
            filename: filename,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
});



}

module.exports = logger;
