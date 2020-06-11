const jwt = require('jsonwebtoken');
const md5 = require("md5");
const User = require('./../models/User');

const login = async (req, res) =>{
    let { email, password } = req.body;
    password = md5(password);
    let user = await User.findOne({ email, password });

    if(user){
        await jwt.sign({ user }, 'rocket',(err, token)=>{
            return res.send({
                token,
                user
            });
        });
    }
    else{
        return res.send({ message: "user not found", error: true });
    }
};


const store = async (req, res) =>{
    let { name, email, password, type } = req.body;
    password = md5(password);
    let user = await User.create({
        name,
        email,
        password,
        balance: 500.00,
        type
    });

    if(user){
        return res.send({ message: "successful registration", error: false });
    }
    else{
        return res.send({ message: "error when registering", error: true });
    }
};

const getUser = (req, res) => {
    jwt.verify(req.token, 'rocket', async (err, data)=>{
        if(data){
           const { _id } = data.user;
           let user = await User.findOne({ _id });

           if(user){
               return res.send(user);
           }
           else{
               return res.send({ message: "error fetching user", error: true });
           }
        }
        else{
            return res.send({ message: "Authenticated falied", error: true }).status(401);
        }
    });
}

module.exports = {
    login,
    store,
    getUser
}