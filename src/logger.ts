import * as winston from 'winston';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const loggerConf = {
  format: winston.format.prettyPrint({
    colorize: true,
    depth: 2,
  }),
  transports: [
    new winston.transports.Console({
      consoleWarnLevels: ['info', 'warn', 'error'],
    }),
  ],
};
