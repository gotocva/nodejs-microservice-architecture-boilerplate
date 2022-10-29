

import Express from './config/express';
import cluster from 'cluster';
import os from 'os';

import appServiceProvider from './providers/app-service.provider';
import routeServiceProvider from './providers/route-service.provider';
import { config } from './config/index';
import connectMongoose from './config/mongoose.connection';

let io = null;

export const getIO = () => { return io; }

/**
 * 
 */
 const bootstrapApplication = async () => {
    const express = new Express();
    let app = await appServiceProvider(express.app);
    app = await routeServiceProvider(app);
    const http = require('http').Server(app);
    io = require('socket.io')(http, {
        cors: {
            origin: config.WHITELISTED_DOMAINS,
            methods: ["GET", "POST"]
        }
    });
    console.log(`Worker ${process.pid} started`);
    connectMongoose();
    http.listen(config.PORT, () => { console.log(`app running on port ${config.PORT}`); });
}

if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${os.cpus().length}`);
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers.
    for (let i = 0; i < os.cpus().length; i++) {
        // cluster.fork();
    }
    bootstrapApplication();
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
    bootstrapApplication();
}

