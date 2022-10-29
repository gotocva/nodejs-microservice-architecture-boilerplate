/**
 * 
 * @param {*} app 
 * @returns 
 */
 const appServiceProvider = async (app) => {
    return new Promise((resolve, reject) => {
        try {

            // implement app services here 
            app.use((req, res, next) => {
                req.request_time = new Date().valueOf();
                next();
            });

            resolve(app);

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = appServiceProvider;