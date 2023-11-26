const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {unAuthenticatedError} = require('../errors');
require('dotenv').config();


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new unAuthenticatedError("Authentication failed")
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId : payload.userId, name : payload.name};
        next();
    } catch (error) {
        throw new unAuthenticatedError("Authentication failed")

    }
}

module.exports = auth;
