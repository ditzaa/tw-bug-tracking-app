const {ParticipationDb} = require('../models');

const controller = {
    createTester : async (req, res)=>{
        try{

            const payLoad = {
                role: "tester",
                studentId: req.body.studentId,
                projectId: req.body.projectId,
            };

            const tester = await ParticipationDb.create(payLoad);

            res.status(201).send(tester);
        }catch(error){
            res.status(500).send("Server error!" + error.message);
        }
    }
};

module.exports = controller;