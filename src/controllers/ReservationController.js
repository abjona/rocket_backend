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
      const { idRocket, date, price } = req.body;

      let reservation = await Reservation.find({ user: _id });

      if (reservation.length > 0) {
        return res.send({ message: "you already made a reservation", error: true });
      }

      else {
        let userData = await User.findOne({ _id });
        let rocketData = await Rocket.findOne({ _id: idRocket });

        if (rocketData.price > userData.balance) {
          return res.send({ message: "insufficient funds", error: true });
        }
        if (rocketData.accents == 0) {
          return res.send({ message: "insufficient funds no more accents available", error: true });
        }
        else if (rocketData && rocketData) {

          let user = await User
            .update(
              { _id },
              {
                $set: {
                  balance: userData.balance - rocketData.price
                }
              }
            );

          let rocket = await Rocket
            .update(
              { _id: idRocket },
              {
                $inc: {
                  accents: -1
                }
              }
            );

          if (user && rocket) {
            let makeRes = await Reservation.create({
              date,
              price,
              user: _id,
              rate: false,
              rocket: idRocket
            });

            if (makeRes) {
              return res.send({ message: "reservation successful", error: false });
            }
            else {
              return res.send({ message: "error when booking", error: true });
            }
          }
          else {
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
      const { _id } = data.user;
      const { id } = req.params;

      let reserv = await Reservation.findOne({ _id: id });
      let reservation = await Reservation.remove({ _id: id });

      if (reservation.deletedCount == 1) {
        let user = await User
          .update(
            { _id },
            {
              $inc:{
                balance: reserv.price
              }
            }
          );

        let rocket = await Rocket
          .update(
            { _id: reserv.rocket },
            {
              $inc: {
                accents: 1
              }
            }
          );
        if (user && rocket) {
          return res.send({ message: "reservation canceled successfully", error: false })
        }
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
        { $match: { user: ObjectId(_id) } },
        {
          $lookup: {
            from: Rocket.collection.name,
            localField: "rocket",
            foreignField: "_id",
            as: "rocket_info"
          }
        }
      ]);

      if (reservation) {
        return res.send(reservation);
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
