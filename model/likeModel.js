const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({

    userId : {
        type:String,
        ref :"users"
    },
    storyId : {
        type:String,
        ref :"stories"
    },
    createdAt: {
         type: Date,
         default: Date.now 
        }
})
// Prevent duplicate likes
likeSchema.index({ userId: 1, storyId: 1 }, { unique: true })

const likes = mongoose.model("likes", likeSchema)
module.exports = likes