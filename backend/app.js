const express = require('express');
const app = express();
require("dotenv").config();

//server config
const PORT = 2077;
const SERVER_URL = `http://localhost:${PORT}`;
const connectToDB = require('./db/mongoose');

//middleware
app.use(express.json());
const authenticationMiddleware = require("./middleware/auth.middleware");

//route
app.use("/api/v1/accounts", require("./routers/account.router"))
app.use("/api/v1", require("./routers/auth.router"))

//listen

const start = async () => {
    try {
        await connectToDB(process.env.MONGOOSE_CONNECTION);

        app.listen(PORT, () => {
            console.log(`Server is running here: ${SERVER_URL}`)
        });
    } catch (e) {
        console.log(e)
    };
};
start(); 