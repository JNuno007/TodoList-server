const User = require("../models/user.model");
const Project = require("../models/project.model");
const Task = require("../models/task.model");
var express = require("express");
var router = express.Router();

const createProject = (res, title, description, userId) => {
  Project.create({
    title,
    description,
    userId,
  })
    .then((project) => {
      res.status(200).send({
        project,
        message: "Project created!",
      });
    })
    .catch((err) => {
      res.status(404).send("Could not create Project");
    });
};

const editProject = (res, userId, title, description, id) => {
  Project.findOne({ userId, _id: id }, (err, project) => {
    if (err) {
      return res.status(404).send("Could not update the project");
    }
    if (project) {
      project.title = title;
      project.description = description;
      project
        .save()
        .then((prj) => {
          return res.status(200).send({
            prj,
            message: "Project was updated!",
          });
        })
        .catch((err) => {
          return res.status(500).send("Project could not be saved");
        });
    } else {
      return res.status(500).send();
    }
  });
};

const deleteProject = (res, userId, id) => {
  Project.findOneAndDelete({ userId, _id: id }, (err, project) => {
    if (err)
      return res.status(404).send("Could not delete the requested project");
    if (project) {
      Task.deleteMany({ projectId: id }, (err, tasks) => {
        if (err) return res.status(404).send("Could not delete all the tasks");
        if (tasks) {
          return res.status(200).send({
            projectId: id,
            tasks,
            message: "The project and respective tasks were deleted",
          });
        }
      });
    }
  });
};

//Create a project from logged user
router.post("/create", (req, res, _next) => {
  const { username } = req.user;
  const { title, description } = req.body;
  if (title && description) {
    User.findOne({ username }, (err, user) => {
      if (user) {
        createProject(res, title, description, user._id);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });
  } else {
    res.status(404).send({ message: "Missing project data" });
  }
});

//Edit a selected project from logged user
router.post("/edit", (req, res, _next) => {
  const { username } = req.user;
  const { title, description, id } = req.body;
  if (title && description && id) {
    User.findOne({ username }, (err, user) => {
      if (user) {
        editProject(res, user._id, title, description, id);
      } else {
        res.status(404).send({message: "User not found"});
      }
    });
  } else {
    res.status(404).send({message: "Missing project data"});
  }
});

//DELETE: it will delete the project and all the tasks linked to that project
router.post("/delete", (req, res, _next) => {
  const { username } = req.user;
  const { projectId } = req.body;
  if (projectId) {
    User.findOne({ username }, (err, user) => {
      if (user) {
        deleteProject(res, user._id, projectId);
      } else {
        res.status(404).send({message: "User not found"});
      }
    });
  } else {
    res.status(404).send({message: "Missing project data"});
  }
});

//Get all projects from logged user
router.get("/", (req, res) => {
  const { username, userId } = req.user;
  User.findOne({ username }, (err, user) => {
    if (user) {
      Project.find({ userId }, (err, projects) => {
        if (err) {
          return res
            .status(404)
            .send({ message: "Could not get any projects from the user" });
        }
        if (projects) {
          return res.status(200).send({
            projects,
          });
        }
        return res.status(500).send();
      });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  });
});

module.exports = router;
