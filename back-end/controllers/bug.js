const {BugDb, ProjectDb, StudentDb} = require('../models');

const controller = {
    getAllBugsByprojectId : async(req, res)=>{
        const projectId = req.params.projectId;

        try{
            const project = await ProjectDb.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        const bugs = await BugDb.findAll({
            where: { projectId: projectId },
        });

        res.status(200).json(bugs);
            
        }catch(error){
            res.status(500).send("Server error!" + error.message);
        }
    },

    createBug: async (req, res) =>{
        try{             
            const payLoad = {
                description: req.body.description,
                severity: req.body.severity,
                priority: req.body.priority,
                commitLink: req.body.commitLink,
                // resolveCommitLink: req.body.resolveCommitLink,
                projectId: req.body.projectId,
            };

            const bug = await BugDb.create(payLoad);
            
            res.status(201).send(bug);
        } catch(error){
            res.status(500).send("Server error!" + error.message);
        }
    },

    getBugById: async (req, res) =>{
        try{
            const bugId = req.params.bugId;
            const bug = await BugDb.findByPk(bugId);
            
            if (!bug) {
                return res.status(404).json({ error: 'Bug not found.' });
            }
            
            res.status(200).send(bug);
        }catch(error){
            res.status(500).send("Server error!" + error.message);
        }
    },

    assignBug : async (req, res)=>{
        try{
            const studentId = req.body.studentId;
            const id = req.body.id;

            const bug = await BugDb.findByPk(id);
            const student = await StudentDb.findByPk(studentId);

            if(!bug){
                res.status(400).send(`The bug with the 
                id ${id} doesn't exist.`)
            }

            if(!student){
                res.status(400).send(`The student with the 
                id ${studentId} doesn't exist.`)
            }
            
            const assignedBug = await bug.update({
                studentId: studentId,
            });

            res.status(200).send(assignedBug);
        } catch(error){
            res.status(500).send("Server error!" + error.message);
        }   
    },

    resolveBug : async (req, res)=>{
        try{
            const resolveCommitLink = req.body.resolveCommitLink;
            const id = req.body.id;

            const bug = await BugDb.findByPk(id);
            
            if(!bug){
                res.status(400).send(`The bug with the 
                id ${id} doesn't exist.`)
            }

            const resolvedBug = await bug.update({
                resolveCommitLink: resolveCommitLink,
            });

            res.status(200).send(resolvedBug);
        } catch(error){
            res.status(500).send("Server error!" + error.message);
        }   
    },
};

module.exports = controller;