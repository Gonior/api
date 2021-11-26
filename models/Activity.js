const mongoose = require('mongoose')
const TimeAgo = require('javascript-time-ago')
const id = require('javascript-time-ago/locale/id')

TimeAgo.addDefaultLocale(id)

const timeAgo = new TimeAgo('id-ID')

console.log(timeAgo.format(new Date('2021-11-22T07:41:50.602+00:00').getTime()))
const ActivitySchema = mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }, 
    do : {
        type : String,
    }, 
    date : {
        type : Date,
        default : new Date(),
    },
    itemId : {
        type : mongoose.Types.ObjectId,
        ref : 'Item'
    }, 
    value : {
        type : Number,
        default :0
    },
    typeOfActivity : {
        type : String,
        enum : ['increase', 'decrease']
    }
})


module.exports = mongoose.model('Activity', ActivitySchema)