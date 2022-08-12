const db = require("../models/index");
const Task = db.Task;
const { checkDuplicateTask } = require('./tasks.service')
/**
 * Checks if there is a duplicate task in DB -> Currently not used, assumption is that duplicates should be allowed
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next} next 
 * @returns Response | Void
 */
module.exports.checkDuplicateTask = async (req, res, next) => {
    const task = await Task.findOne({
        where: {
            title: req.body.title,
        },
    })
    if (task) {
        return res
            .status(400)
            .json({ status: 400, message: "The particular Task already Exists, Rather update!" });
    }
    next();
};