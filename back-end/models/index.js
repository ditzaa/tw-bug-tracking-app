const database = require('../config/db');

const StudentModel = require('./student');
const ParticipationModel = require('./participation');
const BugModel = require('./bug');
const ProjectModel = require('./project');

const StudentDb = StudentModel(database);
const ParticipationDb = ParticipationModel(database);
const BugDb = BugModel(database);
const ProjectDb = ProjectModel(database);

StudentDb.hasMany(BugDb);
BugDb.belongsTo(StudentDb);

StudentDb.belongsToMany(ProjectDb, { through:  ParticipationDb});
ProjectDb.belongsToMany(StudentDb, { through: ParticipationDb });

ProjectDb.hasMany(BugDb);
BugDb.belongsTo(ProjectDb);

module.exports = {
    StudentDb,
    ParticipationDb,
    BugDb,
    ProjectDb
}