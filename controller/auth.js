const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors')
// const bcryptjs =  require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    try {
        const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user : {name: user.name},token});
    } catch (error) {
        res.status(400).json(error);
    }
}
const login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError("Please provide email or password")

    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Invalid credentials");
    }

    const isPassword = await user.comparePassword(password);
    if(!isPassword){
        throw new UnauthenticatedError("Invalid credentials");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name: user.name},token});
}

module.exports = {register, login};