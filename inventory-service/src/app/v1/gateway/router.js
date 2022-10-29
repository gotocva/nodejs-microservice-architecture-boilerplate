

import express from 'express';

const gatewayRouter = express.Router();


import services from '../../../utils/services';

gatewayRouter.get('/', (req, res) => {
    res.send('API Gateway');
});

gatewayRouter.get('/services', (req, res) => {
    const serviceList = services.list();
    return res.successResponse(serviceList, 'API Service List');
});

gatewayRouter.get('/service/register', (req, res) => {
    services.registerService({id:1234, url: 'test.com'});
    return res.successResponse({});
});

gatewayRouter.get('/service/:id', (req, res) => {
    const serviceList = services.list();
    for (let i = 0; i < serviceList.length; i++) {
        if (serviceList[i].id === req.params.id) {
            return res.successResponse(serviceList[i]);
        }
    }
});
module.exports = gatewayRouter;






