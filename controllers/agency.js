const Agency = require('./../models/agency');
const Client = require('./../models/client');
let jwt = require('jsonwebtoken');
const config = require('./../config/auth');

module.exports = {
    create: async (req, res) => {
        try {
            let agencyObj = req.body.agency;
            let newClientArray = [];
            for(let client of req.body.clients) {
                let newClient = new Client(client);
                await newClient.save();
                newClientArray.push(newClient);
            }
            agencyObj['clients'] = newClientArray.map((client) => client._id);
            let newAgency = new Agency(agencyObj);
            await newAgency.save();
            newClientArray.map((client) => {
                client['agency'] = newAgency._id;
                client.save();
            });
            const token = await jwt.sign({ _id: newAgency._id },
                config.secret,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            res.status(201).send({ newAgency,newClientArray, token });
        } catch (error) {
            res.status(400).send(error)
        }
    }
};
