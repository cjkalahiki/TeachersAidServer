require('dotenv').config();

//importing
const express = require('express');
const dbConnection = require('./db');
const controllers = require('./Controllers');
const middleware = require('./Middleware');

const app = express();

app.use(middleware.CORS);
app.use(express.json());

//endpoints
app.use('/users', controllers.usercontroller);
app.use(middleware.validateSession);
// app.use('/transactions', controllers.transactionscontroller)
app.use('/campaigns', controllers.campaignscontroller);

try {
    dbConnection
        .authenticate()
        .then(async () => await dbConnection.sync())
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
            });
        });
} catch (err) {
    console.log(`[SERVER]: Server crashed, ${err}`);
}