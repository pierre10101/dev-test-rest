const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.User;
/**
 * This method is used to verify that a jwt token is valid
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next} next 
 * @returns Response | void
 */
module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ");
    if(token[0].toLowerCase() !== 'bearer') {
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate.",
      });
    }
    if (!token) {
      return res.status(403).send({
        auth: false,
        message: "No token provided.",
      });
    }
    jwt.verify(token[1], process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(500).send({
          auth: false,
          message: "Fail to Authentication. Error " + error,
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(500).send({
      auth: false,
      message: "Fail to Authentication. Error " + error,
    });
  }
};
/**
 * Checks whether there is a email already in the db.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next} next 
 * @returns Response | Void
 */
module.exports.checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  })
  if (user) {
    return res
      .status(400)
      .json({ status: 400, message: "Username is already taken!" });

  }
  next();
};
