const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../models');

const checkFields = require('../../utils/checkFields');

const login = async(args) => {
    const { username, password } = args;
    if (!checkFields(username, password)) {
        return new Error("The fields can't be empty");
    }
    const checkUser = await db.User.findOne({ where: [{ username }], raw: true });
    if (!checkUser) {
        return new Error("username or password is not correct");
    }
    if (!bcrpyt.compareSync(password, checkUser.password)) {
        return new Error("username or password is not correct");
    }
    const tokenContext = { id: checkUser.id, username };
    const token = jwt.sign(tokenContext, process.env.SECRET_KEY_FOR_USER);
    checkUser.token = token;
    return checkUser;
}
const register = async(args) => {
    const { username, password } = args;
    if (!checkFields(username, password)) {
        return new Error("The fields can't be empty");
    }
    const checkUser = await db.User.findOne({ where: [{ username }], raw: true });
    if (checkUser) {
        return new Error("This username already use");
    }
    const hashPassword = bcrpyt.hashSync(password, bcrpyt.genSaltSync(10));
    const potanitalUser = {
        username: username,
        password: hashPassword
    };
    const createdUser = await db.User.create(potanitalUser);
    return createdUser;
}
module.exports = { login, register }