const jwt = require('jsonwebtoken');
const Company = require('./../models/Company');

const store = (req, res) => {
    jwt.verify(req.token,'rocket', async (err, data)=>{
        if(data){
            const { name } = req.body;
            let company = await Company.create({
                name,
                rating: []
            });
            
            if(company){
                return res.send({ message: "company successfully added", id: company._id, error: false });
            }
            else{
                return res.send({ message: "error adding company", error: true })
            }

        }else{
            return res.send({ message: "Authenticated falied", error: true }).status(401);
        }
    });
}

const getCompanies = (req, res) => {
    jwt.verify(req.token,'rocket', async (err, data)=>{
        if(data){
           let companies = await Company.find({});
           return res.send(companies);
        }
        else{
            return res.send({ message: "Authenticated falied", error: true }).status(401);
        }
    });
} 

const update = (req, res) => {
    const { _id, name } = req.body;
    
    jwt.verify(req.token,'rocket', async (err, data)=>{
        if(data){
           let companie = await Company
           .update(
               { _id },
               { 
                   $set: {
                       name
                   }
               }
            );
        
           if(companie){
               return res.send({ message: "company successfully edited", error: false });
           }
        }
        else{
            return res.send({ message: "Authenticated falied", error: true }).status(401);
        }
    });
}

const available = (req, res) => {
    const { _id, available } = req.body;
    jwt.verify(req.token,'rocket', async (err, data)=>{
        if(data){
           let companie = await Company
           .update(
               { _id },
               { 
                   $push: {
                       rating: available
                   }
               }
            );
        
           if(companie){
               return res.send({ message: "company successfully available", error: false });
           }
        }
        else{
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

