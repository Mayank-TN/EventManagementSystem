const express = require('express');
const app = express();
const cors = require('cors');
const Events = require('./events');
const eventRoutes = require('./routes');
app.use(cors())
app.use(express.json());
app.use(eventRoutes);

app.listen('5000')