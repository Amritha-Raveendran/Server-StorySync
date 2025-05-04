//1)import mongoose
const mongoose = require('mongoose')

// 2)schemas instance
const userSchema = new mongoose.Schema({
    username : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    bio:{
        type: String
        
    },
    userProfile:{
        type: String   
    },
    socialLink: {
         type: String    
    }


})

//3)create model
const users = mongoose.model("users",userSchema)
//4)export model
module.exports = users