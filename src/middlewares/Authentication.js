const User = require('./../models/User');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return next();
  } else {
    return res.status(403).send();
  }
}

async function verifyEmail(req, res, next){
  const { email } = req.body;
  let hasEmail = await User.find({ email });
  if(hasEmail.length > 0){
    return res.send({ message : "e-mail already registered", error: true });
  }
  else{
    return next();
  }

}

module.exports = {
  verifyToken,
  verifyEmail
};
