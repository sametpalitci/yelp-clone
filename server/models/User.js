module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            require: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            require: true
        }
    });
}