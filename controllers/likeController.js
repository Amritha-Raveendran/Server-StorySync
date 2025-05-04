const stories = require('../model/storyModel')
const users = require('../model/userModel')
const comments = require('../model/commentModel')
const likes = require('../model/likeModel')




exports.likeStoryController = async (req, res) => {
    console.log("Inside like story controller");
    const { storyId } = req.params
    const userId = req.user.uid

    try {

        const existing = await likes.findOne({ userId, storyId })
        if (existing) {
            await likes.deleteOne({ _id: existing._id })
            return res.status(200).json({ message: 'Unliked' })
        }
        await likes.create({ userId, storyId })
        return res.status(200).json({ message: 'Liked' })

    } catch (error) {
         return res.status(406).json(error)
    }

}

exports.getLikeCountController = async(req, res)=>{
    console.log("Inside get Like Count Controller");

    const {storyId}= req.params
    try {

        const likeCount = await likes.countDocuments({storyId})
        res.status(200).json({likeCount})
        
    } catch (error) {
        return res.status(406).json(error)
    }
    
}