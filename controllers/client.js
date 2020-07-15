const Agency = require('./../models/agency');
const Client = require('./../models/client');

module.exports = {
    update: async (req, res) => {
        try {
            let oldClient = await Client.findOne({ _id: req.body._id });
            let name = req.body.name || oldClient.name;
            let email = req.body.email || oldClient.email;
            let phone_number = req.body.phone_number || oldClient.phone_number;
            let total_bill = req.body.total_bill || oldClient.total_bill;
            await Client.findOneAndUpdate({ _id: req.body._id }, { $set: { name: name, email: email, phone_number: phone_number, total_bill: total_bill } });
        }
        catch (error) {
            res.status(400).send(error)
        }
    },
    getTopClient: async (req, res) => {
        try {
            let abc = await Client.find();
            console.log(abc);
            let topClients = await Client.find().sort({ total_bill: -1 });
            let agencyDetail = await Agency.findOne({_id:topClients[0].agency});

            console.log(topClients[0]);
            let response = {};
            response['agencyName'] = agencyDetail.name;
            response['clientName'] = topClients[0].name;
            response['total_bill'] = topClients[0].total_bill; 
            res.status(201).send(response);
        }
        catch (error) {
            res.status(400).send(error)
        }
    }
};