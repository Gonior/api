// require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name : {
        type : String, 
        match : [/^[a-zA-Z ]+$/, 'Nama tidak valid'],
        required : [true, 'Nama pengguna tidak boleh kosong']
    }, 
    hash : String, 
    salt : String,
    role : {
        type : String,
        enum : {
            values : ['Admin', 'Employee'],
            message : 'Role {VALUE} tidak valid. hanya Admin dan Employee'

        },
        required : [true, 'Role pengguna tidak boleh kosong']
    },
    username : {
        type : String,
        lowercase : true, 
        unique : true,
        match : [/^[a-zA-Z0-9]+$/, 'Nama pengguna tidak valid'],
        required : [true, 'Tidak boleh kosong']
    }
}, {timestamps : true})

mongoose.plugin(uniqueValidator, {message : 'Nama pengguna sudah digunakan'})
userSchema.method('setPassword', function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt , 10000, 512, 'sha512').toString('hex')    
})
userSchema.method('validPassword', function (password) {    
    let hash = crypto.pbkdf2Sync(password, this.salt , 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
})

userSchema.method('generateJWT', function () {
    let today = new Date()
    let exp = new Date(today)
    exp.setDate(today.getDate() + 60) 
    return jwt.sign({
        id : this._id,
        username : this.username,
        exp : parseInt(exp.getTime()/1000)

    }, process.env.SECRET)
})

userSchema.method('toAuthJSON', function () {
    
    return {
        username : this.username ,
        token : `Bearer ${this.generateJWT()}`,
        name : this.name,
        role : this.role,
        id : this._id
    }
})

module.exports = mongoose.model('User', userSchema)