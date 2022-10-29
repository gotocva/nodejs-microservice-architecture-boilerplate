const dotenv = require('dotenv');
import path from 'path';
const env = dotenv.config().parsed;

const config = {
    IS_CORS_RESTRICTED: true,
    ENV: env,
    DEBUG: env.DEBUG || true,
    HOME_PATH: path.join(__dirname, '../'),
    APP_PATH: path.join(__dirname, '../app/'),
    WHITELISTED_DOMAINS: [
        'http://localhost:4200'
    ],
    PORT: env.PORT || 3000,
    HOST: 'localhost',
    MONGODB_HOST: env.MONGODB_HOST || '127.0.0.1',
    MONGODB_PORT: env.MONGODB_PORT || 27017,
    MONGODB_DB_NAME: env.MONGODB_DB_NAME || 'sample',
    MONGODB_USERNAME: env.MONGODB_USERNAME || 'NULL',
    MONGODB_PASSWORD: env.MONGODB_PASSWORD || 'NULL',
    MONGODB_DEBUGGING: env.MONGODB_DEBUGGING || false,
    BX_FINANCE_WSS_PROVIDER: 'wss://bsc.getblock.io/testnet/?api_key=9bf7b838-64b7-416f-b582-b37568d91ee1',
    BX_FINANCE_BRIDGE_CONTRACT: '0xf145f780FCB228A28082F1edC0684DC031Fc733A',
};


module.exports = config;