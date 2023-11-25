const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors')
const bcryptjs =  require('bcryptjs');

const register = async(req, res) => {
    const user = await User.create({...req.body});

    res.status(StatusCodes.CREATED).json({user});
}
const login = async(req, res) => {
    res.send('login User');
}

module.exports = {register, login};