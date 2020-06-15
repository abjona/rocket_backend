const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const moongose = require('mongoose');
const routes = require('./routes');

moongose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);
