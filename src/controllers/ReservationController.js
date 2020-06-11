const jwt = require('jsonwebtoken');
const Reservation = require('./../models/Reservation');
const Rocket = require('./../models/Rocket');
const User = require('./../models/User');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const makeReservation = (req, res) => {
    jwt.verify(req.token, 'rocket', async (err, data) => {
        if (data) {
            const { _id } = data.user;
            const { idRocket, date } = req.body;

            let reservation = await Reservation.find({ user: _id });

            if (reservation.length > 0) {
                return res.send({ message: "you already made a reservation", error: true });
            }

            else {
                let rocket = await Rocket.findOne({ _id: idRocket });
                let userData = await User.findOne({ _id });

                if (rocket.price > userData.balance) {
                    return res.send({ message: "insufficient funds", error: true });
                }
                else {
                    let user = await User
                        .update(
                            { _id },
                            {
                                $set: {
                                    balance: userData.balance - rocket.price
                                }
                            }
                        );

                    if(user){
                        let makeRes = await Reservation.create({
                            date,
                            user: _id,
                            rocket: idRocket
                        });
    
                        if(makeRes) {
                            return res.send({ message: "reservation successful", error: false });
                        }
                        else{
                            return res.send({ message: "error when booking", error: true });
                        }
                    }
                    else{
                        return res.send({ message: "error when booking", error: true });
                    }
                }


            }

        }
        else {
            return res.send({ message: "Authenticated falied", error: true }).status(401);
        }
    });
}

const cancel = (req, res) => {
    jwt.verify(req.token, 'rocket', async (err, data) => {
        if (data) {
            const { id } = req.params;

            let reservation = await Reservation.remove({ _id: id });

            if (reservation) {
                return res.send({ message: "reservation canceled successfully", error: false })
            }
            else {
                return res.send({ message: "error canceling reservation", error: true })
            }
        }
        else {
            return res.send({ message: "Authenticated falied", error: true }).status(401);
        }
    });
}

const getReservation = (req, res) => {
    jwt.verify(req.token, 'rocket', async (err, data) => {
        if (data) {
            const { _id } = data.user;

            let reservation = await Reservation.aggregate([
                { $match: { user: ObjectId(_id) }},
                {
                    $lookup : {
                        from : Rocket.collection.name,
                        localField: "rocket",
                        foreignField: "_id",
                        as: "rocket_info"
                    }
                }
            ]);

            if (reservation) {
                return res.send(reservation[0]);
            }
            else {
                return res.send({ message: "error when querying reservations", error: true })
            }
        }
        else {
            return res.send({ message: "Authenticated falied", error: true }).status(401);
        }

    })
}

module.exports = {
    makeReservation,
    cancel,
    getReservation
}
