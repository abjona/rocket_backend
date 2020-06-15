const jwt = require('jsonwebtoken');
const Company = require('./../models/Company');
const Reservation = require('./../models/Reservation');

const store = (req, res) => {
  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {
      const { name } = req.body;
      let company = await Company.create({
        name,
        rating: [0]
      });

      if (company) {
        return res.send({ message: "company successfully added", id: company._id, error: false });
      }
      else {
        return res.send({ message: "error adding company", error: true })
      }

    } else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}

const getCompanies = (req, res) => {
  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {
      let companies = await Company.find({});
      return res.send(companies);
    }
    else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}

const update = (req, res) => {
  const { _id, name } = req.body;

  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {
      let companie = await Company
        .update(
          { _id },
          {
            $set: {
              name
            }
          }
        );

      if (companie) {
        return res.send({ message: "company successfully edited", error: false });
      }
    }
    else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}

const available = (req, res) => {
  console.log(req.body)
  const { idCompany , available, idReservation } = req.body;
  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {

      let reserv = await Reservation
      .update({ _id: idReservation }, {
        $set: {
          rate: true
        }
      });

      let companie = await Company
        .update(
          { _id: idCompany },
          {
            $push: {
              rating: available
            }
          }
        );

      if (companie && reserv) {
        return res.send({ message: "company successfully available", error: false });
      }
    }
    else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}



module.exports = {
  store,
  update,
  available,
  getCompanies
}

