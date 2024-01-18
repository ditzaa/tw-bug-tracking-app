const { DataTypes } = require('sequelize');

module.exports = (database) => {
    const model = database.define('bug', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        severity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commitLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resolveCommitLink: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'none'
        },
    });

    
    return model;
};