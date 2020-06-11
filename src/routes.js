const express = require('express');
const routes = express.Router();
const Authentication = require('./middlewares/Authentication');

const UserController = require("./controllers/UserController");
const CompaniesController = require("./controllers/CompaniesController");
const RocketController = require("./controllers/RocketController");
const Reservation = require("./controllers/ReservationController");

routes.get('/rocketInterplanet/test',(req, res)=>{
    res.send({ message : 'Test OK'});
});

routes.post(
    '/rocketInterplanet/store',
    UserController.store
);

routes.post(
    '/rocketInterplanet/login',
    UserController.login
);

routes.get(
    '/rocketInterplanet/getUser',
    Authentication.verifyToken,
    UserController.getUser
);

//companies routes
routes.post(
    '/rocketInterplanet/company/store',
    Authentication.verifyToken,
    CompaniesController.store
);

routes.get(
    '/rocketInterplanet/company/get',
    Authentication.verifyToken,
    CompaniesController.getCompanies
);

routes.put(
    '/rocketInterplanet/company/update',
    Authentication.verifyToken,
    CompaniesController.update
);


routes.post(
    '/rocketInterplanet/company/available',
    Authentication.verifyToken,
    CompaniesController.available
);

//rockets routes
routes.post(
    '/rocketInterplanet/rocket/store',
    Authentication.verifyToken,
    RocketController.store
);

routes.get(
    '/rocketInterplanet/rocket/getAll',
    Authentication.verifyToken,
    RocketController.getAllRockets
);

routes.get(
    '/rocketInterplanet/rocket/:companyId',
    Authentication.verifyToken,
    RocketController.getRocketsCompany
);

routes.put(
    '/rocketInterplanet/rocket/update',
    Authentication.verifyToken,
    RocketController.update
);

//routes reservation
routes.post(
    '/rocketInterplanet/reservation/makeReservation',
    Authentication.verifyToken,
    Reservation.makeReservation
);

routes.get(
    '/rocketInterplanet/reservation/get',
    Authentication.verifyToken,
    Reservation.getReservation
);

routes.delete(
    '/rocketInterplanet/reservation/cancel/:id',
    Authentication.verifyToken,
    Reservation.cancel
);


module.exports = routes;