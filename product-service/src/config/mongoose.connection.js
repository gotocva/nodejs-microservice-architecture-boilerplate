import mongoose from 'mongoose';

import { config } from './index';

/**
 * mongodb connection establishment
 */
const connectMongoose = () => {

    if (config.MONGODB_PASSWORD == 'NULL' || config.MONGODB_PASSWORD == undefined) {
        console.log('Mongodb Connecting without password');
        mongoose.connect(`mongodb://${config.MONGODB_HOST}/${config.MONGODB_DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
    } else {
        console.log('Mongodb Connecting with password');
        const uri = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_HOST}/${config.MONGODB_DB_NAME}?retryWrites=true&w=majority`;
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    // when successfully connected
    mongoose.connection.on('connected', () => {
        console.log('Mongodb successfully connected');
    });
    // if the connection throws an error
    mongoose.connection.on("error", (err) => {
        //   if you get error for the first time when this gets started make sure to run mongodb
        console.log('Mongodb connection failed', err);
    });
    // when the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        console.log('Mongodb connection disconnected');
    });
}


module.exports = connectMongoose;