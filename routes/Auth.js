const router = require('express').Router()
const User = require('../models/User')
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

module.exports = router