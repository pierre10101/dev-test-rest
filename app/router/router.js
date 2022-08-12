/**
 * File to deal with routes
 */
const { checkDuplicateUserNameOrEmail, verifyToken } = require("../services/accounts.service");
const { signin, signup, userContent } = require("../controller/accounts.controller.js");
const { createTask, updateTask, getTask, getAllTasks, deleteTask } = require("../controller/tasks.controller.js");
module.exports = (app) => {
  // Root Domain, maybe health check
  app.get(
    "/", (_req,res) => {
      return res.send('<h1>Ok</h1>')
    }
  );

  // Accounts Controller
  app.post(
    "/api/auth/signup",
    checkDuplicateUserNameOrEmail,
    signup
  );
  app.post("/api/auth/signin", signin);

  // Tasks Controller
  app.post("/api/task", verifyToken, createTask);
  app.put("/api/task/:id", verifyToken, updateTask);
  app.get("/api/task/:id", verifyToken, getTask);
  app.get("/api/task", verifyToken, getAllTasks);
  app.delete("/api/task/:id", verifyToken, deleteTask);

};
