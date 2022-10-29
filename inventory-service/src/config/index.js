const dotenv = require('dotenv');
const env = dotenv.config().parsed;
export const config = require(`../environments/${process.env.NODE_ENV || env.NODE_ENV}` || '../environments/development');