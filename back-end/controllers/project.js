const { ProjectDb, StudentDb, BugDb } = require("../models");
const { Op } = require("sequelize");

const controller = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await ProjectDb.findAll();
      res.status(200).send(projects);
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  createProject: async (req, res) => {
    try {
      const payLoad = {
        name: req.body.name,
        repository: req.body.repository,
        members: req.body.members,
      };

      const project = await ProjectDb.create(payLoad);

      const members = await StudentDb.findAll({
        where: {
          email: {
            [Op.in]: payLoad.members,
          },
        },
      });

      project.addStudents(members, {
        through: {
          role: "member",
        },
      });

      await project.save();

      res.status(201).send(project);
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  getProjectById: async (req, res) => {
    try {
      const projectId = req.params.id;
      const project = await ProjectDb.findByPk(projectId, {
        include: [StudentDb, BugDb],
      });
      res.status(200).send(project);
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  //TO-DO
  // updateProject: async (req, res) =>{
  //     try{
  //         const projectId = req.params.id;

  //         const project = await ProjectDb.findByPk(projectId);

  //         if(!project){
  //             res.status(400).send(`Crocodulul cu id ${crocoId} nu exista`)
  //         }

  //         const payLoad = {
  //             name: req.body.name,
  //             repository: req.body.repository,
  //         };

  //         const updatedProject = await project.update(payLoad);
  //         res.status(200).send(updatedProject);

  //     }catch(error){
  //         res.status(500).send("Server error!" + error.message);
  //     }
  // },
};

module.exports = controller;
