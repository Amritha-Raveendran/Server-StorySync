const mongoose = require("mongoose")

const storySchema = new mongoose.Schema(
    {
        storyTitle: {
            require: true,
            type: String
        },
        storyContent: {
            require: true,
            type: String
        },
        storyCategory: {
            require: true,
            type: String
        },
        userId: {
            type: String,
            required: true
        },
        username : {
            type : String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const stories = mongoose.model("stories", storySchema)
module.exports = stories