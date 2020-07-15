const agency = require('./../controllers/agency');
const client = require('./../controllers/client');
const middleware = require('./../middlewares/is-authenticated');
module.exports = (app) => {
    app.post('/agency', agency.create);
    app.post('/update',middleware.checkToken, client.update);
    app.get('/getTopClient',middleware.checkToken, client.getTopClient);
};