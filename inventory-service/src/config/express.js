
import express from 'express';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

import { config } from '../config/index';

class Express {

    constructor() {
        if (typeof Express.instance === 'object') {
            return Express.instance;
        }
        this.app = express();
        // this.app.use(RequestLogger);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(fileUpload());
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(this.errorResponseMiddleware);
        if(config.IS_CORS_RESTRICTED == true) this.app.use(this.corsMiddleware);
        Express.instance = this;
    }

    start() {
        this.app.listen(config.PORT, () => {
            console.log(`Application running on port ${config.PORT}`);
        });
    }

    corsMiddleware(req, res, next) {
        if (config.WHITELISTED_DOMAINS.indexOf(req.header('Origin')) != -1) {
            next();
        } else {
            res.errorResponse({}, 'CORS not allowed', 400);
        }
    }

    errorResponseMiddleware(req, res, next) {
        res.successResponse = (data, message = '', code = 200) => {
            return res.status(code).json({
                status: true,
                status_code: code,
                message: message,
                data: data
            });
        }
        res.errorResponse = (data, message = '', code = 500) => {
            return res.status(code).json({
                status: false,
                status_code: code,
                message: message,
                data: data
            });
        }
        // TODO import cache and use
        // res.cache = cache;
        next();
    }
}

module.exports = Express;