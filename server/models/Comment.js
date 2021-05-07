module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        comment: {
            type: DataTypes.STRING,
            require: true
        },
        skor: {
            type: DataTypes.INTEGER,
            require: true
        },
        userId: {
            type: DataTypes.INTEGER,
            require: true
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            require: true
        }
    });
}