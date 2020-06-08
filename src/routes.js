const express = require('express');
const routes = express.Router();

routes.get('/rocket/test',(req, res)=>{
    res.send({ message : 'Test OK'});
});

module.exports = routes;