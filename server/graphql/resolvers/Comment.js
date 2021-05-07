const { verify } = require('jsonwebtoken');
const checkFields = require('../../utils/checkFields');
const db = require('../../models');

const add = async(args, context) => {
    const { comment, skor, restaurantId } = args;
    if (!checkFields(comment, skor, restaurantId)) {
        return new Error("The fields can't be empty");
    }
    try {
        const userInfo = verify(context.request.headers.authorization, process.env.SECRET_KEY_FOR_USER);
        const potantialComment = {
            comment,
            skor,
            restaurantId,
            userId: userInfo.id
        }
        await db.Comment.create(potantialComment);
        return potantialComment;
    } catch (error) {
        return new Error(error)
    }
};

const get = async(args) => {
    try {
        const { restaurantId } = args;
        const fetchCommentsByRestaurant = await db.Comment.findAll({
            where: [{
                restaurantId
            }],
            raw: true
        });
        return fetchCommentsByRestaurant;
    } catch (error) {
        return new Error(error)
    }
};

module.exports = { add, get }