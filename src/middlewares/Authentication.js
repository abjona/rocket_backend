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

  module.exports = {
    verifyToken
  };