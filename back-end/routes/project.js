const express = require('express');

const router = express.Router();

const {projectController} = require('../controllers');

router.post('/create-project', projectController.createProject);
router.get('/getAll', projectController.getAllProjects);
router.get('/getProject/:id', projectController.getProjectById);
// router.put('/updateProject/:id', projectController.updateProject);

module.exports = router;