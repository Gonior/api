require('dotenv').config()
const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
router.post('/', async (req, res) => {
    try {
        let {password, username} = req.body
        let user = await User.findOne({username})
        if (user) {
            if (!user.validPassword(password)) return res.status(401).json({message : "Password anda salah"})
            else {
                return res.status(200).json(await user.toAuthJSON())
            }
        } else return res.status(404).json({message : "Nama pengguna tidak ditemukan"})

        
    } catch (err) {
        return res.status(500).json(JSON.stringify(err))
    }
})


router.post('/verif',  (req, res) => {
    let token = req.body.token && req.body.token.split('Bearer ')[1]
    if (token) {    
        
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            if (decoded) return res.status(200).json({verified : true})

        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else {
        return res.status(403).send("A token is required for authentication");
    }

    
})

module.exports = router