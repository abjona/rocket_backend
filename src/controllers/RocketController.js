const jwt = require('jsonwebtoken');
const Rocket = require('./../models/Rocket');
const Company = require('./../models/Company');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const store = (req, res) => {
  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {
      const { model, price, dates, accents, company } = req.body;
      let rocket = await Rocket.create({
        model,
        price,
        dates,
        accents,
        company
      });

      if (rocket) {
        return res.send({ message: "rocket successfully added", error: false });
      }
      else {
        return res.send({ message: "error adding company", error: true })
      }

    }
    else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}

const update = (req, res) => {
  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {
      const { model, price, dates, accents, _id } = req.body;
      let rocket = await Rocket
        .update(
          { _id },
          {
            $set: {
              model,
              price,
              dates,
              accents
            }
          }
        );

      if (rocket) {
        return res.send({ message: "rocket successfully edited", error: false });
      }
      else {
        return res.send({ message: "error edited company", error: true })
      }

    }
    else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}

const getRocketsCompany = (req, res) => {
  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {
      const { companyId } = req.params;

      let rockets = await Rocket.aggregate([
        { $match: { company: ObjectId(companyId) } },
        {
          $lookup: {
            from: Company.collection.name,
            localField: "company",
            foreignField: "_id",
            as: "company_info"
          }
        }
      ]);
      return res.send(rockets);
    }
    else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}

const getAllRockets = (req, res) => {
  jwt.verify(req.token, 'rocket', async (err, data) => {
    if (data) {
      let rockets = await Rocket.aggregate([
        {
          $lookup: {
            from: Company.collection.name,
            localField: "company",
            foreignField: "_id",
            as: "company_info"
          }
        }
      ])

      return res.send(rockets);
    }
    else {
      return res.send({ message: "Authenticated falied", error: true }).status(401);
    }
  });
}

module.exports = {
  store,
  update,
  getRocketsCompany,
  getAllRockets,
}
