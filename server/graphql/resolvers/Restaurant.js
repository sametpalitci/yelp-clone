const checkFields = require('../../utils/checkFields')
const db = require('../../models');
const { verify } = require('jsonwebtoken');
const util = require('util');
const redis = require('redis');
const client = redis.createClient();
client.get = util.promisify(client.get);

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
        await client.del("allRestaurant");
        return potantialRestaurant;
    } catch (error) {
        return new Error(error)
    }
};

const get = async(args) => {
    const cachedBlogs = await client.get('allRestaurant');
    if (cachedBlogs) {
        return JSON.parse(cachedBlogs)
    } else {
        try {
            const findFilterRestaurant = await db.Restaurant.findAll({ raw: true });
            await client.set('allRestaurant', JSON.stringify(findFilterRestaurant));
            return findFilterRestaurant;
        } catch (error) {
            return new Error(error);
        }
    }
}

module.exports = { add, get }