const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {handleError} = require('../middleware/func')
const mongoose = require('mongoose')

//get all users
router.get('/', async (req, res) => {
    try {
        let users = await User.find({})
        if (users.length > 0 ) {
            res.status(200).json(users)
        } else {
            res.status(400).json({message : "Belum ada user"})
        }    
    } catch (e) {
        return res.status(500).json(JSON.stringify(e))
    }
    
})

//get a user
router.get('/:id', async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            let user = await User.findOne({_id : req.params.id})
            if (user) {
                return res.status(200).json(user)
            } else {
                return res.status(404).json({message : "User tidak ditemukan"})
            }
        } else {
            return res.status(404).json({message : `ID tidak valid`})
        }
    } catch (e) {
        return res.status(500).json(JSON.stringify(e))
    }
    
})

//create a user
router.post('/', async (req, res) => {   
    let {username, password, role, name} = req.body
    let newUser = new User({
        username, role, name
    })
    await newUser.setPassword(password)
    newUser.save((err, user) => {
        if (err) {
            const errors = handleError(err)
            return res.status(400).json({message : "Gagal menambahkan user", errors})
        } 
        return res.status(200).json({message : "Berhasil menambahkan user", data : user})
    })

})

//update a user
router.put('/:id', async (req, res) => {
    let {password, role, name} = req.body
    
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            let updatedUser = await User.findOne({_id : req.params.id})
            if (updatedUser) {
                updatedUser.role = role
                updatedUser.name = name
                // if user update password            
                if (!updatedUser.validPassword(password)) await updatedUser.setPassword(password)
                User.updateOne({_id : req.params.id}, updatedUser, {runValidators : true, context :'query',upsert : true}, (err, result) => {
                    if (!err) {
                        if (result.modifiedCount > 0 ) return res.status(200).json({message : 'Berhasil merubah user'})
                        return res.status(401).json({message : 'Tidak ada yang diubah'})
                    } else {
                        let errors = handleError(err)
                        return res.status(400).json({message : "Gagal merubah user", errors})
                    }
                    
                })
            } else {
                return res.status(404).json({message : 'User tidak ditemukan'})
            }
        } else {
            return res.status(404).json({message : `ID tidak valid`})
        }
    } catch (e) {
        return res.status(500).json(JSON.stringify(e))
    }
})

//delete a user
router.delete("/:id", async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            let user = await User.deleteOne({_id : req.params.id})
            if (user.deletedCount > 0) {
                return res.status(200).json({message : "User berhasil dihapus"})
            } else {
                return res.status(404).json({message : "User gagal dihapus"})
            }
        } else {
            return res.status(404).json({message : `ID tidak valid`})
        }
    } catch (e) {
        return res.status(500).json(JSON.stringify(e))
    }
})
module.exports= router