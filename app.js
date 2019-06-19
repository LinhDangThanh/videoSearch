const express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser');

const app = express();
const connection = mongoose.connection;

const config = require('./config')
  , middleware = require('./middleware')
  , controller = require('./controller');

const PORT = process.env.PORT || config.app.server.port;
const MONGO_URL = process.env['MONGODB_URI'] ? process.env['MONGODB_URI']
  : `mongodb://${config.app.db.host}/${config.app.db.database}`;

connection.on('error', (error) => {
  console.error.bind(console, `Db connection error: ${error}`);
});

connection.once('open', () => {
  app.listen(PORT, () => {
    app.use(bodyParser.json());

    app.use(middleware.cors);

    // register controller
    controller(app);

    console.log('App listening on port: ', PORT);
  });
});

mongoose.connect(MONGO_URL, { useNewUrlParser: true });
