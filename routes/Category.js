const express = require('express')
const Router = express.Router()
const Category = require('../models/Category')
const mongoose = require('mongoose')
const { handleError } = require('../middleware/func')
const Item = require('../models/Item')

Router.get('/', async (req, res) => {
    try {
        let allCategories = await Category.find({})
        if (allCategories.length > 0) res.status(200).json(allCategories)
        else res.status(400).json({message : "Belum ada Kategori"})
    } catch (error) {
        return res.status(500).json(JSON.stringify(error))
    }
})

Router.post('/', async (req, res) => {
    let {name} = req.body
    try {
        let newCategory = new Category({
            name
        })
        newCategory.save((err, category) => {
            if (err) {
                const errors = handleError(err)
                return res.status(401).json({message : "Gagal menambahkan kategori", errors})
            }
            return res.status(200).json({message : "Berhasil menambahkan katerogi", data : category})
        })
    } catch (error) {
        return res.status(500).json(JSON.stringify(error))
    }
})

// Router.get('/:id', async (req, res) => {
//     try {
//         if (mongoose.Types.ObjectId.isValid(req.params.id)) {
//             let category = await Category.findOne({_id : req.params.id})
//             if (category) {
//                 return res.status(200).json(category)
//             } else {
//                 return res.status(404).json({message : "Kategori tidak ditemukan"})
//             }
//         } else {
//             return res.status(404).json({message : `ID tidak valid`})
//         }
//     } catch (e) {
//         res.status(500).json(JSON.stringify(e))
//     }
// })

Router.delete("/:id", async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            let items = await Item.find({category : req.params.id})
            if (items.length > 0) return res.status(401).json({message : "Kategori gagal dihapus, karena ada barang yang menggunakan kategori tersebut."})
            else {
                let category = await Category.deleteOne({_id : req.params.id})
                if (category.deletedCount > 0) {
                    return res.status(200).json({message : "Kategori berhasil dihapus"})
                } else {
                    return res.status(401).json({message : "Kategori gagal dihapus"})
                }
            }
        } else {
            return res.status(404).json({message : `ID tidak valid`})
        }
    } catch (e) {
        res.status(500).json(JSON.stringify(e))
    }
})

module.exports = Router