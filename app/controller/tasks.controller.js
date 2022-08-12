const db = require("../models/index");
const Task = db.Task;

/**
 * Creates a new Task
 * @param {Request} req 
 * @param {Response} res 
 * @returns Response
 */
module.exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      userId: req.userId,
      title: req.body.title,
      description: req.body.description
    })
    if (task) {
      return res.status(200).json({
        message: "Successfully created a new Task!",
      });
    }
    return res.status(400).json({
      message: "Something went wrong",
      error: "Could not create Task!"
    })
  } catch (error) {
    return res.status(500).json({
      description: "Something went wrong, please try again!",
      error: "System"
    });
  }
}

module.exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId }
    })
    //TODO - Add validation for fields to body. Currently it only updates if field present
    task.update(req.body)
    return res.status(200).json({
      description: "Your data has been updated successfully, as follows",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      description: "Something went wrong",
      error: 'System',
    });
  }
}

module.exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId }
    })
    if (task) {
      return res.status(200).json({
        description: "Got a task",
        data: task,
      });
    }
    return res.status(400).json({
      description: "No task found",
    });
  } catch (error) {
    return res.status(500).json({
      description: "Something went wrong",
      error: 'System',
    });
  }
}
/**
 * Retrieves all tasks associated with a user
 * @param {Request} req 
 * @param {Response} res 
 * @returns Response
 */
module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId }
    })
    if (tasks.length > 0) {
      return res.status(200).json({
        description: "Got all Tasks",
        data: tasks,
      });
    }
    return res.status(400).json({
      description: "No task found",
    });
  } catch (error) {
    return res.status(500).json({
      description: "Something went wrong",
      error: 'System',
    });
  }
}
/**
 * Deletes a task associated with a particular user
 * @param {Request} req 
 * @param {Response} res 
 * @returns Response
 */
module.exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.destroy({
      where: { id: req.params.id, userId: req.userId },
    })
    if (task) {
      return res.status(200).json({
        description: "Successfully deleted task."
      });
    }
    return res.status(400).json({
      description: "Task does not exist.",
    });
  } catch (error) {
    res.status(500).json({
      description: "Something went wrong",
      error: 'System',
    });
  }
}