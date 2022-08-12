const db = require("../models/index");
const User = db.User;
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPasswordWithHash } = require('../services/hash-password.service');
/**
 * Signup a new user
 * @param {Request} req 
 * @param {Response} res 
 * @returns Response
 */
module.exports.signup = async (req, res) => {
  try {
    await User.create({
      email: req.body.email,
      password: await hashPassword(req.body.password),
    })
    return res
      .status(200)
      .json({ status: 200, message: "User registered successfully!" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: "Error " + error });
  }
};
/**
 * Signin a particular user
 * @param {Request} req 
 * @param {Response} res 
 * @returns Response
 */
module.exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (!user) {
      return res.status(401).send({
        auth: false,
        accessToken: null,
        reason: "Email or Password invalid",
      });
    }
    const passwordIsValid = verifyPasswordWithHash(user.password, req.body.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        accessToken: null,
        reason: "Email or Password invalid",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });

    return res.status(200).json({ auth: true, accessToken: token });
  } catch (error) {
    return res.status(500).send("Error -> " + error);
  }
};
