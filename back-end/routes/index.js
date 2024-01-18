const express = require('express');
const router = express.Router();

const studentRouter = require('./student');
const participationRouter = require("./participation");
const bugRouter = require("./bug");
const projectRouter = require("./project");

router.use('/student', studentRouter);
router.use('/participation', participationRouter);
router.use('/bug', bugRouter);
router.use('/project', projectRouter);

module.exports = router;