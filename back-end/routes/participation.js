const express = require('express');

const router = express.Router();

const {participationController} = require('../controllers');

router.post('/createTester', participationController.createTester);

module.exports = router;