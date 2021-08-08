const Project = require("../models/project.model");
const Task = require("../models/task.model");
var express = require("express");
var router = express.Router();

const createTask = (res, project, title, description, userId) => {
  Task.create(
    {
      title,
      description,
      projectId: project._id,
      userId,
      createdDate: new Date(),
    },
    (err, task) => {
      if (err) {
        return res.status(404).send({ message: "Could not create task" });
      }
      if (task) {
        return res.status(200).send({
          message: "Task created!",
          task,
        });
      } else {
        return res.status(500).send();
      }
    },
  );
};

//CREATE
router.post("/create", (req, res, _next) => {
  const { userId } = req.user;
  const { projectId, title, description } = req.body;

  if (projectId && title && description) {
    Project.findOne({ _id: projectId, userId }, (err, project) => {
      if (err) {
        return res.status(404).send({ message: "Project not found" });
      }
      if (project) {
        createTask(res, project, title, description, userId);
      }
    });
  } else {
    return res.status(404).send({ message: "Missing task data" });
  }
});

//EDIT

router.post("/edit", (req, res, _next) => {
  const { userId } = req.user;
  const { taskId, title, description, finished } = req.body;

  if (taskId && title && description) {
    Task.findOneAndUpdate(
      { _id: taskId, userId },
      {
        title,
        description,
        finishedDate: finished ? new Date() : null,
      },
      { new: true },
      (err, task) => {
        if (err) {
          return res.status(404).send({ message: "Could not find task." });
        }
        if (task) {
          return res.status(200).send({
            message: "Task updated!",
            success: true,
            task,
          });
        }
        return res.status(500).send();
      },
    );
  } else {
    return res.status(404).send({ message: "Missing task data" });
  }
});

//REMOVE
router.post("/remove", (req, res, _next) => {
  const { userId } = req.user;
  const { taskId } = req.body;

  if (taskId) {
    Task.findOneAndDelete({ _id: taskId, userId }, (err, task) => {
      if (err) {
        return res.status(404).send({ message: "Could not remove task." });
      }
      if (task) {
        return res.status(200).send({
          message: "Task removed!",
          task,
        });
      }
      return res.status(500).send();
    });
  } else {
    return res.status(404).send({ message: "Missing task data" });
  }
});

//GET TASKS FROM Project
router.get("/tasks", (req, res, _next) => {
  const { userId } = req.user;
  const { projectId } = req.query;

  Task.find({ projectId, userId }, (err, tasks) => {
    if (err) {
      return res
        .status(404)
        .send({ message: "Could not get any task from project." });
    }
    if (tasks) {
      return res.status(200).send({
        tasks,
        message: "Tasks from project",
      });
    } else {
      return res.status(500).send();
    }
  });
});

module.exports = router;
