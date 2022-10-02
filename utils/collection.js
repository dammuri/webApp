const mongoose = require('mongoose')

const collection = mongoose.model('nft', {
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    supply : {
        type : Number,
        required : true
    },
    imgfile : {
        type : String,
        required : true
    },
    imgpath : {
        type : String,
        required : true
    }
})

module.exports = collection