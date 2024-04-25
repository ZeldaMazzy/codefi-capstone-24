const express = require('express');
const app = express();

//server config
const PORT = 2077;
const SERVER_URL = `http://localhost:${PORT}`;

//middleware
app.use(express.json());

//listen
app.listen(PORT, () => {
    console.log(`Server running at: ${SERVER_URL}`);
});
