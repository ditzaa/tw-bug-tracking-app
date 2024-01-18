const { DataTypes } = require('sequelize');

module.exports = (database) => {
    const model = database.define('student', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    
    return model;
};