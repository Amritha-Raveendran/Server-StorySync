const stories = require('../model/storyModel')
const users = require('../model/userModel')
const comments = require('../model/commentModel')

exports.addCommentController= async(req, res) =>{
console.log("Inside add Comment Controller");

const { commentText} = req.body
const {userId, storyId} = req.params


if(!storyId || !commentText || !userId)
{
    res.status(406).json({message:"Missing required fields"})
}

try {

    const story = await stories.findById(storyId)
    if(!story)
    {
        return res.status(404).json({ message: "story not found" })
    
    }
    const user = await users.findById(userId)
    
    if (!user) {
       res.status(404).json({ message: "User not found" })
    }
    // Create new comment
    const newComment = new comments({
        userId: user._id,
        username: user.username,
        storyId,
        commentText
      })
      await newComment.save()

      res.status(200).json({ message: "Comment added successfully" })

} catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
}

}


exports.getCommentController= async(req, res)=>{
    console.log("Inside get all comment controller");
    

    const {storyId} = req.params

    if (!storyId) {
        res.status(400).json({ message: "Story ID is required" })
      }

    try {
        const commentList  = await comments.find({storyId}).populate('userId', 'username userProfile')
        res.status(200).json(commentList)
        
    } catch (error) {
        console.error("Error fetching comments:", error)
        res.status(409).json({ message: "Server error" })
    }
}


exports.deleteCommentController= async(req, res)=>{
    console.log("inside delete Comment Controller "); 
    try {

        const {commentId}= req.params
        if(!commentId)
        {
           return res.status(400).json({message:"Comment id not found"})
        }
        const deleteComment = await comments.findByIdAndDelete(commentId)

        if(!deleteComment)
        {
           return res.status(400).json({message:"Comment not found"}) 
        }
        res.status(200).json(deleteComment)
        
    } catch (error) {
        res.status(406).json(error)
    }
    
}