const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true,"Please provide name"],
        minlength : 3,
        maxlength : 50,
    },
    email: {
        type : String,
        required : [true, "Please Provide email"],
        match:[/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,"Please provide valid email"],
        unique: true    
    },
    password: {
        type : String,
        required : [true, "Please provide password"],
        minlength : 6,
        maxlength : 255
    },
        
})

UserSchema.pre('save', async function() {
    const salt = await  bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password,salt);
})



UserSchema.methods.createJWT = function (){
    return jwt.sign({userId : this._id, name : this.name}, process.env.JWT_SECRET,{expiresIn : '30d'})
}


UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcryptjs.compare(candidatePassword,this.password);
    return isMatch;
}


module.exports = mongoose.model('User', UserSchema);