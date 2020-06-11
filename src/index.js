const express =  require('express');
const cors = require('cors');
const app = express();
const moongose = require('mongoose');
const routes = require('./routes');

moongose.connect('mongodb+srv://ramses:88812271jona@cluster0-kfag5.mongodb.net/rocketPlanet?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(8080)
