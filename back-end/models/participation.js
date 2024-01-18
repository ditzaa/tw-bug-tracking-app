const { DataTypes } = require('sequelize');

module.exports = (database) => {
    const model = database.define('participation', {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    
    return model;
};