

const servicesFromJson = require('./services.json');

/**
 * 
 */
class Services {

    constructor() {
        this.services = servicesFromJson;
    }

    /**
     * 
     * @param {object} service
     */
    registerService(service) {
        this.services.push(service);
    }

    list() {
        return this.services;
    }
}




/**
 * 
 * @param {string} serviceName 
 * 
 */
const services = new Services();

module.exports = services;