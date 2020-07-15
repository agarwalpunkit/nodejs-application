const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const config = require('./config/db');
const mongoose = require('mongoose');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let options = {};
options['useFindAndModify'] = false;
options['useUnifiedTopology'] = true;
options['useNewUrlParser'] = true;

mongoose.Promise = global.Promise;

mongoose.connect(config.url, options, (err) => {
    if (err) console.log('MongoDB connect Error:', err);
});
//first conn
mongoose.connection.on('connected', function () {
    console.log('[1]Mongoose connection open to ' + config.url.split('/').pop());
});

mongoose.connection.once('open', () => {
    console.log('[1]Connected to mongodb!');
});

mongoose.connection.on('error', function (err) {
    console.error('[1]Mongoose default error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('[1]Mongoose default connection disconnected');
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

require('./routes/route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});