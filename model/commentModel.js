const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    storyId: {
        type: String,
        ref: 'stories',
        required: true
      },
      userId: {
        type: String,
        ref: 'users',
        required: true
      },
      username: {
        type: String
      },
      commentText: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

const comments = mongoose.model("comments", commentSchema)
module.exports = comments