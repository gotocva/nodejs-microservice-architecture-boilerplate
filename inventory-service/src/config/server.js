import app from '../providers/route-service.provider';

export const http = require('http').Server(app);
export const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:4200", "https://admin.socket.io"],
        methods: ["GET", "POST"]
    }
});

// export const https = require('https').Server(app);