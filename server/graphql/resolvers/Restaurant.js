const checkFields = require('../../utils/checkFields')
const db = require('../../models');
const { verify } = require('jsonwebtoken');

const add = async(args, context) => {
    const { name, location, price } = args;
    if (!checkFields(name, location, price)) {
        return new Error("The fields can't be empty");
    }
    try {
        const userInfo = verify(context.request.headers.authorization, process.env.SECRET_KEY_FOR_USER);
        const potantialRestaurant = {
            name,
            location,
            price,
            userId: userInfo.id
        }
        await db.Restaurant.create(potantialRestaurant);
        return potantialRestaurant;
    } catch (error) {
        return new Error(error)
    }
};

const get = async(args) => {
    try {
        const findFilterRestaurant = await db.Restaurant.findAll({ raw: true });
        return findFilterRestaurant;
    } catch (error) {
        return new Error(error);
    }
}

module.exports = { add, get }