// require('dotenv').config()
const mongoose = require('mongoose')
// const Category = require('./Category')
const uniqueValidator = require('mongoose-unique-validator')
const itemsSchema = mongoose.Schema({
    name : {
        type : String, 
        unique : true,
        required : [true, 'Nama tidak boleh kosong']
    }, 
    unit : {
        type : String,
        required : [true, 'Satuan tidak Boleh']
    }, 
    category : {
        type : mongoose.Types.ObjectId,
        ref : "Category",
        required : [true, "Kategori tidak boleh kosong"]
    },
    qty : {
        type : Number, 
        default : 0
    }, 
    min : {
        type : Number, 
        default : 0
    },
    max : {
        type : Number, 
        default : 99999
    },
    gap : {
        type : Number,
        default : 0,
    },
    status : {
        type : String, 
        enum : {
            values : ['Bahaya', 'Aman', 'Mantul', 'Over', 'Tidak Diketahui'],
            message : 'Status {VALUE} tidak valid.'
        }
    }


}, {timestamps : true})

itemsSchema.plugin(uniqueValidator, {message : 'Nama item tersebut sudah digunakan.'})

itemsSchema.method('calculateStock', function () {
    console.log(this)
    this.status = "Tidak Diketahui"
    if (this.qty < this.min) this.status = 'Bahaya'
    else if (this.qty >= this.max) this.status = "Over"
    else {
        if (this.gap === 0) {
            if (this.qty >= min && this.qty < this.max) this.status = "Aman"
        } else {
            let gap = this.min + this.gap
            if (this.qty >= this.min && this.qty < gap ) this.status = "Aman"
            else if (this.qty >= gap && this.qty < this.max ) this.status = "Mantul"
        }
    }

})

module.exports = mongoose.model('Item', itemsSchema)