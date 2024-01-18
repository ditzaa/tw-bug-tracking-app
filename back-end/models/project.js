const { DataTypes } = require('sequelize');

module.exports = (database) => {
    const model = database.define('project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        repository: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return model;
};