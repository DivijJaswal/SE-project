const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;
const HTO = (req, res, next) => {
  var authHeader = req.headers.authorization || req.headers.cookie;
  if (!authHeader) { next(); }
  else if (!req.headers.authorization) {

    authHeader = authHeader.substr(23, authHeader.length - 23);
    authHeader = "Bearer " + authHeader;
  }
  if (!authHeader || !((authHeader.length) > 6) || (authHeader.substr(0, 6) != "Bearer")) {
    next();
  }


  else {
    const token = authHeader.substr(7, authHeader.length - 7);
    try {
      const payload = jwt.verify(token, key);
      req.user = payload;
      res.redirect("/operations");

    }
    catch (err) {
      next();
    }
  }
}
module.exports = HTO;