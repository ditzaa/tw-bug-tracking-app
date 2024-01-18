const express = require('express');

const router = express.Router();

const {bugController} = require('../controllers');
const { getBugById } = require('../controllers/bug');

router.post('/createBug', bugController.createBug);
router.get('/getAllBugsByProject/:projectId', bugController.getAllBugsByprojectId);
router.get('/getBug/:bugId', bugController.getBugById);
router.put('/assignBug', bugController.assignBug);
router.put('/resolveBug', bugController.resolveBug);

module.exports = router;