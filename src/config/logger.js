const { createLogger, transports, format } = require('winston');
const config = require('./config');
const logPath = __dirname + './../log/app.log';

const enumerateErrorFormat = format(info => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const customFormat = format.combine(
    format.timestamp(),
    format.printf(info => {
        return `{"time": "${info.timestamp}", "level":"${info.level}", "message": "${info.message}"}`;
    })
);

const logger = createLogger({
    format: customFormat,
    // format: winston.format.combine(
    //     enumerateErrorFormat(),
    //     config.env === 'development'
    //         ? winston.format.colorize()
    //         : winston.format.uncolorize(),
    //     winston.format.splat(),
    //     winston.format.printf(({ level, message }) => `${level}: ${message}`)
    // ),
    transports: [
        new transports.Console({
            stderrLevels: ['silly']
        }),
        new transports.File({ filename: logPath, level: 'info' })
    ]
});

module.exports = logger;
