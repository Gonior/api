const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : [true, 'Category tidak boleh kosong']
    }
})

categorySchema.plugin(uniqueValidator, 'Kategori tersebut sudah digunakan.')

module.exports = mongoose.model('Category', categorySchema)