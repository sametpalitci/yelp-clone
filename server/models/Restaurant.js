module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Restaurant', {
        name: {
            type: DataTypes.STRING,
            require: true
        },
        location: {
            type: DataTypes.STRING,
            require: true
        },
        price: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            require: true
        }
    });
}