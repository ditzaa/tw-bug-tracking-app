const { StudentDb, ProjectDb } = require("../models");

const controller = {
  loginStudent: async (req, res) => {
    const { email, password } = req.body;
    try {
      let query = await StudentDb.findOne({
        where: { email: email, password: password },
      });

      if (query) {
        res.status(201).send({ message: "Authenticated!", student: query.get() });
      } else {
        res.status(404).send({ message: "Email or password wrong!" });
      }
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  createStudent: async (req, res) => {
    try {
      const payLoad = {
        email: req.body.email,
        password: req.body.password,
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(payLoad.email)) {
        return res.status(400).json({ message: "Email format not valid." });
      }

      const student = await StudentDb.create(payLoad);
      res.status(201).send(student);
    } catch (error) {
      res.status(500).send("Server error!" + error.message);
    }
  },

  createTester: async (req, res) => {
    try {
      const payLoad = {
        studentId: req.body.studentId,
        projectId: req.body.projectId,
      };

      const student = await StudentDb.findByPk(payLoad.studentId);
      const project = await ProjectDb.findByPk(payLoad.projectId);

      await project.addStudent(student, {
        through: {
          role: "tester",
        },
      });
      await project.save();

      res.status(201).send();
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error!" + error.message);
    }
  },
};

module.exports = controller;
