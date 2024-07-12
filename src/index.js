const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));