const express = require('express');

const router = express.Router();

const {studentController} = require('../controllers');

router.post('/login', studentController.loginStudent);
router.post('/create-account', studentController.createStudent);
router.post('/create-tester', studentController.createTester);

module.exports = router;