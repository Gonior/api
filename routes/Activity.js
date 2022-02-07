const router = require('express').Router()
const Activity = require('../models/Activity')

router.get('/:id', async (req, res) => {
    
    try {
        let items = await Activity.find({itemId : req.params.id}).populate('userId', 'name').populate('itemId').sort({date : 'desc'})
        if (items.length > 0) {
            
            res.status(200).json(items)
        }
        else res.status(401).json({message : "Belum ada aktivitas"})
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    
    let limit = req.query.limit ? +req.query.limit : ''
    console.log(limit)
    try {
        let items = await Activity.find({}).populate('userId', 'name').populate('itemId').sort({date : 'desc'}).limit(limit)
        
        if (items.length > 0) {
            
            res.status(200).json(items)
        }
        else res.status(401).json({message : "Belum ada aktivitas"})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }  
})

module.exports = router