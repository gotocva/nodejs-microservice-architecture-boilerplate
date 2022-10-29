

import gatewayRouter from '../app/v1/gateway/router';

/**
 * 
 * @param {*} app 
 * @returns 
 */
const routeServiceProvider = async (app) => {
    return new Promise((resolve, reject) => {
        try {

            // implement route injection here 
            app.use('/api/v1/gateway', gatewayRouter);
            
            /**
             * 404 not found exception handler
             */
            app.use((req, res, next) => {
                return res.errorResponse({}, 'Requested route not found', 404);
            });

            resolve(app);

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = routeServiceProvider;