import winston from 'winston';
import chalk from 'chalk';

// Custom colors for winston
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Configure winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'hvcker-coder-ai' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => {
          const color = colors[info.level as keyof typeof colors] || 'white';
          const level = chalk.keyword(color)(`[${info.level.toUpperCase()}]`);
          const message = info.message;
          const timestamp = chalk.gray(new Date(info.timestamp).toISOString());
          
          if (info instanceof Error) {
            return `${timestamp} ${level} ${message}\n${info.stack}`;
          }
          
          const meta = info[Symbol.for('message')] || info.meta;
          if (meta && typeof meta === 'object') {
            return `${timestamp} ${level} ${message} ${JSON.stringify(meta)}`;
          }
          
          return `${timestamp} ${level} ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

// Add stream for morgan if needed
logger.stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger };
export default logger;
